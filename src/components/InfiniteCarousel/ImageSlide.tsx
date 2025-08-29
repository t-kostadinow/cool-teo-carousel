import { calculateSlideMargin, calculateSlideWidth } from '../../utils';
import { CarouselImage } from './contracts';

interface ImageSlideProps {
    image: CarouselImage;
    index: number;
    totalImages: number;
    slidesPerView: number;
    gap: number;
    loading: 'eager' | 'lazy';
    classNames: {
        item: string;
        image: string;
    };
    onImageClick?: (image: CarouselImage, index: number) => void;
    onImageLoad?: (image: CarouselImage, index: number) => void;
    onImageError?: (image: CarouselImage, index: number) => void;
}

function ImageSlide({
    image,
    index,
    totalImages,
    slidesPerView,
    gap,
    loading: _loading,
    classNames,
    onImageClick,
    onImageLoad,
    onImageError,
}: ImageSlideProps) {
    const loading = _loading === 'eager' ? 'eager' : (index < slidesPerView ? 'eager' : 'lazy');
    
    return (
        <div
            key={image.id}
            className={classNames.item}
            style={{
                width: calculateSlideWidth(slidesPerView, gap),
                marginRight: calculateSlideMargin(index, totalImages, gap)
            }}
            onClick={() => onImageClick?.(image, index)}
        >
            <img
                src={image.src}
                alt={image.alt || `Image ${index + 1}`}
                className={classNames.image}
                style={{
                    ...(image.width && image.height && {
                        aspectRatio: `${image.width} / ${image.height}`,
                        objectFit: 'contain'
                    })
                }}
                loading={loading}
                onLoad={() => onImageLoad?.(image, index)}
                onError={() => onImageError?.(image, index)}
                draggable={false}
            />
        </div>
    );
}

export default ImageSlide;
