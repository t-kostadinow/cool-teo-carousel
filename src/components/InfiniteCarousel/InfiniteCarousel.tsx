import React from 'react';
import { InfiniteCarouselProps } from '../../types';

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
    images,
    className = '',
    itemWidth = 300,
    itemHeight = 200,
    gap = 16,
    loading = 'lazy',
    onImageClick,
    onImageLoad,
    onImageError,
}) => {
    if (!images || images.length === 0) {
        return (
            <div className={`carousel ${className}`}>
                <div className="container">
                    <div className="loading" style={{ width: itemWidth, height: itemHeight }}>
                        No images to display
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`carousel ${className}`}
            style={{
                '--carousel-gap': `${gap}px`
            } as React.CSSProperties}
        >
            <div className="container">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className="imageWrapper"
                        style={{
                            width: itemWidth,
                            height: itemHeight,
                            minWidth: itemWidth,
                        }}
                        onClick={() => onImageClick?.(image, index)}
                    >
                        <img
                            src={image.src}
                            alt={image.alt || `Image ${index + 1}`}
                            className="image"
                            loading={loading}
                            onLoad={() => onImageLoad?.(image, index)}
                            onError={() => onImageError?.(image, index)}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteCarousel;
