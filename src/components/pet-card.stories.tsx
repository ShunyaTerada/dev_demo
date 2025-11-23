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

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('HPが表示されているか確認', async () => {
      const hp = canvas.getByText('HP');
      expect(hp).toBeVisible();
    })
    await step('ペットのタイプが表示されているか確認', async () => {
      const type = canvas.getByText('犬');
      expect(type).toBeVisible();
    })
    await step('ペットの名前が表示されているか確認', async () => {
      const name = canvas.getByText('ポチ');
      expect(name).toBeVisible();
    })
    await step('HPバーが表示されているか確認', async () => {
      const hpBar = canvas.getByRole('progressbar');
      expect(hpBar).toBeVisible();
    })
    await step('HPバーの色が赤になっているか確認', async () => {
      const hpBar = canvas.getByRole('progressbar');
      expect(hpBar).toHaveClass('[&>[data-slot=progress-indicator]]:bg-red-500');
    })
  }
};