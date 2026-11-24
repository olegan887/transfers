import type { RouteFaqItem } from '../routes';

export interface RouteEnrichmentLocalized {
  overviewHeading: string;
  overviewParagraphs: string[];
  dropOffHeading: string;
  dropOffAreas: string[];
  tipsHeading: string;
  tips: string[];
  extraFaqs: RouteFaqItem[];
}

export type RouteDetailsMap = Record<string, RouteEnrichmentLocalized>;
