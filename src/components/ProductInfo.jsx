import { useState } from 'react';

export function ProductInfo({ name, price, details }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggle = () => {
    setShowDetails(prevState => !prevState);
  };

  return (
    <article style={{
      border: '3px solid #e2e8f0',
      borderRadius: '15px',
      padding: '30px',
      marginBottom: '25px',
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = '#667eea';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '#e2e8f0';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ 
          margin: 0, 
          color: '#2d3748',
          fontSize: '26px',
          fontWeight: '700'
        }}>
          {name}
        </h3>
        <span style={{
          backgroundColor: '#48bb78',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          Tech
        </span>
      </div>
      
      <div style={{ 
        fontSize: '32px', 
        fontWeight: 'bold', 
        color: '#667eea',
        margin: '15px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '20px', color: '#718096' }}>Price:</span>
        ₱{price.toFixed(2)}
      </div>

      <button 
        onClick={handleToggle}
        style={{
          padding: '12px 28px',
          backgroundColor: showDetails ? '#718096' : '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
      >
        {showDetails ? '▲ Hide Details' : '▼ Show Details'}
      </button>

      {showDetails && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f7fafc',
          borderRadius: '10px',
          borderLeft: '5px solid #667eea',
          animation: 'fadeIn 0.3s ease'
        }}>
          <p style={{ 
            margin: 0, 
            color: '#4a5568',
            lineHeight: '1.6',
            fontSize: '15px'
          }}>
            {details}
          </p>
        </div>
      )}
    </article>
  );
}