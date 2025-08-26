import { useEffect, useRef, useCallback, useState } from 'react';
import { ScrollPosition, UseInfiniteScrollReturn } from '../types';

interface UseInfiniteScrollProps {
    itemCount: number;
    onPositionChange?: (position: ScrollPosition) => void;
}

export const useInfiniteScroll = ({
    itemCount,
    onPositionChange,
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isResettingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        scrollLeft: 0,
        scrollWidth: 0,
        clientWidth: 0,
    });
    const [isScrolling, setIsScrolling] = useState(false);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        if (!container || isResettingRef.current || itemCount === 0) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;

        const newPosition: ScrollPosition = { scrollLeft, scrollWidth, clientWidth };
        setScrollPosition(newPosition);

        if (onPositionChange) {
            onPositionChange(newPosition);
        }

        // Set scrolling state
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 150);

        // Calculate boundaries for infinite loop (triple the content)
        const singleSetWidth = scrollWidth / 3;

        // If scrolled past the end of second set, reset to beginning of second set
        if (scrollLeft >= singleSetWidth * 2) {
            isResettingRef.current = true;
            container.scrollLeft = singleSetWidth;
            requestAnimationFrame(() => {
                isResettingRef.current = false;
            });
        }

        // If scrolled before the beginning of second set, reset to end of second set
        if (scrollLeft <= 0) {
            isResettingRef.current = true;
            container.scrollLeft = singleSetWidth;
            requestAnimationFrame(() => {
                isResettingRef.current = false;
            });
        }
    }, [itemCount, onPositionChange]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initialize scroll position to the middle set
        const observer = new ResizeObserver(() => {
            if (container.scrollWidth > 0) {
                const singleSetWidth = container.scrollWidth / 3;
                container.scrollLeft = singleSetWidth;
                observer.disconnect();
            }
        });
        observer.observe(container);

        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
            observer.disconnect();
        };
    }, [handleScroll]);

    return {
        containerRef,
        scrollPosition,
        isScrolling
    };
};
