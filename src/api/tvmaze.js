const BASE_URL = 'https://api.tvmaze.com';

const apiget = async querystr => {
  const resp = await fetch(`${BASE_URL}${querystr}`);
  const body = await resp.json();
  return body;
};

export const searchShows = query => apiget(`/search/shows?q=${query}`);
export const searchForPeople = query => apiget(`/search/people?q=${query}`);
