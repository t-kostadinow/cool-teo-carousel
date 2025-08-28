function About() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>About</h1>
      
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#444', marginBottom: '1rem' }}>Cool Teo Carousel</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          A simple carousel component for React. Great for image galleries and content slideshows.
        </p>
      </div>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '2rem'
      }}>
        <h2 style={{ color: '#444', marginBottom: '1rem' }}>Features</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>Infinite scroll</li>
          <li>Touch and swipe support</li>
          <li>Responsive design</li>
          <li>Customizable slides per view</li>
          <li>Autoplay support</li>
          <li>Event handling</li>
        </ul>
      </div>

      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ color: '#444', marginBottom: '1rem' }}>Usage</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
          Simply import the component and pass your images array. The carousel handles 
          everything else automatically.
        </p>
        <p style={{ lineHeight: '1.6', marginBottom: '0' }}>
          <strong>Author:</strong> Teodor Kostadinov<br />
          <strong>License:</strong> MIT
        </p>
      </div>
    </div>
  )
}

export default About
