import { useQuery } from '@tanstack/react-query';

import { getShowByIds } from '../api/tvmaze';
import { useStarredShows } from '../lib/useStarredShows';

import ShowGrid from '../components/shows/ShowGrid';

const Starred = () => {
  const [starredShowsID] = useStarredShows();

  const { data: starredShows, error: starredShowsError } = useQuery({
    queryKey: ['show', starredShowsID], //ressemble like dep arr in useeffect , if something here changes than it refetched
    queryFn: () =>
      getShowByIds(starredShowsID).then(result =>
        result.map(show => ({ show }))
      ),
    refetchOnWindowFocus: false,
  });

  if (starredShows && starredShows.length > 0) {
    return <ShowGrid shows={starredShows} />;
  }

  if (starredShows && starredShows.length === 0) {
    return <div>No show were starred</div>;
  }

  if (starredShowsError) {
    return <div>Error occured:{starredShowsError.message}</div>;
  }

  return <div>Loading Shows..</div>;
};
export default Starred;
