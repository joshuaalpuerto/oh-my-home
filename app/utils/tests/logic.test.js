import { switchFn } from '../logic'

describe('Logic Tests', () => {
  it('Should function Switch', () => {
    const test = switchFn({
      1: true,
      2: false
    })(true)
    expect(test(1)).toEqual(true)
  })
})
