# Cool Teo Carousel

A reusable, infinite-scroll image carousel for React with TypeScript, featuring smooth scrolling, lazy loading, and mobile responsivness.

## 🎯 The Problem

Create an infinite image carousel (the items loop when either end is reached) using React. Navigation inside the carousel should only be triggered by scroll, rather than arrows or buttons.

## 📋 Requirements

The component must:
- **Work with images of different sizes and aspect ratios**
- **Work on devices with different screen sizes**
- **Work on both mobile and desktop**
- **Work equally well with a dozen of images, as well as 1000+ images**
- **Be reusable**

## ✨ Features

- **Infinite Scroll**: Seamless looping through images
- **Responsive Design**: Works on different screen sizes
- **Touch & Mouse Support**: Smooth scrolling on mobile and desktop
- **Customizable**: Configurable dimensions, gaps, and event handlers

> **Note**: This carousel was built to host ONLY image items as per requirements.

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
| `carouselContainer` | Inner container that holds the slides |
| `item` | Individual slide/item container |
| `image` | Image element within each slide |
| `loading` | Loading state message |

### Events

- `onImageClick`: Fired when an image is clicked
- `onImageLoad`: Fired when an image finishes loading
- `onImageError`: Fired when an image fails to load

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
