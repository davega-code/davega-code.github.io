// Animation component exports
export { WALK_PATHS } from './walkPaths';
export { StickFigure } from './StickFigure';
export { StickFigureManager } from './StickFigureManager';
export { STICK_FIGURES } from './figureConfigs';
export {
  interpolatePath,
  advanceAlongPath,
  getPathSegmentLength,
  getTotalPathLength,
  isMovingLeft,
  findNearbyInteractionPoint,
} from './pathInterpolation';
export {
  startWalking,
  startSitting,
  startIdle,
  enterBuilding,
  exitBuilding,
  updateIdleAnimation,
} from './behaviors';
export type { FigureState } from './behaviors';
