import { ucFirst } from '../strings'

describe('Strings Tests', () => {
  it('should capital first letter', () => {
    const str = 'test'
    expect(ucFirst(str)).toEqual('Test')
  })
})
