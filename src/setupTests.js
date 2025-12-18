import '@testing-library/jest-dom/vitest'

// happy-dom v20 no longer guarantees a fully functional localStorage implementation
// in all configurations. Our app reads localStorage during initial render, so ensure
// a minimal, spec-like mock exists for tests.
if (!globalThis.localStorage || typeof globalThis.localStorage.getItem !== 'function') {
  let store = {};

  globalThis.localStorage = {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
    key(i) {
      return Object.keys(store)[i] ?? null;
    },
    get length() {
      return Object.keys(store).length;
    },
  };
}
