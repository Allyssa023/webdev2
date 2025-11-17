import { useState } from 'react';

export function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const incrementCount = () => {
    setCount(prevCount => prevCount + step);
  };

  const resetCounter = () => {
    setCount(0);
  };

  return (
    <section style={{ 
      marginBottom: '50px', 
      padding: '35px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
      color: 'white'
    }}>
      <h2 style={{ 
        color: 'white', 
        fontSize: '32px',
        marginBottom: '10px',
        fontWeight: '700'
      }}>
        🔢 Interactive Counter
      </h2>
      <p style={{ 
        color: 'rgba(255,255,255,0.9)', 
        marginBottom: '25px',
        fontSize: '16px'
      }}>
        Set your step value
      </p>
      
      <div style={{ 
        marginBottom: '25px',
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: '20px',
        borderRadius: '10px'
      }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '10px', 
          fontWeight: 'bold',
          fontSize: '18px'
        }}>
          Step Amount:
        </label>
        <input 
          type="number" 
          value={step} 
          onChange={(e) => setStep(parseInt(e.target.value) || 0)}
          style={{ 
            padding: '12px 15px', 
            fontSize: '18px',
            width: '120px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      <div style={{ 
        fontSize: '72px', 
        fontWeight: 'bold', 
        color: '#ffffff',
        margin: '30px 0',
        textAlign: 'center',
        textShadow: '0 4px 8px rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: '30px',
        borderRadius: '15px'
      }}>
        {count}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={incrementCount}
          style={{ 
            padding: '15px 35px', 
            fontSize: '18px',
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          ➕ Add Step
        </button>
        <button 
          onClick={resetCounter}
          style={{ 
            padding: '15px 35px', 
            fontSize: '18px',
            backgroundColor: '#f56565',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          🔄 Reset
        </button>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)'
      }}>
        <strong>🤔 Question:</strong> What if step is zero? 
        <br />
        <strong>✅ Answer:</strong> The count remains unchanged because adding 0 has no effect.
      </div>
    </section>
  );
}