import { useState } from 'react';
import { searchShows } from './../api/tvmaze';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setapiDataError] = useState(null);

  const onSearchIpChange = ev => {
    setSearchStr(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();
    try {
      setapiDataError(null);
      const result = await searchShows(searchStr);
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
      return apiData.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      ));
    }
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchIpChange} />{' '}
        {/*value here specify two way data binding*/}
        <button type="submit">Search</button>
      </form>
      <div>{renderApidata()}</div>
    </div>
  );
};

export default Home;
