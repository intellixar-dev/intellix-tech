import type { ProductType } from '@/data/products';

export const productCategories: Record<ProductType, { label: string; singular: string; heading: string; description: string; summary: string; href: string }> = {
  intellixar: {
    label: 'Intellixar Products',
    singular: 'Intellixar Product',
    heading: 'Built by us. Owned by us.',
    description: 'Products conceived, developed, and evolved within Intellixar.',
    summary: 'Products we build, own, and evolve at Intellixar.',
    href: '/projects/intellixar',
  },
  client: {
    label: 'Client Products',
    singular: 'Client Product',
    heading: 'Built for our clients.',
    description: 'Digital products designed and developed in partnership with businesses, founders, and organizations.',
    summary: 'Digital products we build in partnership with ambitious businesses, founders, and organizations.',
    href: '/projects/clients',
  },
};
