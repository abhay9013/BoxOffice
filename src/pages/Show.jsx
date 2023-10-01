import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getShowById } from '../api/tvmaze';

import ShowMainData from '../components/shows/ShowMainData';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import Cast from '../components/shows/Cast';
import { TextCenter } from '../components/common/TextCenter';

// const useShowById = showId => {
//   const [showData, setShowData] = useState(null);
//   const [showError, setshowError] = useState(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getShowById(showId);
//         setShowData(data);
//       } catch (err) {
//         setshowError(err);
//       }
//     }
//     fetchData();
//   }, [showId]);

//   return { showData, showError };
// };

const Show = () => {
  const { showId } = useParams();
  //const { showData, showError } = useShowById(showId);

  const { data: showData, error: showError } = useQuery({
    queryKey: ['show', showId], //ressemble like dep arr in useeffect , if something here changes than it refetched
    queryFn: () => getShowById(showId),
    refetchOnWindowFocus: false,
  });

  if (showError) {
    return <TextCenter>We Have an error : {showError.message}</TextCenter>;
  }

  if (showData) {
    return (
      <ShowPageWrapper>
        <BackHomeWrapper>
          <Link to="/">Go Back to Home</Link>
        </BackHomeWrapper>

        <ShowMainData
          image={showData.image}
          name={showData.name}
          rating={showData.rating}
          summary={showData.summary}
          genres={showData.genres}
        />

        <InfoBlock>
          <h2>DETAILS</h2>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </InfoBlock>

        <InfoBlock>
          <h2>Seasons</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </InfoBlock>
        <InfoBlock>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </InfoBlock>
      </ShowPageWrapper>
    );
  }

  return <div> Show page for {showId}</div>;
};

export default Show;

const BackHomeWrapper = styled.div`
  margin-bottom: 30px;
  text-align: left;
  a {
    padding: 10px;
    color: ${({ theme }) => theme.mainColors.dark};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ShowPageWrapper = styled.div`
  margin: auto;
  @media only screen and (min-width: 768px) {
    max-width: 700px;
  }
  @media only screen and (min-width: 992px) {
    max-width: 900px;
  }
`;

const InfoBlock = styled.div`
  margin-bottom: 40px;
  h2 {
    margin: 0;
    margin-bottom: 30px;
    font-size: 22px;
  }
`;
