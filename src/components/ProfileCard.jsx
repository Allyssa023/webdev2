export function ProfileCard({ name, age, role }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      padding: '25px',
      margin: '15px',
      maxWidth: '280px',
      color: 'white',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '15px',
        borderBottom: '2px solid rgba(255,255,255,0.3)',
        paddingBottom: '10px'
      }}>
        {name}
      </div>
      <div style={{ fontSize: '16px', marginBottom: '8px', opacity: 0.9 }}>
        <strong>Age:</strong> {age}
      </div>
      <div style={{ 
        fontSize: '16px', 
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '8px 12px',
        borderRadius: '6px',
        fontWeight: '600'
      }}>
        {role}
      </div>
    </div>
  );
}