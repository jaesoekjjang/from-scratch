const deepFreeze = (obj) => {
  if(!Object.isFrozen(obj)){
    Object.freeze(obj)
  }

  Object.keys(obj).forEach(key => {
    if(typeof obj[key] === 'object'){
        deepFreeze(obj[key])
      }
  })
}

export const createStore = (reducer) => {
  let state = reducer(undefined, {type: undefined});
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(()=>listener(getState()))

    const unSubscribe = () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1)
    }

    return { unSubscribe }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener());
  }

  const getState = () => {
    deepFreeze(state)
    return state
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

