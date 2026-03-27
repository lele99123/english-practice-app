import React, { useState, useEffect, useRef } from 'react';
import './VocabApp.css';

// Dynamically import all day JSONs
const jsonModules = import.meta.glob('../data/day*.json', { eager: true });

function getAllVocab() {
  const allVocab = [];
  const seenWords = new Set();

  Object.entries(jsonModules).forEach(([path, mod]) => {
    const data = mod.default || mod;
    const dayMatch = path.match(/day(\d+)\.json/);
    const dayId = dayMatch ? parseInt(dayMatch[1]) : 0;

    const addVocab = (v) => {
      const key = v.word || v.phrase;
      if (!key) return; 
      if (!seenWords.has(key)) {
        seenWords.add(key);
        allVocab.push({ 
          word: key, 
          translation: v.translation, 
          example: v.example || null,
          dayId 
        });
      }
    };

    if (data.studentGuide && data.studentGuide.vocabulary) {
      data.studentGuide.vocabulary.forEach(addVocab);
    }
    if (data.classReview && data.classReview.keyVocabulary) {
      data.classReview.keyVocabulary.forEach(addVocab);
    }
    if (data.studentGuide && data.studentGuide.commonPhrases) {
      data.studentGuide.commonPhrases.forEach(addVocab);
    }
  });
  return allVocab;
}

const allVocabItems = getAllVocab();

const defaultSettings = {
  quizLength: 20,
  autoContinueCorrect: false,
  showProgressNumbers: true
};

