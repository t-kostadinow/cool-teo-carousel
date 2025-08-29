/**
 * Calculates the width of a carousel slide based on slides per view and gap
 * @returns Calculated width as a CSS calc() string
 */
export const calculateSlideWidth = (slidesPerView: number, gap: number): string => {
    const gapAdjustment = gap - (gap / slidesPerView);
    return `calc((100% / ${slidesPerView}) - ${gapAdjustment}px)`;
};

/**
 * Calculates the right margin for a carousel slide
 */
export const calculateSlideMargin = (index: number, totalImages: number, gap: number): string => {
    return index < totalImages - 1 ? `${gap}px` : '0';
};
