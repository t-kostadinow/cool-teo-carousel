import { render, screen } from '@testing-library/react';
import InfiniteCarousel from '../InfiniteCarousel';
import { CarouselImage } from '../../../types';

// Mock data for testing
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
        render(<InfiniteCarousel images={mockImages} />);
        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(2);
    });
});
