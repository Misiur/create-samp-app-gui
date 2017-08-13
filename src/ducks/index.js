export const SET_PAGE = 'SET_PAGE';

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: {
      page,
    },
  };
};
