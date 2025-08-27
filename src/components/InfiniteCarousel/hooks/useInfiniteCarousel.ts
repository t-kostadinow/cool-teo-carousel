import { useCallback, useEffect, useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { CarouselImage } from '../contracts';

interface UseInfiniteCarouselProps {
    images: CarouselImage[];
    slidesPerView: number;
    loop: boolean;
    autoplay: boolean;
    autoplayInterval: number;
}

interface UseInfiniteCarouselReturn {
    isTransitioning: boolean;
    containerRef: React.RefObject<HTMLDivElement | null>;
    transformOffset: number;
    swipeHandlers: ReturnType<typeof useSwipeable>;
}

export function useInfiniteCarousel({
    images,
    slidesPerView,
    loop,
    autoplay,
    autoplayInterval,
}: UseInfiniteCarouselProps): UseInfiniteCarouselReturn {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const totalSlides = images.length;
    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    // Calculate the last visible index and first visible index
    const lastVisibleIndex = currentIndex + slidesPerView - 1;
    const firstVisibleIndex = currentIndex;

    // Calculate the transform offset for smooth sliding
    const slideWidth = 100 / slidesPerView;
    const transformOffset = -(currentIndex * slideWidth);

    const goToIndex = useCallback((index: number) => {
        if (!loop) {
            // No loop - just clamp to boundaries
            if (index < 0) {
                setCurrentIndex(0);
            } else if (index > maxIndex) {
                setCurrentIndex(maxIndex);
            } else {
                setCurrentIndex(index);
            }
            return;
        }

        // Loop logic - handle seamless transitions
        let newIndex = index;

        if (index < 0) {
            // Going backwards past the beginning - jump to the end
            newIndex = totalSlides - slidesPerView;
            setIsTransitioning(true);
            // Reset transition after animation
            setTimeout(() => setIsTransitioning(false), 50);
        } else if (index > maxIndex) {
            // Going forwards past the end - jump to the beginning
            newIndex = 0;
            setIsTransitioning(true);
            // Reset transition after animation
            setTimeout(() => setIsTransitioning(false), 50);
        }

        setCurrentIndex(newIndex);
    }, [loop, maxIndex, totalSlides, slidesPerView]);

    const goForward = useCallback(() => {
        // Check if we can go to the next index based on the last visible index
        if (!loop && lastVisibleIndex >= totalSlides - 1) {
            return;
        }
        goToIndex(currentIndex + 1);
    }, [loop, lastVisibleIndex, totalSlides, currentIndex, goToIndex]);

    const goBack = useCallback(() => {
        // Check if we can go to the previous index based on the first visible index
        if (!loop && firstVisibleIndex <= 0) {
            return;
        }
        goToIndex(currentIndex - 1);
    }, [loop, firstVisibleIndex, currentIndex, goToIndex]);

    // Autoplay effect
    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            goForward();
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [autoplay, autoplayInterval, goForward]);

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => goForward(),
        onSwipedRight: () => goBack(),
        onSwipeStart: (eventData) => {
            // Prevent swipe from starting when at boundaries in no-loop mode
            if (!loop) {
                if (eventData.dir === 'Left' && lastVisibleIndex >= totalSlides - 1) {
                    return false;
                }
                if (eventData.dir === 'Right' && firstVisibleIndex <= 0) {
                    return false;
                }
            }
        },
        trackMouse: true,
        preventScrollOnSwipe: true,
    });

    return {
        isTransitioning,
        containerRef,
        transformOffset,
        swipeHandlers,
    };
}
