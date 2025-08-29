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
    currentIndex: number;
    swipeHandlers: ReturnType<typeof useSwipeable>;
}

export function useInfiniteCarousel({
    images,
    slidesPerView,
    loop,
    autoplay,
    autoplayInterval
}: UseInfiniteCarouselProps): UseInfiniteCarouselReturn {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const totalSlides = images.length;
    const maxIndex = Math.max(0, totalSlides - slidesPerView);

    const goToIndex = useCallback((index: number) => {
        if (!loop) {
            const clampedIndex = Math.max(0, Math.min(index, maxIndex));
            setCurrentIndex(clampedIndex);
            return;
        }

        let newIndex = index;

        if (index < 0) {
            // Going backwards past the beginning - jump to the end
            newIndex = maxIndex;
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 50);
        } else if (index > maxIndex) {
            // Going forwards past the end - jump to the beginning
            newIndex = 0;
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 50);
        }

        setCurrentIndex(newIndex);
    }, [loop, maxIndex]);

    const goForward = useCallback(() => {
        if (!loop && currentIndex >= maxIndex) {
            return;
        }
        goToIndex(currentIndex + 1);
    }, [loop, currentIndex, maxIndex, goToIndex]);

    const goBack = useCallback(() => {
        if (!loop && currentIndex <= 0) {
            return;
        }
        goToIndex(currentIndex - 1);
    }, [loop, currentIndex, goToIndex]);

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
                if (eventData.dir === 'Left' && currentIndex >= maxIndex) {
                    return false;
                }
                if (eventData.dir === 'Right' && currentIndex <= 0) {
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
        currentIndex,
        swipeHandlers,
    };
}
