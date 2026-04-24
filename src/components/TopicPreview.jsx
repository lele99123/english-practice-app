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

const daysData = {
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
  11: day11Data
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

const TopicPreview = ({ day, topic }) => {
  const dayData = daysData[day];
  const data = dayData ? dayData.studentGuide : null;

  return (
    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
      <header className="header gradient-bg mb-8" style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', paddingTop: '3rem' }}>
        <div className="header-content">
          <div className="flex items-center space-x-2 mb-2">
            <svg style={{ width: '1.5rem', height: '1.5rem', color: 'var(--blue-200)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <span className="header-tag">Day {day} Preview</span>
          </div>
          <h1>{topic.title}</h1>
          <p>{topic.description}</p>
        </div>
      </header>

      <main className="container space-y-4">
        {data ? (
          <>
            {/* Topic Intro */}
            <section className="card">
              <h2 className="flex items-center mb-4" style={{ fontSize: '1.25rem' }}>
                <span className="section-icon-bg icon-indigo-bg">
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </span>
                Welcome
              </h2>
              <div className="space-y-4">
                {data.welcomeMessage.map((msg, i) => (
                  <div key={i}>
                    <p style={{ color: 'var(--text-main)', fontWeight: 500 }}>{msg.en}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.125rem' }}>{msg.zh}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Discussion Questions */}
            <section className="card">
              <h2 className="flex items-center mb-4" style={{ fontSize: '1.25rem' }}>
                <span className="section-icon-bg icon-blue-bg">
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </span>
                Things to think about
              </h2>
              <ul className="space-y-4" style={{ color: 'var(--text-muted)' }}>
                {data.questionsToThinkAbout.map((q, i) => (
                  <li key={i} className="flex" style={{ alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--blue-500)', marginRight: '0.5rem', marginTop: '0.25rem' }}>•</span>
                    <div>
                      <p style={{ color: 'var(--text-main)', fontWeight: 500 }}>{q.en}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.125rem' }}>{q.zh}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Vocabulary Preview */}
            <section className="card">
              <h2 className="flex items-center mb-5" style={{ fontSize: '1.25rem' }}>
                <span className="section-icon-bg icon-green-bg">
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </span>
                Vocab Sneak Peek
              </h2>
              <div className="space-y-4">
                {data.vocabulary.map((item, id) => {
                  /* Parse spelling hint for text-to-speech if special characters are present */
                  const spellOut = item.word.replace(/ \/ | & /g, ", ");
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

            {/* Common Phrases Preview */}
            {data.commonPhrases && data.commonPhrases.length > 0 && (
              <section className="card">
                <h2 className="flex items-center mb-5" style={{ fontSize: '1.25rem' }}>
                  <span className="section-icon-bg" style={{ backgroundColor: 'rgba(236, 72, 153, 0.1)', color: 'rgb(236, 72, 153)' }}>
                    <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  </span>
                  Phrases & Idioms
                </h2>
                <div className="space-y-4">
                  {data.commonPhrases.map((item, id) => {
                    const spellOut = item.phrase.replace(/ \/ | & /g, ", ");
                    return (
                      <div key={id} className="vocab-item" style={{ borderLeft: '4px solid rgb(236, 72, 153)' }}>
                        <div className="flex justify-between items-center mb-2" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div className="flex items-center space-x-2">
                            <span className="vocab-word" style={{ color: 'rgb(219, 39, 119)' }}>{item.phrase}</span>
                            <button onClick={() => speakText(spellOut)} className="speech-btn" title="Listen to pronunciation">
                              <svg style={{ width: '1.25rem', height: '1.25rem', color: 'rgb(219, 39, 119)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"></path></svg>
                            </button>
                          </div>
                          <span className="vocab-translation" style={{ backgroundColor: 'rgb(253, 242, 248)', color: 'rgb(190, 24, 93)' }}>{item.translation}</span>
                        </div>
                        <div style={{ marginBottom: '0.75rem' }}>
                          <p style={{ color: 'var(--text-main)', fontWeight: 500, fontSize: '0.875rem' }}>{item.meaning.en}</p>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.125rem' }}>{item.meaning.zh}</p>
                        </div>
                        {item.example && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic', backgroundColor: 'rgba(236, 72, 153, 0.05)', padding: '0.5rem', borderRadius: '0.5rem' }}>{item.example}</p>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>We are currently building the detailed prep guide for Day {day}. Check back soon!</p>
          </section>
        )}
      </main>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TopicPreview;
