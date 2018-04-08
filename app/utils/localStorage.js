import localForage from 'localforage'

/**
 * Please wrap this instance to a try/catch block
 */

export async function setItem (...args) {
  return await localForage.setItem(...args) // eslint-disable-line
}

export async function getItem (key) {
  return await localForage.getItem(key) // eslint-disable-line
}

export async function removeItem (key) {
  return await localForage.removeItem(key) // eslint-disable-line
}
