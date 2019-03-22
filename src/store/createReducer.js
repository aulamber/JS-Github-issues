export const createReducer = (actionHandlers, initialState) => (
  state = initialState,
  action
) => {
  const actionHandler = actionHandlers[action.type];

  return actionHandler ? actionHandler(state, action) : state;
};
