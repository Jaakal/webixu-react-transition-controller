// // import '@testing-library/jest-dom';
// // import { setGlobal } from 'reactn';
// // import 'text-encoding';
// // import { JSDOM } from 'jsdom';

// // const { window } = new JSDOM('<!doctype html><html><body></body></html>');

// // setGlobal({
// //   document: window._document,
// //   window: window,
// // });

// // describe('setupTests', () => {
// //   test('should run successfully', () => {
// //     expect(true).toBe(true);
// //   });
// // });

// import { JSDOM } from 'jsdom';
// import 'jest-enzyme';
// import { configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
// const { window } = jsdom;

// function copyProps(src, target) {
//   const props = Object.getOwnPropertyNames(src)
//     .filter(prop => typeof target[prop] === 'undefined')
//     .reduce((result, prop) => ({
//       ...result,
//       [prop]: Object.getOwnPropertyDescriptor(src, prop),
//     }), {});
//   Object.defineProperties(target, props);
// }

// global.window = window;
// global.document = window.document;
// global.navigator = {
//   userAgent: 'node.js',
// };
// copyProps(window, global);

// configure({ adapter: new Adapter() });
