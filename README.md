# Cool Teo Carousel 🎠

A reusable, infinite-scroll image carousel for React with TypeScript, featuring smooth scrolling, lazy loading, and mobile optimization.

## ✨ Features

- **Infinite Scroll**: Seamless looping through images
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Lazy Loading**: Optimized image loading for performance
- **TypeScript**: Full type safety and IntelliSense support
- **SASS Modules**: Modern styling with variables, mixins, and nesting
- **Accessibility**: ARIA-compliant with proper alt text support
- **Customizable**: Configurable dimensions, gaps, and event handlers
- **Flexible Styling**: External CSS class support for custom theming

## 📖 Usage

```tsx
import { InfiniteCarousel } from 'cool-teo-carousel';

const images = [
  { id: 1, src: '/image1.jpg', alt: 'Image 1' },
  { id: 2, src: '/image2.jpg', alt: 'Image 2' },
  // ... more images
];

function App() {
  return (
    <InfiniteCarousel
      images={images}
      slidesPerView={2}
      gap={16}
      loop={true}
      autoplay={true}
      onImageClick={(image, index) => console.log('Clicked:', image, index)}
    />
  );
}
```

### Custom Styling with classNames

```tsx
<InfiniteCarousel
  images={images}
  slidesPerView={3}
  gap={20}
  classNames={{
    container: 'my-custom-carousel',
    viewport: 'my-custom-viewport',
    carouselContainer: 'my-custom-inner',
    item: 'my-custom-item',
    image: 'my-custom-image',
    loading: 'my-custom-loading'
  }}
/>
```

### Setup

```bash
git clone https://github.com/t-kostadinow/cool-teo-carousel.git
cd cool-teo-carousel
npm install
npm run dev        # Start development server
npm run storybook  # Start Storybook
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook
- `npm test` - Run tests

## 🔒 Pre-commit Hooks

This project uses **Husky** and **lint-staged** to ensure code quality before commits.

**What gets checked:**
- ESLint (code style and errors)
- TypeScript (type checking)
- Build verification
- Prettier formatting

**Manual testing:**
```bash
npm run pre-commit  # Runs all checks manually
```

**Emergency bypass:**
```bash
git commit --no-verify -m "Emergency fix"
```

## 🔧 Configuration

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `CarouselImage[]` | `[]` | Array of images to display |
| `className` | `string` | `''` | Additional CSS classes for the main container |
| `classNames` | `object` | `{}` | Custom CSS classes for individual elements |
| `slidesPerView` | `number` | `1` | Number of images to show at once |
| `gap` | `number` | `16` | Gap between images in pixels |
| `loading` | `'lazy' \| 'eager'` | `'eager'` | Image loading strategy |
| `loop` | `boolean` | `false` | Enable infinite looping |
| `autoplay` | `boolean` | `false` | Enable automatic sliding |
| `autoplayInterval` | `number` | `3000` | Autoplay interval in milliseconds |

### classNames Object

| Property | Description |
|----------|-------------|
| `container` | Main carousel container |
| `viewport` | Viewport wrapper for the carousel |
| `carouselContainer` | Inner container that holds the slides |
| `item` | Individual slide/item container |
| `image` | Image element within each slide |
| `loading` | Loading state message |

### Events

- `onImageClick`: Fired when an image is clicked
- `onImageLoad`: Fired when an image finishes loading
- `onImageError`: Fired when an image fails to load

## 🎨 Styling & Mobile

- SASS modules with variables, mixins, and nesting
- Mobile-first responsive design
- Touch-friendly scrolling with scroll snap
- High-DPI display optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all pre-commit checks pass
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
