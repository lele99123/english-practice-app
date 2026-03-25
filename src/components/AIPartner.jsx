import React from 'react';

const AIPartner = () => {
  return (
    <>
      <header className="header gradient-bg mb-8 text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 1.5rem' }}>
        <div style={{ 
          width: '6rem', height: '6rem', 
          backgroundColor: 'var(--white)', 
          borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '1.5rem',
          position: 'relative'
        }}>
          {/* Pulsing ring animation for the voice assistant */}
          <div style={{
            position: 'absolute',
            width: '100%', height: '100%',
            borderRadius: '50%',
            border: '2px solid var(--blue-200)',
            animation: 'pulse 2s infinite ease-out'
          }}></div>
          
          <svg style={{ width: '3rem', height: '3rem', color: 'var(--blue-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
        </div>
        <h1>AI Speaking Partner</h1>
        <p style={{ marginTop: '0.5rem' }}>Ready to practice? I'm listening.</p>
      </header>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      <main className="container space-y-4 text-center">
        <section className="card" style={{ padding: '3rem 1.5rem' }}>
          <button style={{
            backgroundColor: 'var(--blue-600)',
            color: 'var(--white)',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-xl)',
            fontSize: '1.125rem',
            fontWeight: 600,
            boxShadow: 'var(--shadow-md)',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--indigo-700)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--blue-600)'}
          >
            Start Conversation
          </button>
          
          <p style={{ color: 'var(--text-light)', marginTop: '1.5rem', fontSize: '0.875rem' }}>
            Powered by Web Speech API (Placeholder).<br/>
            Waiting for backend integration for real AI dialogue.
          </p>
        </section>
      </main>
    </>
  );
};

export default AIPartner;
