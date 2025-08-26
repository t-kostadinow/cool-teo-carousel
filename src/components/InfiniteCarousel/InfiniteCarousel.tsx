import React, { useState, useCallback } from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { InfiniteCarouselProps, CarouselImage } from '../../types';
import styles from './InfiniteCarousel.module.scss';

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
    const [loadedImages, setLoadedImages] = useState<Set<string | number>>(new Set());
    const [errorImages, setErrorImages] = useState<Set<string | number>>(new Set());

    // Create triple copy of images for infinite loop
    const tripleImages = [...images, ...images, ...images];

    const { containerRef } = useInfiniteScroll({
        itemCount: images.length,
        onPositionChange: (position) => {
            // Optional: handle position changes
            console.log('Scroll position:', position);
        },
    });

    const handleImageLoad = useCallback((image: CarouselImage, originalIndex: number) => {
        setLoadedImages(prev => new Set(prev).add(image.id));
        onImageLoad?.(image, originalIndex);
    }, [onImageLoad]);

    const handleImageError = useCallback((image: CarouselImage, originalIndex: number) => {
        setErrorImages(prev => new Set(prev).add(image.id));
        onImageError?.(image, originalIndex);
    }, [onImageError]);

    const handleImageClick = useCallback((image: CarouselImage, displayIndex: number) => {
        // Calculate original index from the display index
        const originalIndex = displayIndex % images.length;
        onImageClick?.(image, originalIndex);
    }, [images.length, onImageClick]);

    if (!images || images.length === 0) {
        return (
            <div className={`${styles.carousel} ${className}`}>
                <div className={styles.container}>
                    <div className={styles.loading} style={{ width: itemWidth, height: itemHeight }}>
                        No images to display
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`${styles.carousel} ${className}`}
            ref={containerRef}
            style={{
                '--carousel-gap': `${gap}px`
            } as React.CSSProperties}
        >
            <div className={styles.container}>
                {tripleImages.map((image, index) => {
                    const isLoaded = loadedImages.has(image.id);
                    const hasError = errorImages.has(image.id);
                    const originalIndex = index % images.length;

                    return (
                        <div
                            key={`${image.id}-${Math.floor(index / images.length)}`}
                            className={styles.imageWrapper}
                            style={{
                                width: itemWidth,
                                height: itemHeight,
                                minWidth: itemWidth,
                            }}
                            onClick={() => handleImageClick(image, index)}
                        >
                            {hasError ? (
                                <div className={styles.error} style={{ width: itemWidth, height: itemHeight }}>
                                    Failed to load
                                </div>
                            ) : (
                                <>
                                    {!isLoaded && (
                                        <div className={styles.loading} style={{ width: itemWidth, height: itemHeight }}>
                                            Loading...
                                        </div>
                                    )}
                                    <img
                                        src={image.src}
                                        alt={image.alt || `Image ${originalIndex + 1}`}
                                        className={styles.image}
                                        loading={loading}
                                        onLoad={() => handleImageLoad(image, originalIndex)}
                                        onError={() => handleImageError(image, originalIndex)}
                                        style={{
                                            opacity: isLoaded ? 1 : 0,
                                            transition: 'opacity 0.3s ease',
                                        }}
                                        draggable={false}
                                    />
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InfiniteCarousel;
