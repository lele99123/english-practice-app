import React, { useState, useEffect, useRef } from 'react';
import ClassReview from './components/ClassReview';
import TopicPreview from './components/TopicPreview';
import VocabApp from './components/VocabApp';
import topicsData from './data/topics.json';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedDay, setSelectedDay] = useState(1); // Default to Day 1
  const [isVocabAppOpen, setIsVocabAppOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const navItems = [
    { id: 'preview', label: 'Preview' },
    { id: 'review', label: 'Class Review' },
  ];

  const currentTopic = topicsData.find(t => t.day === selectedDay) || topicsData[0];

  return (
    <div className="app-container" style={{ minHeight: '100vh', paddingBottom: '6rem', paddingTop: '4rem' }}>
      
      {/* Top Navigation Menu for Days */}
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        backgroundColor: 'var(--white)',
        borderBottom: '1px solid var(--gray-200)',
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 0.5rem',
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        zIndex: 50,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}>
        <button 
          onClick={scrollLeft}
          style={{ background: 'none', border: 'none', padding: '0 0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>

        <div ref={scrollContainerRef} className="no-scrollbar" style={{ flex: 1, display: 'flex', overflowX: 'auto', WebkitOverflowScrolling: 'touch', whiteSpace: 'nowrap', scrollBehavior: 'smooth' }}>
          {topicsData.map(topic => (
            <button
              key={topic.day}
              onClick={() => setSelectedDay(topic.day)}
              style={{
                padding: '0.4rem 1rem',
                marginRight: '0.75rem',
                borderRadius: 'var(--radius-xl)',
                fontWeight: selectedDay === topic.day ? 600 : 500,
                backgroundColor: selectedDay === topic.day ? 'var(--indigo-600)' : 'var(--white)',
                color: selectedDay === topic.day ? 'var(--white)' : 'var(--text-muted)',
                border: '1px solid',
                borderColor: selectedDay === topic.day ? 'var(--indigo-600)' : 'var(--gray-200)',
                transition: 'all 0.2s',
                flexShrink: 0,
                fontSize: '0.875rem'
              }}
            >
              Day {topic.day}
            </button>
          ))}
        </div>
        
        <button 
          onClick={scrollRight}
          style={{ background: 'none', border: 'none', padding: '0 0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>

        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            marginLeft: '0.75rem',
            padding: '0.5rem',
            borderRadius: '50%',
            backgroundColor: 'var(--gray-100)',
            color: 'var(--text-main)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            flexShrink: 0,
            transition: 'background-color 0.2s',
            cursor: 'pointer'
          }}
          title="Toggle Night Style"
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </header>

      {/* Content Rendering */}
      {activeTab === 'preview' && <TopicPreview day={selectedDay} topic={currentTopic} />}
      {activeTab === 'review' && <ClassReview day={selectedDay} topic={currentTopic} />}

      {/* Bottom Navigation */}
      <nav style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        backgroundColor: 'var(--white)',
        borderTop: '1px solid var(--gray-200)',
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem 0.5rem',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)',
        zIndex: 50
      }}>
        {navItems.map(item => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              flex: 1,
              maxWidth: '160px',
              padding: '0.6rem 0',
              borderRadius: 'var(--radius-xl)',
              fontWeight: activeTab === item.id ? 600 : 500,
              color: activeTab === item.id ? 'var(--blue-600)' : 'var(--text-muted)',
              backgroundColor: activeTab === item.id ? 'var(--blue-100)' : 'transparent',
              transition: 'all 0.2s ease',
              fontSize: '0.9rem'
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Floating Action Button for Vocab App */}
      {!isVocabAppOpen && (
        <button 
          className="vocab-fab" 
          onClick={() => setIsVocabAppOpen(true)}
          title="Practice Vocabulary"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
        </button>
      )}

      {/* Vocab App Overlay */}
      {isVocabAppOpen && (
        <VocabApp 
          onClose={() => setIsVocabAppOpen(false)} 
          selectedDay={selectedDay} 
        />
      )}
      
      <style>{`
        /* Hide scrollbar for top menu */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default App;
