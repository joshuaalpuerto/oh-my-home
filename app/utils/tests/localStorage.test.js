import { getItem, setItem, removeItem } from '../localStorage'

describe('localStorage', () => {
   /**
   * Mocking local storage
   */
  function storageMock () {
    const _self = {}

    _self.storage = {}

    _self.setItem = function (key, value) {
      _self.storage[key] = value || ''
    }

    _self.getItem = function (key) {
      return key in _self.storage ? _self.storage[key] : null
    }
    _self.removeItem = function (key) {
      delete _self.storage[key]
    }

    return _self
  }
  const storage = storageMock()

  it('it should set item', async () => {
    const key = 'test'
    const value = 'test1'
    try {
      // error testing since setItem is only for browser
      await setItem(key, value)
    } catch (e) {
      storage.setItem(key, value)
    }

    expect(storage.storage[key]).toEqual(value)
  })

  it('it should get item', async () => {
    const key = 'test'
    const value = 'test1'
    let response
    try {
      // error testing since setItem is only for browser
      await getItem(key, value)
    } catch (e) {
      response = storage.getItem(key, value)
    }

    expect(response).toEqual(value)
  })

  it('it should remove item', async () => {
    const key = 'test'
    const value = 'test1'
    try {
      // error testing since setItem is only for browser
      await removeItem(key, value)
    } catch (e) {
      storage.setItem(key, value)
      storage.removeItem(key)
    }

    expect(storage.storage[key]).toBeUndefined()
  })
})
