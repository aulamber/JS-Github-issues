export const dataSelector = state => state.data;

export const errorSelector = state => dataSelector(state).error;
export const loadingSelector = state => dataSelector(state).loading;
export const repositoriesSelector = state => dataSelector(state).repositories;
