import { CarouselImage } from '../types';

export interface PicsumImageOptions {
    width?: number;
    height?: number;
    blur?: number;
    grayscale?: boolean;
    random?: boolean;
}

export const generatePicsumImages = (
    count: number,
    options: PicsumImageOptions = {}
): CarouselImage[] => {
    const {
        width = 400,
        height = 300,
        blur,
        grayscale = false,
        random = true
    } = options;

    return Array.from({ length: count }, (_, index) => {
        const id = random ? Math.floor(Math.random() * 1000) + index : index + 1;

        let url = `https://picsum.photos/${width}/${height}`;
        const params: string[] = [];

        if (random) {
            params.push(`random=${id}`);
        }

        if (blur) {
            params.push(`blur=${blur}`);
        }

        if (grayscale) {
            params.push('grayscale');
        }

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        return {
            id,
            src: url,
            alt: `Picsum image ${id}`,
            width,
            height,
        };
    });
};

export const generateVariedSizeImages = (count: number): CarouselImage[] => {
    const sizes = [
        { width: 300, height: 200 },
        { width: 400, height: 300 },
        { width: 350, height: 250 },
        { width: 450, height: 300 },
        { width: 320, height: 240 },
    ];

    return Array.from({ length: count }, (_, index) => {
        const size = sizes[index % sizes.length];
        const id = Math.floor(Math.random() * 1000) + index;

        return {
            id,
            src: `https://picsum.photos/${size.width}/${size.height}?random=${id}`,
            alt: `Varied size image ${id}`,
            width: size.width,
            height: size.height,
        };
    });
};
