import { Link, Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <nav style={{
        background: '#333',
        padding: '1rem',
        color: 'white'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '2rem',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background 0.2s'
        }}>Home</Link>
        <Link to="/about" style={{
          color: 'white',
          textDecoration: 'none',
          marginRight: '2rem',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background 0.2s'
        }}>About</Link>
      </nav>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
