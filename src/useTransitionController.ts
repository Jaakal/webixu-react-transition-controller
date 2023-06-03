import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { destructureRefObjects } from 'webixu-react-utils';
import { useTransitionControllerStore } from './useTransitionControllerStore';
import {
  TransitionControllerParameters,
  TransitionController,
} from './TransitionController.types';

export const useTransitionController = <T extends {}>(
  {
    ref,
    refs,
    setupTransitionInTimeline,
    setupTransitionOutTimeline,
    exposeTransitionController = false,
  }: TransitionControllerParameters<T>,
  dependencies?: React.DependencyList
): TransitionController => {
  const elements = useRef<T>();
  const transitionInTimeline = useRef<gsap.core.Timeline>(gsap.timeline());
  const transitionOutTimeline = useRef<gsap.core.Timeline>(gsap.timeline());
  const {
    setElementTransitionController,
    getElementTimeline,
    deleteElementTransitionController,
  } = useTransitionControllerStore();

  const transitionController = useRef<TransitionController>({
    transitionIn: () => {
      transitionOutTimeline.current.pause();
      transitionInTimeline.current.kill();
      transitionInTimeline.current = gsap.timeline();

      setupTransitionInTimeline(
        elements.current!,
        transitionInTimeline.current,
        {
          getElementTimeline,
        }
      );

      return transitionInTimeline.current;
    },
    transitionOut: () => {
      transitionInTimeline.current.pause();

      if (setupTransitionOutTimeline) {
        transitionOutTimeline.current.kill();
        transitionOutTimeline.current = gsap.timeline();

        setupTransitionOutTimeline(
          elements.current!,
          transitionOutTimeline.current,
          {
            getElementTimeline,
          }
        );

        return transitionOutTimeline.current;
      }

      transitionInTimeline.current.reverse();

      return transitionInTimeline.current;
    },
  });

  useLayoutEffect(() => {
    elements.current = destructureRefObjects<T>(refs);

    if (exposeTransitionController) {
      setElementTransitionController(
        ref.current!,
        transitionController.current
      );
    } else {
      transitionController.current.transitionIn();
      transitionInTimeline.current.pause();
    }

    return () => {
      deleteElementTransitionController(ref.current!);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ...(dependencies ?? []),
    exposeTransitionController,
    ref,
    refs,
    setElementTransitionController,
    deleteElementTransitionController,
  ]);

  return transitionController.current;
};
