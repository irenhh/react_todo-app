export const hydrateStateWithLocalStorage = (state) => {
  Object.keys(state).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      let value = localStorage.getItem(key);

      try {
        value = JSON.parse(value);
        state = {
          ...state,
          [key]: value,
        };
      } catch (error) {
        state = {
          ...state,
          [key]: value,
        };
      }
    }
  });

  return state;
};

export const saveStateToLocalStorage = (state) => {
  Object.keys(state).forEach((key) => {
    localStorage.setItem(key, JSON.stringify(state[key]));
  });
};
