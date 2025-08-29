import cn from 'classnames';
import React from 'react';
import { InfiniteCarouselProps } from './contracts';
import { useInfiniteCarousel } from './hooks/useInfiniteCarousel';
import ImageSlide from './ImageSlide';
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
        currentIndex,
        swipeHandlers
    } = useInfiniteCarousel({
        images,
        slidesPerView,
        loop,
        autoplay,
        autoplayInterval
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

    const slideWidth = 100 / slidesPerView;
    const transformOffset = -(currentIndex * slideWidth);
    const gapOffset = currentIndex > 0 ? (gap / slidesPerView) * currentIndex : 0;


    return (
        <div className={mergedClassNames.container} style={{
            '--carousel-gap': `${gap}px`
        } as React.CSSProperties}>
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
                        transform: `translateX(calc(${transformOffset}% - ${gapOffset}px))`,
                        transition: isTransitioning ? 'none' : 'transform 0.3s ease'
                    }}
                    {...(Object.fromEntries(
                        Object.entries(swipeHandlers).filter(([key]) => key !== 'ref')
                    ))}
                >
                    {images.map((image, index) => (
                        <ImageSlide
                            key={image.id}
                            image={image}
                            index={index}
                            totalImages={images.length}
                            slidesPerView={slidesPerView}
                            gap={gap}
                            loading={loading}
                            classNames={{
                                item: mergedClassNames.item,
                                image: mergedClassNames.image
                            }}
                            onImageClick={onImageClick}
                            onImageLoad={onImageLoad}
                            onImageError={onImageError}
                        />
                    ))}
                </div>
        </div>
    );
}

export default InfiniteCarousel;
