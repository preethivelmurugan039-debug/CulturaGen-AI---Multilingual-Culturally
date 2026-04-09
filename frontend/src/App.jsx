import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productName, setProductName] = useState('');
  const [country, setCountry] = useState('India');
  const [tone, setTone] = useState('Casual');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.className = `theme-${country}`;
  }, [country]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName, country, tone }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching generation:', error);
      alert('Failed to generate. Ensure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) return "Generating... ⏳";
    switch(country) {
      case 'India': return '✨ Generate Festive Magic';
      case 'USA': return '⚡ Generate Now';
      case 'Japan': return '🌸 Create Elegance';
      default: return 'Generate';
    }
  };

  return (
    <>
      <div className="header animate-fade-in">
        <h1 className="title">🌍 CulturaGen AI</h1>
        <p className="subtitle">Smart Cultural Product Descriptions with Global Intelligence ✨</p>
      </div>

      <div className="app-container">
        
        {/* Left Side: Inputs */}
        <div className="card input-section animate-fade-in delay-100">
          <div className="input-group">
            <label className="input-label">🛍️ Enter your product name</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. Smart Watch, Tea Maker, Speakers" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">🌎 Select Country</label>
            <select 
              className="input-field" 
              value={country} 
              onChange={(e) => {
                setCountry(e.target.value);
                setResult(null); // Reset result on country change
              }}
            >
              <option value="India">🇮🇳 India</option>
              <option value="USA">🇺🇸 USA</option>
              <option value="Japan">🇯🇵 Japan</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">🎭 Select Tone</label>
            <select 
              className="input-field" 
              value={tone} 
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Casual">😎 Casual</option>
              <option value="Professional">🧑‍💼 Professional</option>
              <option value="Luxury">💎 Luxury</option>
            </select>
          </div>

          <button className="action-btn" onClick={handleGenerate}>
            {getButtonText()}
          </button>
        </div>

        {/* Right Side: Output */}
        <div className="card output-section animate-fade-in delay-200">
          {!result ? (
            <div className="empty-state">
              <div className="empty-icon">✨</div>
              <p>Configure your product above and click generate to see the cultural magic happen.</p>
            </div>
          ) : (
            <div className="results animate-fade-in">
              <div className="cultural-icon">{result.icon}</div>
              
              <div className="result-item delay-100 animate-fade-in">
                <div className="result-label">📝 Product Description</div>
                <div className="result-text large">{result.description}</div>
              </div>
              
              <div className="result-item delay-100 animate-fade-in">
                <div className="result-label">📢 Tagline (English)</div>
                <div className="result-text">{result.tagline}</div>
              </div>
              
              <div className="result-item delay-200 animate-fade-in">
                <div className="result-label">🌐 Native Language Tagline</div>
                <div className="result-text font-bold">{result.nativeTagline}</div>
              </div>
              
              <div className="result-item delay-300 animate-fade-in" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="result-label">🧠 Cultural Insight</div>
                <div className="insight-box">{result.insight}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default App;
