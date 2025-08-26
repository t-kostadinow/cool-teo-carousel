export interface CarouselImage {
    id: string | number;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}

export interface InfiniteCarouselProps {
    images: CarouselImage[];
    className?: string;
    itemWidth?: number;
    itemHeight?: number;
    gap?: number;
    loading?: 'lazy' | 'eager';
    onImageClick?: (image: CarouselImage, index: number) => void;
    onImageLoad?: (image: CarouselImage, index: number) => void;
    onImageError?: (image: CarouselImage, index: number) => void;
}

export interface ScrollPosition {
    scrollLeft: number;
    scrollWidth: number;
    clientWidth: number;
}

export interface UseInfiniteScrollReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    scrollPosition: ScrollPosition;
    isScrolling: boolean;
}
