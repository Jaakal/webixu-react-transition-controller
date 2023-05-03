import { RefObject } from 'react';
import gsap from 'gsap';

export enum TransitionDirection {
  In = 'in',
  Out = 'out',
}

export type RefObjects<T> = {
  [Property in keyof T]: RefObject<T[Property]>;
};

export type GetElementTimeline = (
  element: Element,
  transitionDirection?: TransitionDirection
) => gsap.core.Timeline | undefined;

export type TransitionControllerHelpers = {
  getElementTimeline: GetElementTimeline;
};

export type SetupTransitionTimeline<T> = (
  refs: T,
  timeline: gsap.core.Timeline,
  transitionControllerHelpers: TransitionControllerHelpers
) => void;

export type TransitionControllerParameters<T> = {
  ref: RefObject<Element>;
  refs: RefObjects<T>;
  setupTransitionInTimeline: SetupTransitionTimeline<T>;
  setupTransitionOutTimeline?: SetupTransitionTimeline<T>;
  exposeTransitionController?: boolean;
};

export type TransitionFunction = () => gsap.core.Timeline;

export type TransitionController = {
  transitionIn: TransitionFunction;
  transitionOut: TransitionFunction;
};

export type SetElementTransitionController = (element: Element, transitionController: TransitionController) => void;

export type DeleteElementTransitionController = (element: Element) => void;

export type TransitionControllerStore = {
  setElementTransitionController: SetElementTransitionController;
  getElementTimeline: GetElementTimeline;
  deleteElementTransitionController: DeleteElementTransitionController;
};
