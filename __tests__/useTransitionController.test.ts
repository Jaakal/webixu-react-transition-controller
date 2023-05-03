import { renderHook } from '@testing-library/react';
import { useTransitionController } from '../src/useTransitionController';

describe('useTransitionController', () => {
  test('returns a transition controller', () => {
    const refs = {
      element: { current: document.createElement('div') },
    };
    const setupTransitionInTimeline = jest.fn();
    const setupTransitionOutTimeline = jest.fn();

    const { result } = renderHook(() =>
      useTransitionController({
        ref: refs.element,
        refs,
        setupTransitionInTimeline,
        setupTransitionOutTimeline,
      })
    );

    expect(result.current.transitionIn).toBeDefined();
    expect(result.current.transitionOut).toBeDefined();
  });
});
