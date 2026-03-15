import type { BuildingConfig } from '../../../types';

/**
 * Configuration data for all 4 interactive buildings in the townsquare.
 *
 * Values sourced from:
 * - `specs/001-townsquare-revamp/contracts/routes.md` (colors, routes)
 * - Grid positions adjusted for visual spacing around the central townsquare
 */
export const BUILDINGS: BuildingConfig[] = [
  {
    id: 'town-center',
    name: 'Town Center',
    route: '/about',
    position: { gridX: 0, gridY: 0 },
    accentColor: '#D4A574',
    accentColorHover: '#D99A5B',
    ariaLabel: 'Town Center – Navigate to About',
    zIndex: 10,
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    route: '/blog',
    position: { gridX: -5, gridY: -2 },
    accentColor: '#C4956A',
    accentColorHover: '#CF8A55',
    ariaLabel: 'Newspaper – Navigate to Blog',
    zIndex: 20,
  },
  {
    id: 'art-gallery',
    name: 'Art Gallery',
    route: '/photography',
    position: { gridX: 5, gridY: -2 },
    accentColor: '#6BA3A0',
    accentColorHover: '#579E9A',
    ariaLabel: 'Art Gallery – Navigate to Photography',
    zIndex: 20,
  },
  {
    id: 'post-office',
    name: 'Post Office',
    route: '/contact',
    position: { gridX: 0, gridY: -6 },
    accentColor: '#B07070',
    accentColorHover: '#B85C5C',
    ariaLabel: 'Post Office – Navigate to Contact',
    zIndex: 30,
  },
];
