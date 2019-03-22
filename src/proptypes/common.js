import PropTypes from 'prop-types';

export const childrenType = PropTypes.node;

export const historyType = PropTypes.shape({
  push: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired,
});

export const locationType = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string,
});

export const matchType = PropTypes.shape({
  params: PropTypes.shape({
    matchId: PropTypes.string,
    matchStatus: PropTypes.string,
    offerId: PropTypes.string,
    offerStatus: PropTypes.string,
  }).isRequired,
});
