import { useState } from 'react';
import { searchShows, searchForPeople } from './../api/tvmaze';
import SearchForm from '../components/SearchForm';

const Home = () => {
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setapiDataError] = useState(null);

  const onSearch = async ({ q, searchOptn }) => {
    try {
      setapiDataError(null);

      let result;
      if (searchOptn === 'shows') {
        result = await searchShows(q);
      } else {
        result = await searchForPeople(q);
      }
      setApiData(result);
    } catch (error) {
      setapiDataError(error);
    }
  };

  const renderApidata = () => {
    if (apiDataError) {
      return <div>Error Occured : {apiDataError.message}</div>;
    }

    if (apiData) {
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name}</div>
          ));
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
