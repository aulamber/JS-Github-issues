export const dataSelector = state => state.data;

export const errorSelector = state => dataSelector(state).error;
export const loadingSelector = state => dataSelector(state).loading;
export const newIssueUrlSelector = state => dataSelector(state).newIssueUrl;
export const repositoriesSelector = state => dataSelector(state).repositories;
