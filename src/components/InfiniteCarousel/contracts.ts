export interface CarouselImage {
    id: string | number;
    src: string;
    alt?: string;
    width?: number;
    height?: number;
}

export interface InfiniteCarouselClassNames {
    container: string;
    carouselContainer: string;
    item: string;
    image: string;
    loading: string;
}

export interface InfiniteCarouselProps {
    images: CarouselImage[];
    classNames?: Partial<InfiniteCarouselClassNames>;
    slidesPerView?: number;
    gap?: number;
    loading?: 'lazy' | 'eager';
    loop?: boolean;
    autoplay?: boolean;
    autoplayInterval?: number;
    onImageClick?: (image: CarouselImage, index: number) => void;
    onImageLoad?: (image: CarouselImage, index: number) => void;
    onImageError?: (image: CarouselImage, index: number) => void;
}
