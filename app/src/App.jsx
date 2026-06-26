import { useState, useRef } from 'react';
import './App.css';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const fileInputRef = useRef(null);

  const mockAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setCandidates([
        { id: 1, name: "Alice Chen", role: "Senior Frontend Engineer", score: 95, summary: "Strong React and Vite experience. Excellent cultural fit.", emailDraft: "Hi Alice,\n\nI was incredibly impressed by your React experience on GitHub. I'd love to chat with you about a Senior Frontend role at our company.\n\nBest,\nLemma Agent" },
        { id: 2, name: "Marcus Johnson", role: "Fullstack Developer", score: 88, summary: "Great backend skills, but slightly lacking in modern CSS frameworks.", emailDraft: "Hi Marcus,\n\nYour backend experience stood out to us. Do you have time next week for a quick sync?\n\nBest,\nLemma Agent" },
        { id: 3, name: "Sarah Williams", role: "UI/UX Designer", score: 92, summary: "Beautiful portfolio. Strong focus on accessibility and motion.", emailDraft: "Hi Sarah,\n\nYour focus on accessibility is exactly what we need for our new project. Let's talk.\n\nBest,\nLemma Agent" },
      ]);
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">
          <span className="sparkle">✨</span> Lemma Recruiter
        </div>
        <div className="nav-links">
          <button className="btn-secondary" onClick={() => alert("Feature coming soon in V2!")}>Job Descriptions</button>
          <button className="btn-primary" onClick={() => alert("Feature coming soon in V2!")}>Settings</button>
        </div>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <h1>AI-Powered <span className="highlight">Talent Sourcing</span></h1>
          <p>Drop resumes here. Our Lemma Agent will instantly parse, score, and draft personalized outreach.</p>
        </div>

        <div 
          className={`drop-zone ${isDragging ? 'dragging' : ''} ${analyzing ? 'analyzing' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); mockAnalysis(); }}
          onClick={() => !analyzing && fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            multiple 
            accept=".pdf" 
            style={{ display: 'none' }} 
            ref={fileInputRef}
            onChange={(e) => { if (e.target.files.length > 0) mockAnalysis(); }}
          />
          {analyzing ? (
            <div className="loader">
              <div className="spinner"></div>
              <p>Lemma Agent is analyzing resumes...</p>
            </div>
          ) : (
            <div className="upload-prompt">
              <div className="upload-icon">📄</div>
              <h3>Drag & Drop Resumes (PDF)</h3>
              <p>or click to browse files</p>
            </div>
          )}
        </div>

        {candidates.length > 0 && (
          <div className="results-section">
            <h2>Top Candidates</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Role Match</th>
                    <th>Score</th>
                    <th>Agent Summary</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map(c => (
                    <tr key={c.id}>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.role}</td>
                      <td>
                        <span className={`score-badge ${c.score > 90 ? 'high' : 'medium'}`}>
                          {c.score}/100
                        </span>
                      </td>
                      <td className="summary-cell">{c.summary}</td>
                      <td>
                        <button className="btn-action" onClick={() => setSelectedCandidate(c)}>
                          View Email
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {selectedCandidate && (
        <div className="modal-overlay" onClick={() => setSelectedCandidate(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Drafted Outreach for {selectedCandidate.name}</h3>
              <button className="close-btn" onClick={() => setSelectedCandidate(null)}>×</button>
            </div>
            <div className="modal-body">
              <textarea 
                className="email-editor" 
                defaultValue={selectedCandidate.emailDraft}
                rows={6}
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedCandidate(null)}>Cancel</button>
              <button className="btn-primary" onClick={() => {
                const subject = encodeURIComponent(`Regarding your application for ${selectedCandidate.role}`);
                const body = encodeURIComponent(selectedCandidate.emailDraft);
                window.location.href = `mailto:candidate@example.com?subject=${subject}&body=${body}`;
                setSelectedCandidate(null);
              }}>Send Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
