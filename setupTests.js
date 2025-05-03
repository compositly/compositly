// setupTests.js
import '@testing-library/jest-dom'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}

global.localStorage = localStorageMock

const ResizeObserverMock = class ResizeObserver {
  constructor(callback) {
    this.callback = callback;
    this.observations = new Map();
  }

  observe(target, options) {
    this.observations.set(target, options);
    // Puedes implementar un mock más específico si es necesario
  }

  unobserve(target) {
    this.observations.delete(target);
  }

  disconnect() {
    this.observations.clear();
  }
};

global.ResizeObserver = ResizeObserverMock;