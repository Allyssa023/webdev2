import { ProfileCard } from './ProfileCard';

export function ProfileList() {
  const profiles = [
    { name: "Allyssa Dulay", age: 25, role: "Marketing Manager" },
    { name: "Ptero Lynn", age: 30, role: "Operations Director" },
    { name: "Dina Voltson", age: 25, role: "Content Writer" }
  ];

  return (
    <section style={{ 
      marginBottom: '50px',
      padding: '30px',
      background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
      borderRadius: '15px'
    }}>
      <h2 style={{ 
        color: '#2d3748', 
        fontSize: '32px',
        marginBottom: '10px',
        fontWeight: '700'
      }}>
        👥 Our Team
      </h2>
      <p style={{ 
        color: '#718096', 
        marginBottom: '30px',
        fontSize: '16px'
      }}>
        Meet the talented professionals driving our success
      </p>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        gap: '20px' 
      }}>
        {profiles.map((profile, index) => (
          <ProfileCard 
            key={index}
            name={profile.name}
            age={profile.age}
            role={profile.role}
          />
        ))}
      </div>
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#e6f3ff',
        borderLeft: '4px solid #667eea',
        borderRadius: '8px'
      }}>
        <strong style={{ color: '#2d3748' }}>💡 Reflection:</strong>
        <p style={{ margin: '8px 0 0 0', color: '#4a5568' }}>
          Props allow us to create reusable components that accept different data, 
          eliminating code duplication and making maintenance easier.
        </p>
      </div>
    </section>
  );
}