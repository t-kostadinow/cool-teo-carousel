import cn from 'classnames';
import React from 'react';
import { InfiniteCarouselProps } from './contracts';
import { useInfiniteCarousel } from './hooks/useInfiniteCarousel';
import styles from './InfiniteCarousel.module.scss';

function InfiniteCarousel({
    images,
    classNames = {},
    slidesPerView = 1,
    gap = 16,
    loading = 'eager',
    loop = false,
    autoplay = false,
    autoplayInterval = 3000,
    onImageClick,
    onImageLoad,
    onImageError,
}: InfiniteCarouselProps) {
    const {
        isTransitioning,
        containerRef,
        transformOffset,
        swipeHandlers,
    } = useInfiniteCarousel({
        images,
        slidesPerView,
        loop,
        autoplay,
        autoplayInterval,
    });

    if (!images.length) {
        const mergedClassNames = {
            container: cn(
                styles['infinite-carousel'],
                classNames.container,
            ),
            loading: cn(
                styles['infinite-carousel__loading'],
                classNames.loading
            )
        };
        
        return (
            <div className={mergedClassNames.container}>
                <div className={styles['infinite-carousel__container']}>
                    <div className={mergedClassNames.loading}>
                        No images to display
                    </div>
                </div>
            </div>
        );
    }

    const mergedClassNames = {
        container: cn(
            styles['infinite-carousel'],
            classNames.container,
        ),
        viewport: cn(
            styles['infinite-carousel__viewport'],
            classNames.viewport
        ),
        carouselContainer: cn(
            styles['infinite-carousel__container'],
            {
                [styles['infinite-carousel__container--transitioning']]: isTransitioning
            },
            classNames.carouselContainer
        ),
        item: cn(
            styles['infinite-carousel__item'],
            classNames.item
        ),
        image: cn(
            styles['infinite-carousel__image'],
            classNames.image
        )
    };

    return (
        <div className={mergedClassNames.container} style={{
            '--carousel-gap': `${gap}px`,
            '--slides-per-view': slidesPerView.toString()
        } as React.CSSProperties}>
            <div className={mergedClassNames.viewport}>
                <div
                    className={mergedClassNames.carouselContainer}
                    ref={(el) => {
                        if (el) {
                            containerRef.current = el;
                            if (swipeHandlers.ref) {
                                swipeHandlers.ref(el);
                            }
                        }
                    }}
                    style={{
                        transform: `translateX(${transformOffset}%)`,
                        transition: isTransitioning ? 'none' : 'transform 0.3s ease'
                    }}
                    {...(Object.fromEntries(
                        Object.entries(swipeHandlers).filter(([key]) => key !== 'ref')
                    ))}
                >
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={mergedClassNames.item}
                            style={{
                                width: `calc((100% - (${slidesPerView - 1} * ${gap}px)) / ${slidesPerView})`,
                                marginRight: index < images.length - 1 ? `${gap}px` : '0'
                            }}
                            onClick={() => onImageClick?.(image, index)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt || `Image ${index + 1}`}
                                className={mergedClassNames.image}
                                style={{
                                    // If width and height are provided, calculate aspect ratio
                                    ...(image.width && image.height && {
                                        aspectRatio: `${image.width} / ${image.height}`,
                                        objectFit: 'contain'
                                    })
                                }}
                                loading={loading === 'eager' ? 'eager' : (index < slidesPerView ? 'eager' : 'lazy')}
                                onLoad={() => onImageLoad?.(image, index)}
                                onError={() => onImageError?.(image, index)}
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InfiniteCarousel;
