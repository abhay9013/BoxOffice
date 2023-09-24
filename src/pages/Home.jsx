import { useState } from 'react';
import { searchShows, searchForPeople } from './../api/tvmaze';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setapiDataError] = useState(null);
  const [searchOptn, setSearchOptn] = useState('shows');

  const onSearchIpChange = ev => {
    setSearchStr(ev.target.value);
  };
  const onradiochng = ev => {
    setSearchOptn(ev.target.value);
  };

  const onSearch = async ev => {
    ev.preventDefault();

    try {
      setapiDataError(null);

      if (searchOptn === 'shows') {
        const result = await searchShows(searchStr);
        setApiData(result);
      } else {
        const result = await searchForPeople(searchStr);
        setApiData(result);
      }
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
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchIpChange} />{' '}
        <label>
          Shows
          <input
            type="radio"
            name="search-option"
            value="shows"
            checked={searchOptn === 'shows'}
            onChange={onradiochng}
          ></input>
        </label>
        <label>
          Actors
          <input
            type="radio"
            name="search-option"
            value="actors"
            checked={searchOptn === 'actors'}
            onChange={onradiochng}
          ></input>
        </label>
        {/*value here specify two way data binding*/}
        <button type="submit">Search</button>
      </form>
      <div>{renderApidata()}</div>
    </div>
  );
};

export default Home;
