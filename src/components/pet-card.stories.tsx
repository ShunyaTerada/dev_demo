import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PetCard } from './pet-card';
import { within, expect } from '@storybook/test';

const meta = {
  component: PetCard,
} satisfies Meta<typeof PetCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pet: {
      id: 'mock-id',
      name: 'ポチ',
      type: 'dog',
      hp: 80,
      ownerID: 'mock-owner-id',
    },
  },
};

export const LessHp: Story = {
  args: {
    pet: {
      "id": "mock-id",
      "name": "ポチ",
      "type": "dog",
      "ownerID": "mock-owner-id",
      "hp": 5
    }
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hp = canvas.getByText('HP');
    expect(hp).toBeVisible();
  }
};