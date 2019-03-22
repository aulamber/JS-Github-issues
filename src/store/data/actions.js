/* Loading */

export const RESET_LOADING = 'RESET_LOADING';
export const resetLoading = () => ({ type: RESET_LOADING });

export const SET_LOADING = 'SET_LOADING';
export const setLoading = loading => ({
  type: SET_LOADING,
  loading,
});

/* Error */

export const RESET_ERROR = 'RESET_ERROR';
export const resetError = () => ({ type: RESET_ERROR });

export const SET_ERROR = 'SET_ERROR';
export const setError = error => ({ type: SET_ERROR, error });

/* Repositories */

export const RESET_REPOSITORIES = 'RESET_REPOSITORIES';
export const resetRepositories = () => ({ type: RESET_REPOSITORIES });

export const SET_REPOSITORIES = 'SET_REPOSITORIES';
export const setRepositories = repositories => ({
  type: SET_REPOSITORIES,
  repositories,
});

/* Issues */

export const RESET_NEW_ISSUE_URL = 'RESET_NEW_ISSUE_URL';
export const resetNewIssueUrl = () => ({ type: RESET_NEW_ISSUE_URL });

export const SET_NEW_ISSUE_URL = 'SET_NEW_ISSUE_URL';
export const setNewIssueUrl = newIssueUrl => ({
  type: SET_NEW_ISSUE_URL,
  newIssueUrl,
});
