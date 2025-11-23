import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PetCard } from './pet-card';

const meta = {
  component: PetCard,
} satisfies Meta<typeof PetCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};