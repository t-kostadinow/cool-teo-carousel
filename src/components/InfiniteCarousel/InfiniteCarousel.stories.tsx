import type { Meta, StoryObj } from '@storybook/react';
import InfiniteCarousel from './InfiniteCarousel';
import { generatePicsumImages } from '../../utils/imageLoader';

const meta: Meta<typeof InfiniteCarousel> = {
    title: 'InfiniteCarousel',
    component: InfiniteCarousel,
};

export default meta;
type Story = StoryObj<typeof InfiniteCarousel>;

export const Default: Story = {
    args: {
        images: generatePicsumImages(15),
        itemWidth: 300,
        itemHeight: 200,
        gap: 16,
    },
};

export const ManyImages: Story = {
    args: {
        images: generatePicsumImages(50),
        itemWidth: 250,
        itemHeight: 180,
        gap: 12,
    },
};
