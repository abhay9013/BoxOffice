import { useState } from 'react';

import { searchShows, searchForPeople } from './../api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
import { useQuery } from '@tanstack/react-query';
import { TextCenter } from '../components/common/TextCenter';

const Home = () => {
  // const [apiData, setApiData] = useState(null);
  // const [apiDataError, setapiDataError] = useState(null);

  // const onSearch = async ({ q, searchOptn }) => {
  //   try {
  //     setapiDataError(null);

  //     let result;
  //     if (searchOptn === 'shows') {
  //       result = await searchShows(q);
  //     } else {
  //       result = await searchForPeople(q);
  //     }
  //     setApiData(result);
  //   } catch (error) {
  //     setapiDataError(error);
  //   }
  // };

  const [filter, setFilter] = useState(null);

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOptn === 'shows'
        ? searchShows(filter.q)
        : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const onSearch = async ({ q, searchOptn }) => {
    setFilter({ q, searchOptn });
  };

  const renderApidata = () => {
    if (apiDataError) {
      return <TextCenter>Error Occured : {apiDataError.message}</TextCenter>;
    }

    if (apiData?.length === 0) {
      return <TextCenter>No Result</TextCenter>;
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      <div>{renderApidata()}</div>
    </div>
  );
};

export default Home;
