import type { Meta, StoryObj } from '@storybook/react';
import { generateImage, generateImages } from '../../../utils/imageGenerator';
import InfiniteCarousel from '../InfiniteCarousel';

const meta: Meta<typeof InfiniteCarousel> = {
    title: 'InfiniteCarousel',
    component: InfiniteCarousel,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        slidesPerView: {
            control: { type: 'number', min: 1, max: 10 },
            description: 'Number of images to show at once',
        },
        gap: {
            control: { type: 'number', min: 0, max: 50 },
            description: 'Gap between images in pixels',
        },
        autoplayInterval: {
            control: { type: 'number', min: 1000, max: 10000, step: 500 },
            description: 'Autoplay interval in milliseconds',
        },
    },
};

export default meta;
type Story = StoryObj<typeof InfiniteCarousel>;

// Single image per slide
export const SingleImage: Story = {
    args: {
        images: generateImages({ count: 5 }),
        slidesPerView: 1,
        gap: 32
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows one image at a time with smooth transitions.',
            },
        },
    },
};

// Multiple images per slide
export const MultipleImages: Story = {
    args: {
        images: generateImages({ count: 10 }),
        slidesPerView: 2,
        gap: 16
    }
};

// Many images with lazy loading
export const ManyImagesLazyLoading: Story = {
    args: {
        images: generateImages({ count: 50 }),
        slidesPerView: 3,
        gap: 20,
        loading: 'lazy'
    },
    parameters: {
        docs: {
            description: {
                story: 'Large collection of images with lazy loading for performance.',
            },
        },
    },
};

// Loop enabled
export const WithLoop: Story = {
    args: {
        images: generateImages({ count: 10 }),
        slidesPerView: 2,
        gap: 16,
        loop: true
    }
};

// Autoplay enabled
export const WithAutoplayLoop: Story = {
    args: {
        images: generateImages({ count: 5 }),
        slidesPerView: 2,
        gap: 12,
        loop: true,
        autoplay: true,
        autoplayInterval: 3000,
    }
};

// Autoplay without loop
export const AutoplayWithoutLoop: Story = {
    args: {
        images: generateImages({ count: 5 }),
        slidesPerView: 2,
        gap: 16,
        autoplay: true,
        autoplayInterval: 2000,
        loop: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Autoplay that automatically pauses when reaching the end.',
            },
        },
    },
};

// Images with different dimensions
export const DifferentImageSizes: Story = {
    args: {
        images: [
            generateImage({ id: 1, width: 800, height: 400, alt: 'Tall' }),
            generateImage({ id: 2, width: 400, height: 300, alt: 'Standard' }),
            generateImage({ id: 3, width: 300, height: 400, alt: 'Portrait' }),
            generateImage({ id: 4, width: 600, height: 200, alt: 'Banner' }),
            generateImage({ id: 5, width: 500, height: 500, alt: 'Square' }),
            generateImage({ id: 6, width: 1200, height: 300, alt: 'Wide' }),
        ],
        slidesPerView: 2,
        gap: 20,
        loop: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Carousel with images of different dimensions.',
            },
        },
    },
};
