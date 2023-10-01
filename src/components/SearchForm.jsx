import { useState } from 'react';

import { useSearchStr } from '../lib/useSearchStr';
import CustomRadio from './shows/CustomRadio';

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
        <CustomRadio
          label="Shows"
          name="search-option"
          value="shows"
          checked={searchOptn === 'shows'}
          onChange={onradiochng}
        />
        <CustomRadio
          label="Actors"
          name="search-option"
          value="actors"
          checked={searchOptn === 'actors'}
          onChange={onradiochng}
        />
        {/*value here specify two way data binding*/}
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
