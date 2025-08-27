import { fireEvent, render, screen } from '@testing-library/react';
import { CarouselImage } from '../contracts';
import InfiniteCarousel from '../InfiniteCarousel';

const mockImages: CarouselImage[] = [
    {
        id: '1',
        src: 'https://example.com/image1.jpg',
        alt: 'Test Image 1'
    },
    {
        id: '2',
        src: 'https://example.com/image2.jpg',
        alt: 'Test Image 2'
    }
];

const mockImagesWithDimensions: CarouselImage[] = [
    {
        id: '1',
        src: 'https://example.com/image1.jpg',
        alt: 'Test Image 1',
        width: 800,
        height: 400
    },
    {
        id: '2',
        src: 'https://example.com/image2.jpg',
        alt: 'Test Image 2',
        width: 400,
        height: 300
    }
];

describe('InfiniteCarousel', () => {
    it('renders without crashing', () => {
        render(<InfiniteCarousel images={mockImages} />);
        expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
    });

    it('displays no images message when images array is empty', () => {
        render(<InfiniteCarousel images={[]} />);
        expect(screen.getByText('No images to display')).toBeInTheDocument();
    });

    it('renders correct number of images', () => {
        render(<InfiniteCarousel images={mockImages} slidesPerView={2} />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
    });

    it('applies aspect ratio when width and height are provided', () => {
        render(<InfiniteCarousel images={mockImagesWithDimensions} slidesPerView={1} />);
        const firstImage = screen.getByAltText('Test Image 1');
        const secondImage = screen.getByAltText('Test Image 2');
        
        expect(firstImage).toHaveStyle({
            aspectRatio: '800 / 400',
            objectFit: 'contain'
        });
        expect(secondImage).toHaveStyle({
            aspectRatio: '400 / 300',
            objectFit: 'contain'
        });
    });

    it('does not apply aspect ratio when width and height are missing', () => {
        render(<InfiniteCarousel images={mockImages} slidesPerView={1} />);
        const firstImage = screen.getByAltText('Test Image 1');
        
        expect(firstImage).not.toHaveStyle({
            aspectRatio: expect.any(String)
        });
    });

    it('applies custom gap between images', () => {
        const { container } = render(
            <InfiniteCarousel images={mockImages} slidesPerView={2} gap={32} />
        );
        
        const carouselContainer = container.querySelector('.infinite-carousel');
        expect(carouselContainer).toHaveStyle({
            '--carousel-gap': '32px',
            '--slides-per-view': '2'
        });
    });

    it('sets correct loading attribute for eager loading', () => {
        render(<InfiniteCarousel images={mockImages} loading="eager" />);
        const images = screen.getAllByRole('img');
        
        images.forEach(image => {
            expect(image).toHaveAttribute('loading', 'eager');
        });
    });

    it('sets correct loading attribute for lazy loading', () => {
        render(<InfiniteCarousel images={mockImages} loading="lazy" slidesPerView={1} />);
        const images = screen.getAllByRole('img');
        
        expect(images[0]).toHaveAttribute('loading', 'eager');
        expect(images[1]).toHaveAttribute('loading', 'lazy');
    });

    it('calls onImageClick when image is clicked', () => {
        const handleImageClick = jest.fn();
        render(
            <InfiniteCarousel 
                images={mockImages} 
                onImageClick={handleImageClick}
            />
        );
        
        const firstImage = screen.getByAltText('Test Image 1');
        fireEvent.click(firstImage);
        
        expect(handleImageClick).toHaveBeenCalledWith(mockImages[0], 0);
    });

    it('calls onImageLoad when image loads', () => {
        const handleImageLoad = jest.fn();
        render(
            <InfiniteCarousel 
                images={mockImages} 
                onImageLoad={handleImageLoad}
            />
        );
        
        const firstImage = screen.getByAltText('Test Image 1');
        fireEvent.load(firstImage);
        
        expect(handleImageLoad).toHaveBeenCalledWith(mockImages[0], 0);
    });

    it('calls onImageError when image fails to load', () => {
        const handleImageError = jest.fn();
        render(
            <InfiniteCarousel 
                images={mockImages} 
                onImageError={handleImageError}
            />
        );
        
        const firstImage = screen.getByAltText('Test Image 1');
        fireEvent.error(firstImage);
        
        expect(handleImageError).toHaveBeenCalledWith(mockImages[0], 0);
    });

    it('handles single image correctly', () => {
        const singleImage: CarouselImage[] = [
            { id: '1', src: 'test.jpg', alt: 'Single Image' }
        ];
        
        render(<InfiniteCarousel images={singleImage} slidesPerView={1} />);
        
        const image = screen.getByAltText('Single Image');
        expect(image).toBeInTheDocument();
    });

    it('provides alt text for all images', () => {
        render(<InfiniteCarousel images={mockImages} />);
        
        const images = screen.getAllByRole('img');
        images.forEach(image => {
            expect(image).toHaveAttribute('alt');
        });
    });
});
