import { SearchCard, SearchImgWrapper } from '../common/SearchCard';

const ActorCard = ({ name, image, gender, country, birthday, deathday }) => {
  return (
    <SearchCard>
      <SearchImgWrapper>
        <img src={image} alt={name} />
      </SearchImgWrapper>
      <h1>
        {name} {Boolean(gender) && `(${gender})`}
      </h1>
      <p>{country ? `Comes from ${country}` : 'No Known'}</p>
      {Boolean(birthday) && <p>Born {birthday}</p>}
      <p>{deathday ? `Died ${deathday}` : 'Alive'}</p>
    </SearchCard>
  );
};
export default ActorCard;
