# Webixu React Transition Controller

[![npm version](https://badge.fury.io/js/webixu-react-transition-controller.svg)](https://www.npmjs.com/package/webixu-react-transition-controller)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Webixu React Transition Controller is a custom hook that provides a way to manage transitions for multiple elements in a React component with GSAP animation library. The hook allows for setting up custom transitions for elements, handling transition states, and exposing the transition controller to other components.

## Installation

You can install Webixu React Transition Controller using npm:

```bash
npm install webixu-react-transition-controller
```

## Usage

To use Webixu React Transition Controller, simply import the `useTransitionController` hook and other necessary types into your project:

```tsx
import {
  useTransitionController,
  TransitionDirection,
  SetupTransitionTimeline,
} from 'webixu-react-transition-controller';

// define setup transition functions for each transition direction
const setupTransitionInTimeline: SetupTransitionTimeline<Refs> = (refs, timeline, { getElementTimeline }) => {
  const { element, component } = refs;

  timeline.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1 });

  const componentTimeline = getElementTimeline(component);

  if (componentTimeline) {
    timeline.add(componentTimeline);
  }
};

const setupTransitionOutTimeline: SetupTransitionTimeline<Refs> = (refs, timeline, { getElementTimeline }) => {
  const { element, component } = refs;

  const componentTimeline = getElementTimeline(component, TransitionDirection.Out);

  if (componentTimeline) {
    timeline.add(componentTimeline);
  }

  timeline.to(element, { opacity: 0, duration: 0.2 }, 0.1);
};

// define necessary types, e.g. Refs and Props
type Refs = {
  element: HTMLDivElement;
  component: HTMLDivElement;
};

type Props = {};

// use the hook inside your component
const ExampleComponent: React.FunctionComponent<Props> = () => {
  const refs = useRefs<Refs>();

  const transitionController = useTransitionController<Refs>(
    {
      refs,
      setupTransitionInTimeline,
      setupTransitionOutTimeline,
      exposeTransitionController: true,
    },
    [refs.component.current]
  );

  useEffect(() => {
    transitionController.transitionIn();
  }, []);

  return (
    <div className={styles.element} ref={refs.element}>
      ...
      <Component ref={refs.component} />
      ...
    </div>
  );
};

export default ExampleComponent;
```

## Available Types

- `SetupTransitionTimeline<T extends Record<string, HTMLElement>>`: a type for a setup function that takes references, timeline and an object with utility functions and returns a transition timeline.
- `TransitionDirection`: an enum with two values - In and Out - that specify the direction of a transition.

## Available Hooks And Functions

- `useTransitionController<T extends Record<string, HTMLElement>>(config: TransitionControllerConfig<T>, deps?: DependencyList): TransitionController<T>`: a custom hook that returns a transition controller object for managing transitions for multiple elements in a React component.
- `getElementTimeline(element: HTMLElement, transitionDirection?: TransitionDirection): gsap.core.Timeline | undefined`: a utility function that returns a timeline for a specified element and transition direction.
- `useRefs<T extends Record<string, HTMLElement>>(): RefsObject<T>`: a custom hook that returns an object with refs to multiple elements.

## Available Interfaces

- `RefsObject<T extends Record<string, HTMLElement>>`: an interface that defines an object with refs to multiple elements.
- `TransitionControllerConfig<T extends Record<string, HTMLElement>>`: an interface that defines the configuration for the transition controller object.
- `TransitionController<T extends Record<string, HTMLElement>>`: an interface that defines the transition controller object.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.
