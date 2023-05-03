import { useCallback } from 'react';
import { TransitionDirection, TransitionController, TransitionControllerStore } from './TransitionController.types';

const __transitionControllerStore = new Map<Element, TransitionController>();

export const useTransitionControllerStore = (): TransitionControllerStore => {
  const setElementTransitionController = useCallback((element: Element, transitionController: TransitionController) => {
    __transitionControllerStore.set(element, transitionController);
  }, []);

  const getElementTimeline = useCallback(
    (element: Element, transitionDirection = TransitionDirection.In): gsap.core.Timeline | undefined => {
      if (transitionDirection === TransitionDirection.In) {
        return __transitionControllerStore.get(element)?.transitionIn?.();
      }

      return __transitionControllerStore.get(element)?.transitionOut?.();
    },
    []
  );

  const deleteElementTransitionController = useCallback((element: Element) => {
    __transitionControllerStore.delete(element);
  }, []);

  return { setElementTransitionController, getElementTimeline, deleteElementTransitionController };
};
