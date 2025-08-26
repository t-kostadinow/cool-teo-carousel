# Cool Teo Carousel 🎠

A reusable, infinite-scroll image carousel for React with TypeScript, featuring smooth scrolling, lazy loading, and mobile optimization.

## ✨ Features

- **Infinite Scroll**: Seamless looping through images
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Lazy Loading**: Optimized image loading for performance
- **TypeScript**: Full type safety and IntelliSense support
- **SASS Modules**: Modern styling with variables, mixins, and nesting
- **Accessibility**: ARIA-compliant and keyboard navigation support
- **Customizable**: Configurable dimensions, gaps, and event handlers

## 🚀 Installation

```bash
npm install cool-teo-carousel
```

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
      itemWidth={300}
      itemHeight={200}
      gap={16}
      onImageClick={(image, index) => console.log('Clicked:', image, index)}
    />
  );
}
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd cool-teo-carousel

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run storybook` - Start Storybook
- `npm run pre-commit` - Run all pre-commit checks manually

## 🔒 Pre-commit Hooks

This project uses **Husky** and **lint-staged** to ensure code quality before commits.

### What Gets Checked

1. **ESLint**: Code style and potential errors
2. **TypeScript**: Type checking and compilation
3. **Build**: Production build verification
4. **Prettier**: Code formatting (via lint-staged)

### How It Works

- **Automatic**: Hooks run automatically on every commit
- **Blocking**: Commits are blocked if any checks fail
- **Fast**: Only staged files are processed by lint-staged

### Manual Testing

```bash
# Test pre-commit checks manually
npm run pre-commit

# This runs:
# 1. npm run lint
# 2. npx tsc --noEmit
# 3. npm run build
```

### Bypassing Hooks (Emergency Only)

```bash
git commit --no-verify -m "Emergency fix"
```

## 🎨 Styling

The carousel uses SASS modules with:

- **Variables**: Consistent spacing, colors, and timing
- **Mixins**: Reusable patterns for common styles
- **Nesting**: Clean, organized CSS structure
- **Responsive**: Mobile-first media queries

## 📱 Mobile Optimization

- Touch-friendly scrolling
- Scroll snap for precise positioning
- Disabled hover effects on mobile
- Optimized for high-DPI displays

## 🔧 Configuration

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `CarouselImage[]` | `[]` | Array of images to display |
| `itemWidth` | `number` | `300` | Width of each image item |
| `itemHeight` | `number` | `200` | Height of each image item |
| `gap` | `number` | `16` | Gap between images |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Image loading strategy |
| `className` | `string` | `''` | Additional CSS classes |

### Events

- `onImageClick`: Fired when an image is clicked
- `onImageLoad`: Fired when an image finishes loading
- `onImageError`: Fired when an image fails to load

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📦 Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all pre-commit checks pass
5. Submit a pull request

### Code Style

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Include tests for new features

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React 19 and TypeScript
- Styled with SASS modules
- Bundled with Vite
- Quality ensured with Husky and lint-staged
