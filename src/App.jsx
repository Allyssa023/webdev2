import { ProfileList } from './components/ProfileList';
import { StepCounter } from './components/StepCounter';
import { ProductInfo } from './components/ProductInfo';
import './App.css';

export default function App() {
  const products = [
    {
      name: "Gaming Mouse",
      price: 1999.99,
      details: "Ergonomic gaming mouse with RGB lighting, 16000 DPI sensor, programmable buttons, and lightweight design. Perfect for gamers and professionals."
    },
    {
      name: "Mechanical Keyboard",
      price: 2600.99,
      details: "Premium mechanical keyboard featuring Cherry MX switches, customizable RGB backlighting, aluminum frame, and N-key rollover for ultimate typing experience."
    }
  ];

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px 20px',
      backgroundColor: '#f7fafc',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '50px',
        padding: '40px 30px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '42px',
          fontWeight: '800',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          Barney's Tech-a-Saurus Store 
        </h1>
      </header>

      <ProfileList />
      <StepCounter />

      <section style={{ 
        marginBottom: '50px',
        padding: '30px',
        background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
        borderRadius: '15px'
      }}>
        <h2 style={{ 
          color: '#2d3748', 
          marginBottom: '10px',
          fontSize: '32px',
          fontWeight: '700'
        }}>
          🎮 Product Catalog
        </h2>
        <p style={{ 
          color: '#718096', 
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          Discover our premium gaming and tech products
        </p>
        {products.map((product, idx) => (
          <ProductInfo 
            key={idx}
            name={product.name}
            price={product.price}
            details={product.details}
          />
        ))}
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#d4edda',
          borderLeft: '4px solid #48bb78',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <strong style={{ color: '#2d3748' }}>💡 Reflection:</strong>
          <p style={{ margin: '8px 0 0 0', color: '#4a5568' }}>
            Yes! Toggleable content makes the UI more interactive by giving users 
            control over what information they view, reducing cognitive load and improving user experience.
          </p>
        </div>
      </section>
    </div>
  );
}