const VocabApp = ({ onClose, selectedDay }) => {
  const [masteryData, setMasteryData] = useState({});
  const [sessionProgress, setSessionProgress] = useState(0);
  
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [mistakesInSession, setMistakesInSession] = useState([]);
  
  const testedInSessionRef = useRef(new Set());

  // Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('vocab_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  
  const [showSettings, setShowSettings] = useState(() => {
    return localStorage.getItem('vocab_settings') === null;
  });

  // Load mastery from localStorage
  useEffect(() => {
    const savedMastery = localStorage.getItem('vocab_mastery');
    if (savedMastery) {
      try {
        setMasteryData(JSON.parse(savedMastery));
      } catch(e) { console.error('Failed to parse vocab_mastery'); }
    }
  }, []);

  // Save mastery to localStorage
  const updateMastery = (word, isRight) => {
    const prevScore = masteryData[word] || 0;
    const newScore = isRight ? prevScore + 1 : Math.max(-5, prevScore - 1);
    const newData = { ...masteryData, [word]: newScore };
    setMasteryData(newData);
    localStorage.setItem('vocab_mastery', JSON.stringify(newData));

    if (!isRight) {
      setMistakesInSession(prev => {
        if (!prev.find(m => m.word === word)) {
          const item = allVocabItems.find(v => v.word === word);
          return [...prev, item];
        }
        return prev;
      });
    }
  };

  const generateQuestion = () => {
    if (allVocabItems.length < 4) return;

    // 1. Identify "Today's" words that need practice (mastery < 2)
    const todaysUnmastered = allVocabItems.filter(v => v.dayId === selectedDay && (masteryData[v.word] || 0) < 2);
    // 2. Identify weak words across all days (mastery <= 0)
    const allWeakWords = allVocabItems.filter(v => (masteryData[v.word] || 0) <= 0);

    let availableUnmastered = todaysUnmastered.filter(v => !testedInSessionRef.current.has(v.word));
    let availableWeak = allWeakWords.filter(v => !testedInSessionRef.current.has(v.word));
    let availableFallback = allVocabItems.filter(v => !testedInSessionRef.current.has(v.word));
    
    // If we exhaust the vocab pool in a single session, reset the tracking
    if (availableFallback.length === 0) {
      testedInSessionRef.current.clear();
      availableFallback = allVocabItems;
      availableUnmastered = todaysUnmastered;
      availableWeak = allWeakWords;
    }

    let targetPool = [];
    if (availableUnmastered.length > 0) {
      targetPool = availableUnmastered;
    } else if (availableWeak.length > 0) {
      targetPool = availableWeak;
    } else {
      targetPool = availableFallback; 
    }

    // Sort by lowest mastery first, with some randomness
    targetPool.sort((a, b) => {
      const scoreA = masteryData[a.word] || 0;
      const scoreB = masteryData[b.word] || 0;
      return scoreA - scoreB + (Math.random() - 0.5);
    });

    const target = targetPool[0];
    testedInSessionRef.current.add(target.word);
    
    // Pick 3 distractors
    const distractors = [...allVocabItems]
      .filter(v => v.word !== target.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Determine question type
    let types = ['en-zh', 'zh-en'];
    let blankedExample = null;
    
    if (target.example) {
      // Escape target word for regex to handle special chars 
      const escapedWord = target.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedWord})`, 'gi');
      if (regex.test(target.example)) {
        types.push('fill-in');
        // Actually replace it with blank
        blankedExample = target.example.replace(regex, '_________');
      }
    }

    const type = types[Math.floor(Math.random() * types.length)];
    
    // Format options
    let formattedOptions = [];
    let correctAnswer = '';

    if (type === 'en-zh') {
      correctAnswer = target.translation;
      formattedOptions = [target, ...distractors].map(v => v.translation);
    } else {
      // For zh-en and fill-in, options are English words
      correctAnswer = target.word;
      formattedOptions = [target, ...distractors].map(v => v.word);
    }

    // Add artificial slashes if target has a slash
    if (correctAnswer.includes('/')) {
      formattedOptions = formattedOptions.map(opt => {
        if (opt === correctAnswer || opt.includes('/')) return opt;
        // Grab a random translation/word to append
        const randomExtra = allVocabItems[Math.floor(Math.random() * allVocabItems.length)];
        const extraText = (type === 'en-zh') ? randomExtra.translation : randomExtra.word;
        return `${opt} / ${extraText.split('/')[0].trim()}`;
      });
    }

    formattedOptions.sort(() => Math.random() - 0.5);

    setCurrentQuestion({
      ...target,
      type,
      blankedExample,
      correctAnswer
    });
    setOptions(formattedOptions);
    setSelectedOption(null);
    setIsChecked(false);
    setIsCorrect(false);
  };

  // Start initial question
  useEffect(() => {
    // Only generate if not showing settings and we need a question
    if (!showSettings && !currentQuestion && !isFinished && allVocabItems.length >= 4) {
      generateQuestion();
    }
  }, [showSettings, currentQuestion, isFinished, masteryData]); 

  const handleCheck = () => {
    if (!selectedOption) return;
    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setIsChecked(true);
    updateMastery(currentQuestion.word, correct);
  };

  // Advanced feature: Auto-continue on correct answer if settings allow
  useEffect(() => {
    let timeoutId;
    if (isChecked && isCorrect && settings.autoContinueCorrect) {
      timeoutId = setTimeout(() => {
        handleContinue();
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [isChecked, isCorrect, settings.autoContinueCorrect]);

  const handleContinue = () => {
    setSessionProgress(prev => {
      const nextProgress = prev + 1;
      if (nextProgress >= settings.quizLength) {
        setIsFinished(true);
        return settings.quizLength;
      } else {
        generateQuestion();
        return nextProgress;
      }
    });
  };

  const resetSession = () => {
    testedInSessionRef.current.clear();
    setSessionProgress(0);
    setIsFinished(false);
    setMistakesInSession([]);
    generateQuestion();
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (allVocabItems.length < 4) {
    return (
      <div className="vocab-app-overlay">
        <div className="vocab-app-header">
          <button className="vocab-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="vocab-app-content">
          <p>Not enough vocabulary available to practice. (Need at least 4 items)</p>
        </div>
      </div>
    );
  }

  // --- SETTINGS SCREEN ---
  if (showSettings) {
    return (
      <div className="vocab-app-overlay pb-safe" style={{ overflowY: 'auto' }}>
        <div className="vocab-app-header" style={{ position: 'sticky', top: 0, backgroundColor: 'var(--white)'}}>
          <button className="vocab-close-btn" onClick={() => {
            if (!localStorage.getItem('vocab_settings')) {
              localStorage.setItem('vocab_settings', JSON.stringify(settings));
            }
            setShowSettings(false);
          }}>✕</button>
        </div>
        <div className="vocab-app-content">
          <h2 className="vocab-question-title">设置 (Settings)</h2>
          <div className="vocab-settings-form">
            <div className="vocab-settings-group">
              <label>
                每次练习词数
                <input 
                  type="number" 
                  min="5" 
                  max="100" 
                  value={settings.quizLength}
                  onChange={(e) => setSettings({...settings, quizLength: parseInt(e.target.value) || 20})}
                />
              </label>
            </div>
            <div className="vocab-settings-group">
              <label>
                答对自动下一题
                <input 
                  type="checkbox" 
                  checked={settings.autoContinueCorrect}
                  onChange={(e) => setSettings({...settings, autoContinueCorrect: e.target.checked})}
                />
              </label>
            </div>
            <div className="vocab-settings-group">
              <label>
                显示进度数字 (例如 5/20)
                <input 
                  type="checkbox" 
                  checked={settings.showProgressNumbers}
                  onChange={(e) => setSettings({...settings, showProgressNumbers: e.target.checked})}
                />
              </label>
            </div>
            <button className="vocab-action-btn check" style={{ marginTop: '1.5rem' }} onClick={() => {
               localStorage.setItem('vocab_settings', JSON.stringify(settings));
               setShowSettings(false);
               // If session is done or hasn't started, cleanly reset it
               if (sessionProgress === 0 || isFinished) resetSession();
            }}>
              保存并开始
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- FINISHED SCREEN ---
  if (isFinished) {
    return (
      <div className="vocab-app-overlay pb-safe" style={{ overflowY: 'auto' }}>
        <div className="vocab-app-header" style={{ position: 'sticky', top: 0, backgroundColor: 'var(--white)'}}>
          <button className="vocab-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="vocab-app-content vocab-complete-screen">
          <h2>🎉 Lesson Complete! 🎉</h2>
          <p>You've reviewed {settings.quizLength} words today.</p>
          
          {mistakesInSession.length > 0 && (
            <div style={{ marginTop: '2rem', textAlign: 'left', width: '100%', maxWidth: '400px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#ea2b2b', marginBottom: '1rem' }}>Words to focus on next time:</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {mistakesInSession.map((m, i) => (
                  <li key={i} style={{ padding: '0.75rem', backgroundColor: '#ffdfe0', borderRadius: '8px', marginBottom: '0.5rem', color: '#ba1414', display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{m.word}</strong>
                    <span>{m.translation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="vocab-action-btn check" onClick={resetSession} style={{ maxWidth: '300px', margin: '2rem auto 0' }}>Practice Again</button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  // --- MAIN QUIZ SCREEN ---
  return (
    <div className="vocab-app-overlay">
      <div className="vocab-app-header">
        <button className="vocab-close-btn" onClick={onClose} title="Close">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="vocab-progress-container" style={{ position: 'relative' }}>
          <div 
            className="vocab-progress-bar" 
            style={{ width: `${(sessionProgress / settings.quizLength) * 100}%` }}
          />
          {settings.showProgressNumbers && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold', color: sessionProgress / settings.quizLength > 0.5 ? 'white' : 'var(--gray-600)' }}>
              {sessionProgress} / {settings.quizLength}
            </div>
          )}
        </div>
        <button className="vocab-settings-btn" onClick={() => setShowSettings(true)} title="Settings">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </button>
      </div>

      <div className="vocab-app-content">
        <h2 className="vocab-question-title">
          {currentQuestion.type === 'en-zh' && "What does this mean?"}
          {currentQuestion.type === 'zh-en' && "How do you say this?"}
          {currentQuestion.type === 'fill-in' && "Fill in the blank"}
        </h2>
        
        <div 
          style={{ marginBottom: '3rem', textAlign: 'center', wordBreak: 'break-word', cursor: currentQuestion.type === 'en-zh' ? 'pointer' : 'default' }} 
          onClick={() => currentQuestion.type === 'en-zh' && speakText(currentQuestion.word)}
        >
          {currentQuestion.type === 'en-zh' && (
            <div className="vocab-word-display" style={{ marginBottom: 0 }}>
              {currentQuestion.word}
              <div style={{ fontSize: '1rem', color: 'var(--gray-400)', marginTop: '0.5rem', fontWeight: 500 }}>
                (Tap to listen)
              </div>
            </div>
          )}
          {currentQuestion.type === 'zh-en' && (
            <div className="vocab-word-display" style={{ color: 'var(--gray-800)', marginBottom: 0 }}>
              {currentQuestion.translation}
            </div>
          )}
          {currentQuestion.type === 'fill-in' && (
            <div style={{ padding: '0 1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: '1.6', color: 'var(--gray-800)' }}>
                {currentQuestion.blankedExample}
              </div>
              <div style={{ fontSize: '1.1rem', color: 'var(--indigo-500)', marginTop: '1rem', fontWeight: 500 }}>
                Hint: {currentQuestion.translation}
              </div>
            </div>
          )}
        </div>

        <div className="vocab-options-grid">
          {options.map((opt, i) => {
            let btnClass = "vocab-option-btn";
            if (isChecked) {
              if (opt === currentQuestion.correctAnswer) {
                btnClass += " correct";
              } else if (opt === selectedOption) {
                btnClass += " wrong";
              }
            } else if (opt === selectedOption) {
              btnClass += " selected";
            }

            return (
              <button
                key={i}
                className={btnClass}
                onClick={() => !isChecked && setSelectedOption(opt)}
                disabled={isChecked}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span>{opt}</span>
                {(currentQuestion.type === 'zh-en' || currentQuestion.type === 'fill-in') && (
                  <span 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      speakText(opt); 
                    }}
                    style={{ padding: '0.2rem', marginLeft: '0.5rem', color: 'var(--gray-400)', display: 'flex' }}
                    title="Listen"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"></path>
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`vocab-footer ${isChecked ? (isCorrect ? 'correct-state' : 'wrong-state') : ''}`}>
        {isChecked && (
          <div className={`vocab-feedback-msg ${isCorrect ? 'correct' : 'wrong'}`}>
            {isCorrect ? (
              <>
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                Excellent!
              </>
            ) : (
              <>
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                Correct answer: {currentQuestion.correctAnswer}
              </>
            )}
            {(currentQuestion.type === 'zh-en' || currentQuestion.type === 'fill-in') && (
               <button 
                  onClick={(e) => { e.stopPropagation(); speakText(currentQuestion.word); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto', color: 'inherit', display: 'flex', alignItems: 'center' }}
                  title="Listen"
               >
                 <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"></path></svg>
               </button>
            )}
          </div>
        )}
        
        {!isChecked ? (
          <button 
            className="vocab-action-btn check" 
            disabled={!selectedOption}
            onClick={handleCheck}
          >
            Check
          </button>
        ) : (
          <button 
            className={`vocab-action-btn ${isCorrect ? 'continue-correct' : 'continue-wrong'}`} 
            onClick={handleContinue}
            style={{ display: (isCorrect && settings.autoContinueCorrect) ? 'none' : 'block' }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default VocabApp;
