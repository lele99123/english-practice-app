import React from 'react';

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
  if (day !== 2) {
    return (
      <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
        <header className="header gradient-bg mb-8" style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0', paddingTop: '3rem' }}>
          <div className="header-content">
            <div className="flex items-center space-x-2 mb-2">
              <svg style={{ width: '1.5rem', height: '1.5rem', color: 'var(--blue-200)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
              <span className="header-tag">Study Notes • Day {day}</span>
            </div>
            <h1>{topic.title}</h1>
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
          <h1>{topic.title}</h1>
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
            <li className="flex" style={{ alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--blue-500)', marginRight: '0.5rem', marginTop: '0.25rem' }}>•</span>
              <span><strong>Today's Topic:</strong> We discussed daily routines, household chores, and what everyone likes to do in their free time.</span>
            </li>
            <li className="flex" style={{ alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--blue-500)', marginRight: '0.5rem', marginTop: '0.25rem' }}>•</span>
              <span><strong>Highlights:</strong> We talked about playing mobile games (like Candy Crush and Link-Link), watching TV series, and future hobbies to try, such as knitting sweaters, visiting ancient towns, and even skydiving!</span>
            </li>
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
            {/* Vocab Items */}
            {[
              { word: "Spare time / Free time", spellOut: "Spare time, Free time", translation: "空闲时间", example: "\"I have a lot of spare time on the weekends.\"" },
              { word: "Do the laundry", spellOut: "Do the laundry", translation: "洗衣服", example: "\"I need to do the laundry today.\" (More natural than saying 'wash clothes')" },
              { word: "Washer & Dryer", spellOut: "Washer and Dryer", translation: "洗衣机 / 烘干机", example: "\"I put my clothes in the washer, and then the dryer.\"" },
              { word: "Tile-matching game", spellOut: "Tile matching game", translation: "消除类游戏", example: "\"Candy Crush is a very popular tile-matching game.\"" },
              { word: "TV series / Drama", spellOut: "TV series, Drama", translation: "电视剧 / 剧集", example: "\"I like to watch TV series. Each show has many episodes (集).\"" },
              { word: "Knit sweaters", spellOut: "Knit sweaters", translation: "织毛衣", example: "\"I want to learn how to knit sweaters in the future.\"" },
              { word: "Ancient town", spellOut: "Ancient town", translation: "古镇", example: "\"I love traveling to see beautiful ancient towns.\"" },
              { word: "Skydiving", spellOut: "Skydiving", translation: "跳伞", example: "\"If I had unlimited money, I would go skydiving!\"" },
            ].map((item, id) => (
              <div key={id} className="vocab-item">
                <div className="flex justify-between items-center mb-2" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div className="flex items-center space-x-2">
                    <span className="vocab-word">{item.word}</span>
                    <button onClick={() => speakText(item.spellOut)} className="speech-btn" title="Listen to pronunciation">
                      <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"></path></svg>
                    </button>
                  </div>
                  <span className="vocab-translation">{item.translation}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{item.example}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Grammar Tips */}
        <section className="card">
          <h2 className="flex items-center mb-5" style={{ fontSize: '1.25rem' }}>
            <span className="section-icon-bg icon-green-bg">
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
            </span>
            Grammar & Phrasing Tips
          </h2>
          
          <div className="space-y-4" style={{ marginTop: '1.5rem' }}>
            {/* Tip 1 */}
            <div className="grammar-tip" style={{ marginBottom: '1.5rem' }}>
              <h3 className="mb-2" style={{ fontSize: '1rem' }}>Time is Uncountable</h3>
              <p className="mb-2" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>When talking about having free time, we don't add an "s" to the end of time.</p>
              <div className="grammar-box-incorrect">
                <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>"I have a lot of spare times."</span>
              </div>
              <div className="grammar-box-correct">
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                "I have a lot of spare time."
              </div>
            </div>

            {/* Tip 2 */}
            <div className="grammar-tip" style={{ marginBottom: '1.5rem' }}>
              <h3 className="mb-2" style={{ fontSize: '1rem' }}>Playing Games</h3>
              <p className="mb-2" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>We don't "play" the phone itself, we play games *on* the phone.</p>
              <div className="grammar-box-incorrect">
                <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>"I play phone."</span>
              </div>
              <div className="grammar-box-correct">
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                "I play games on my phone."
              </div>
            </div>

            {/* Tip 3 */}
            <div className="grammar-tip">
              <h3 className="mb-2" style={{ fontSize: '1rem' }}>Talking About Locations</h3>
              <p className="mb-2" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>It sounds more natural to name the country rather than use the adjective form when describing where a house is.</p>
              <div className="grammar-box-incorrect">
                <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>"My Chinese home has a real television."</span>
              </div>
              <div className="grammar-box-correct">
                <svg style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                "My home in China has a real television."
              </div>
            </div>
          </div>
        </section>

        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>Keep up the excellent work! See you next class! 🎉</p>
        </div>
      </main>
    </div>
  );
};

export default ClassReview;
