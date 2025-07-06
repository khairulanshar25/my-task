import React from 'react';

const Mock = function () {
  return <section>mock</section>;
};
// Mock SystemJS
function mockImport(name) {
  return Promise.resolve({
    getRoot: Mock,
    default: Mock,
    [name]: Mock,
  });
}

//@ts-ignore
global.System = {
  /* @ts-ignore */
  import: jest.fn(mockImport),
};
console.error = (...args) => {};
console.log = (...args) => {};
console.info = (...args) => {};
//@ts-ignore
jest.setTimeout(60000);
