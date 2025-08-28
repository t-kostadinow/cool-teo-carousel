import InfiniteCarousel from '../components/InfiniteCarousel/InfiniteCarousel'
import { generateImages } from '../utils/imageGenerator'

function Home() {
  const sampleImages = generateImages({ count: 10, width: 400, height: 300 })

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
        Cool Teo Carousel
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        A reusable, infinite-scroll image carousel for React with TypeScript.
      </p>
      
      <div style={{
        margin: '2rem 0',
        padding: '1rem',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ color: '#444', marginBottom: '1rem' }}>Basic Carousel Example</h2>
        <InfiniteCarousel
          images={sampleImages}
          slidesPerView={3}
          gap={16}
          loop={true}
        />
      </div>

      <div style={{
        margin: '2rem 0',
        padding: '1rem',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ color: '#444', marginBottom: '1rem' }}>Autoplay Carousel Example</h2>
        <InfiniteCarousel
          images={sampleImages}
          slidesPerView={2}
          gap={20}
          loop={true}
          autoplay={true}
          autoplayInterval={3000}
        />
      </div>
    </div>
  )
}

export default Home
