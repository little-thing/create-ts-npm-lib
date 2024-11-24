import { greet } from '../src'

describe('greet', () => {
  it('should return greeting message', () => {
    expect(greet('World')).toBe('Hello, World!')
  })
}) 