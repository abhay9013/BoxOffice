const ActorCard = ({ name, image, gender, country, birthday, deathday }) => {
  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      <h1>
        {name} {Boolean(gender) && `(${gender})`}
      </h1>
      <p>{country ? `Comes from ${country}` : 'No Known'}</p>
      {Boolean(birthday) && <p>Born {birthday}</p>}
      <p>{deathday ? `Died ${deathday}` : 'Alive'}</p>
    </div>
  );
};
export default ActorCard;
