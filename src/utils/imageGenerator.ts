import { CarouselImage } from '../components/InfiniteCarousel/contracts';

type GenerateImagesOptions = {
    count: number;
    width?: number;
    height?: number;
};

type GenerateImageOptions = {
    id: string | number;
    width: number;
    height: number;
    alt?: string;
};

/**
 * Generates an array of CarouselImage objects with placehold.co URLs
 */
export const generateImages = (
    { count, width = 400, height = 300 }: GenerateImagesOptions
): CarouselImage[] => {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        src: `https://placehold.co/${width}x${height}/4A90E2/FFFFFF?text=Image+${index + 1}`,
        alt: `Random Image ${index + 1}`
    }));
};

/**
 * Generates a single image with specified dimensions
 */
export const generateImage = (
    { id, width, height, alt }: GenerateImageOptions
): CarouselImage => {
    return {
        id,
        src: `https://placehold.co/${width}x${height}/4A90E2/FFFFFF?text=Image+${id}`,
        alt: alt || `Image ${id}`,
        width,
        height,
    };
};
