import type { DoneCallback } from 'vitest';
import { clsx, debounce, throttle } from './index';

describe('clsx', () => {
  it('should concatenate class names', () => {
    expect(clsx('foo', 'bar')).toBe('foo bar');
    expect(clsx(['foo', 'bar'])).toBe('foo bar');
    expect(clsx('foo', false && 'bar', 'baz')).toBe('foo baz');
    expect(clsx('', undefined, null)).toBe('');
  });
});

describe('debounce', () => {
  it('should debounce function calls', (done: DoneCallback) => {
    let count = 0;
    const fn = debounce(() => {
      count++;
      expect(count).toBe(1);
      done();
    }, 50);
    fn();
    fn();
    fn();
    expect(count).toBe(0);
  });
});

describe('throttle', () => {
  it('should throttle function calls', () => {
    let count = 0;
    const fn = throttle(() => count++, 50);
    fn();
    fn();
    fn();
    expect(count).toBe(1);
  });
});
