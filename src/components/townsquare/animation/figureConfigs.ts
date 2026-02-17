import type { StickFigureConfig } from '../../../types';

/**
 * Predefined stick figure configurations.
 *
 * Each figure is assigned to a walk path with varied speeds and start
 * offsets so they spread naturally across the townsquare.
 */
export const STICK_FIGURES: StickFigureConfig[] = [
  {
    id: 'figure-1',
    pathId: 'main-street',
    speed: 1.0,
    startOffset: 0.0,
    behavior: 'walking',
  },
  {
    id: 'figure-2',
    pathId: 'park-loop',
    speed: 0.8,
    startOffset: 0.25,
    behavior: 'walking',
  },
  {
    id: 'figure-3',
    pathId: 'north-avenue',
    speed: 1.2,
    startOffset: 0.1,
    behavior: 'walking',
  },
  {
    id: 'figure-4',
    pathId: 'side-street',
    speed: 0.9,
    startOffset: 0.5,
    behavior: 'walking',
  },
  {
    id: 'figure-5',
    pathId: 'park-loop',
    speed: 1.1,
    startOffset: 0.6,
    behavior: 'walking',
  },
  {
    id: 'figure-6',
    pathId: 'main-street',
    speed: 0.7,
    startOffset: 0.7,
    behavior: 'walking',
  },
  {
    id: 'figure-7',
    pathId: 'north-avenue',
    speed: 1.3,
    startOffset: 0.4,
    behavior: 'walking',
  },
  {
    id: 'figure-8',
    pathId: 'side-street',
    speed: 0.85,
    startOffset: 0.15,
    behavior: 'walking',
  },
  {
    id: 'figure-9',
    pathId: 'park-loop',
    speed: 0.95,
    startOffset: 0.45,
    behavior: 'walking',
  },
  {
    id: 'figure-10',
    pathId: 'main-street',
    speed: 1.15,
    startOffset: 0.35,
    behavior: 'walking',
  },
  {
    id: 'figure-11',
    pathId: 'north-avenue',
    speed: 0.75,
    startOffset: 0.8,
    behavior: 'walking',
  },
  {
    id: 'figure-12',
    pathId: 'side-street',
    speed: 1.05,
    startOffset: 0.9,
    behavior: 'walking',
  },
  {
    id: 'figure-13',
    pathId: 'park-loop',
    speed: 0.9,
    startOffset: 0.12,
    behavior: 'walking',
  },
];
