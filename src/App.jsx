import React, { useState } from 'react';
import ClassReview from './components/ClassReview';
import TopicPreview from './components/TopicPreview';
import topicsData from './data/topics.json';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedDay, setSelectedDay] = useState(1); // Default to Day 1

  const navItems = [
    { id: 'preview', label: 'Preview' },
    { id: 'review', label: 'Class Review' },
  ];

  const currentTopic = topicsData.find(t => t.day === selectedDay) || topicsData[0];

  return (
    <div className="app-container" style={{ minHeight: '100vh', paddingBottom: '6rem', paddingTop: '4rem' }}>
      
      {/* Top Navigation Menu for Days */}
      <header className="no-scrollbar" style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        backgroundColor: 'var(--white)',
        borderBottom: '1px solid var(--gray-200)',
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
        zIndex: 50,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        WebkitOverflowScrolling: 'touch'
      }}>
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
      
      <style>{`
        /* Hide scrollbar for top menu */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default App;
