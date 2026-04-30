import React from 'react';
import day1Data from '../data/day1.json';
import day2Data from '../data/day2.json';
import day3Data from '../data/day3.json';
import day4Data from '../data/day4.json';
import day5Data from '../data/day5.json';
import day6Data from '../data/day6.json';
import day7Data from '../data/day7.json';
import day8Data from '../data/day8.json';
import day9Data from '../data/day9.json';
import day10Data from '../data/day10.json';
import day11Data from '../data/day11.json';
import day12Data from '../data/day12.json';

const reviewDataMap = {
  1: day1Data,
  2: day2Data,
  3: day3Data,
  4: day4Data,
  5: day5Data,
  6: day6Data,
  7: day7Data,
  8: day8Data,
  9: day9Data,
  10: day10Data,
  11: day11Data,
  12: day12Data
};

const speakText = (text) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Text-to-speech is not supported in this browser.");
  }
};

const ClassReview = ({ day, topic }) => {
  const dayDoc = reviewDataMap[day];
  const data = dayDoc ? dayDoc.classReview : null;

  if (!data) {
    return (
      <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        <header className="header gradient-bg mb-8" style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', paddingTop: '3rem' }}>
          <div className="header-content">
            <div className="flex items-center space-x-2 mb-2">
              <svg style={{ width: '1.5rem', height: '1.5rem', color: 'var(--blue-200)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              <span className="header-tag">Study Notes • Day {day}</span>
            </div>
            <h1>{topic ? topic.title : `Day ${day} Review`}</h1>
            <p>Review from our latest English practice session</p>
          </div>
        </header>
        <main className="container space-y-4">
          <section className="card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>Class review for Day {day} is not available yet. Please complete the session first!</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <header className="header gradient-bg mb-8" style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', paddingTop: '3rem' }}>
        <div className="header-content">
          <div className="flex items-center space-x-2 mb-2">
            <svg style={{ width: '1.5rem', height: '1.5rem', color: 'var(--blue-200)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            <span className="header-tag">Study Notes • Day {day}</span>
          </div>
          <h1>{dayDoc.title || topic?.title}</h1>
          <p>Review from our latest English practice session</p>
        </div>
      </header>

      <main className="container space-y-4">
        {/* Session Summary */}
        <section className="card">
          <h2 className="flex items-center mb-4" style={{ fontSize: '1.25rem' }}>
            <span className="section-icon-bg icon-blue-bg">
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </span>
            Session Summary
          </h2>
          <ul className="space-y-3" style={{ color: 'var(--text-muted)' }}>
            {data.sessionSummary.map((point, index) => (
              <li key={index} className="flex" style={{ alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--blue-500)', marginRight: '0.5rem', marginTop: '0.25rem' }}>•</span>
                <span dangerouslySetInnerHTML={{ __html: point }} />
              </li>
            ))}
          </ul>
        </section>

        {/* Key Vocabulary */}
        <section className="card">
          <h2 className="flex items-center mb-5" style={{ fontSize: '1.25rem' }}>
            <span className="section-icon-bg icon-indigo-bg">
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </span>
            Key Vocabulary
          </h2>
          <div className="space-y-4">
            {data.keyVocabulary.map((item, id) => {
              const spellOut = item.spellOut || item.word.replace(/ \/ | & /g, ", ");
              return (
                <div key={id} className="vocab-item">
                  <div className="flex justify-between items-center mb-2" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div className="flex items-center space-x-2">
                      <span className="vocab-word">{item.word}</span>
                      <button onClick={() => speakText(spellOut)} className="speech-btn" title="Listen to pronunciation">
                        <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"></path></svg>
                      </button>
                    </div>
                    <span className="vocab-translation">{item.translation}</span>
                  </div>
                  {item.example && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{item.example}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Grammar Tips */}
        {data.grammarTips && data.grammarTips.length > 0 && (
          <section className="card">
            <h2 className="flex items-center mb-5" style={{ fontSize: '1.25rem' }}>
              <span className="section-icon-bg icon-green-bg">
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              </span>
              Grammar & Phrasing Tips
            </h2>
            <div className="space-y-4" style={{ marginTop: '1.5rem' }}>
              {data.grammarTips.map((tip, index) => (
                <div key={index} className="grammar-tip" style={{ marginBottom: index !== data.grammarTips.length - 1 ? '1.5rem' : '0' }}>
                  <h3 className="mb-2" style={{ fontSize: '1rem' }}>{tip.title}</h3>
                  {tip.description && <p className="mb-2" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{tip.description}</p>}
                  <div className="grammar-box-incorrect">
                    <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>{tip.incorrect}</span>
                  </div>
                  <div className="grammar-box-correct">
                    <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {tip.correct}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Conversation Practice */}
        {data.conversationPractice && data.conversationPractice.questions && (
          <section className="card">
            <h2 className="flex items-center mb-4" style={{ fontSize: '1.25rem' }}>
              <span className="section-icon-bg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'rgb(245, 158, 11)' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
              </span>
              {data.conversationPractice.title || "Discussion Practice"}
            </h2>
            {data.conversationPractice.description && <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{data.conversationPractice.description}</p>}
            <ul className="space-y-3" style={{ color: 'var(--text-muted)' }}>
              {data.conversationPractice.questions.map((q, i) => (
                <li key={i} className="flex" style={{ alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--blue-500)', marginRight: '0.5rem', marginTop: '0.25rem' }}>•</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{q}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Homework Roleplay */}
        {data.homeworkRoleplay && (
          <section className="card">
            <h2 className="flex items-center mb-4" style={{ fontSize: '1.25rem' }}>
              <span className="section-icon-bg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'rgb(139, 92, 246)' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </span>
              {data.homeworkRoleplay.title || "Homework Roleplay"}
            </h2>
            {data.homeworkRoleplay.description && <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>{data.homeworkRoleplay.description}</p>}
            
            <div style={{ padding: '1rem', backgroundColor: 'var(--gray-50)', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--indigo-600)' }}>Scenario</h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{data.homeworkRoleplay.scenario}</p>
            </div>

            {data.homeworkRoleplay.roles && (
              <div className="space-y-3" style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Roles:</h3>
                {Object.entries(data.homeworkRoleplay.roles).map(([role, task], idx) => (
                  <div key={idx} style={{ padding: '0.75rem 1rem', borderLeft: '4px solid var(--blue-500)', backgroundColor: 'var(--white)', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)' }}>
                    <strong style={{ display: 'block', color: 'var(--gray-800)', marginBottom: '0.25rem' }}>{role}</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{task}</span>
                  </div>
                ))}
              </div>
            )}
            
            {data.homeworkRoleplay.preparationTip && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue-700)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ marginRight: '0.5rem' }}>💡</span>
                <span>{data.homeworkRoleplay.preparationTip}</span>
              </div>
            )}
          </section>
        )}

        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{data.encouragement || "Great job today! Keep practicing! 🎉"}</p>
        </div>
      </main>
    </div>
  );
};
export default ClassReview;
