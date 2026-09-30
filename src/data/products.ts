export type ProductType = 'intellixar' | 'client';
export type ProductStatus = 'Live' | 'Beta' | 'In Development' | 'Experimental' | 'Coming Soon';

export interface Product {
  id: string;
  type: ProductType;
  title: string;
  category?: string;
  description: string;
  catalogueDescription?: string;
  mission?: string;
  image?: string;
  status?: ProductStatus;
  statusColor?: string;
  features?: string[];
  href?: string;
  isInternal?: boolean;
  ctaLabel?: string;
  featured?: boolean;
  accent?: string;
  clientName?: string;
  industry?: string;
  projectType?: string;
  technologies?: string[];
  year?: number;
  projectDescription?: string;
  outcomes?: string[];
  caseStudyUrl?: string;
  sourceCodeLink?: string;
}

// Catalogue shared by the homepage and /projects. Client metadata comes from
// the existing portfolio; leave unknown fields absent when adding a product.
export const products: Product[] = [
  {
    "id": "ai-radar",
    "category": "AI Tool",
    "status": "Beta",
    "statusColor": "#22d3ee",
    "title": "AI Radar",
    "mission": "Helping people identify AI-generated and manipulated content.",
    "description": "A digital trust tool that analyzes text, images, and screenshots for AI generation fingerprints and credibility signals.",
    "features": [
      "AI Content Detection",
      "Image Analysis",
      "Trust Scoring",
      "Risk Signal Surfacing"
    ],
    "href": "/ai-radar",
    "isInternal": true,
    "featured": true,
    "accent": "#22d3ee",
    "type": "intellixar",
    "image": "/assets/images/ai-radar.svg",
    "catalogueDescription": "A digital trust tool that helps users detect AI-generated and manipulated content using intelligent analysis and credibility signals. Know What's Real."
  },
  {
    "id": "kilimo-power",
    "category": "AgriTech",
    "status": "In Development",
    "statusColor": "#34d399",
    "title": "Kilimo Power",
    "mission": "Kenya's most trusted farm power brand — solar pumps, backup systems & farm machinery.",
    "description": "Power your farm, cut costs, harvest more. Solar pumps, backup systems & farm machinery delivered anywhere in Kenya.",
    "features": [
      "Solar Pump Systems",
      "Backup Power",
      "Farm Machinery",
      "WhatsApp Orders"
    ],
    "href": "https://kilimopower.co.ke",
    "isInternal": false,
    "featured": false,
    "accent": "#fbbf24",
    "type": "client",
    "image": "/assets/images/kilimopower.png",
    "industry": "Farm Power & Machinery",
    "projectType": "E-commerce Platform",
    "technologies": [
      "Next.js",
      "WhatsApp Business API",
      "PostgreSQL",
      "Cloudinary"
    ],
    "projectDescription": "Kenya's most trusted farm power brand. Solar pumps, backup systems & farm machinery delivered to your farm — anywhere in Kenya. Farmers talk to the team on WhatsApp and get the right solution today.",
    "outcomes": [
      "Established as Kenya's go-to farm power brand with a WhatsApp-first ordering system that reaches farmers across all 47 counties."
    ]
  }
];
