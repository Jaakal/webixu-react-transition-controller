import { renderHook, act } from '@testing-library/react';
import { useTransitionControllerStore } from '../src/useTransitionControllerStore';
import { TransitionDirection } from '../src/TransitionController.types';

describe('useTransitionControllerStore', () => {
  it('should set and get the element transition controller', () => {
    const { result } = renderHook(() => useTransitionControllerStore());

    const element = document.createElement('div');
    const transitionController = {} as any;

    act(() => {
      result.current.setElementTransitionController(element, transitionController);
    });

    expect(result.current.getElementTimeline(element)).toBeUndefined(); // should return undefined since there's no timeline set yet

    const timelineIn = {} as any;
    const timelineOut = {} as any;
    transitionController.transitionIn = jest.fn(() => timelineIn);
    transitionController.transitionOut = jest.fn(() => timelineOut);

    const elementTimelineIn = result.current.getElementTimeline(element, TransitionDirection.In);
    expect(elementTimelineIn).toBe(timelineIn);
    expect(transitionController.transitionIn).toHaveBeenCalled();

    const elementTimelineOut = result.current.getElementTimeline(element, TransitionDirection.Out);
    expect(elementTimelineOut).toBe(timelineOut);
    expect(transitionController.transitionOut).toHaveBeenCalled();

    act(() => {
      result.current.deleteElementTransitionController(element);
    });

    expect(result.current.getElementTimeline(element)).toBeUndefined(); // should return undefined again after deleting the transition controller
  });
});
