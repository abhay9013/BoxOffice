import { useQuery } from '@tanstack/react-query';

import { getShowByIds } from '../api/tvmaze';
import { useStarredShows } from '../lib/useStarredShows';

import ShowGrid from '../components/shows/ShowGrid';
import { TextCenter } from '../components/common/TextCenter';

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
    return <TextCenter>No show were starred</TextCenter>;
  }

  if (starredShowsError) {
    return <TextCenter>Error occured:{starredShowsError.message}</TextCenter>;
  }

  return <TextCenter>Loading Shows..</TextCenter>;
};
export default Starred;
