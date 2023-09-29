import { useState } from 'react';
import { useSearchStr } from '../lib/useSearchStr';

const SearchForm = ({ onSearch }) => {
  const [searchStr, setSearchStr] = useSearchStr();
  const [searchOptn, setSearchOptn] = useState('shows');

  const onSearchIpChange = ev => {
    setSearchStr(ev.target.value);
  };
  const onradiochng = ev => {
    setSearchOptn(ev.target.value);
  };

  const onSubmit = ev => {
    ev.preventDefault();

    const options = {
      q: searchStr,
      searchOptn,
    };

    onSearch(options);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
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
    </div>
  );
};

export default SearchForm;
