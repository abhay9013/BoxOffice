import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { getShowById } from '../api/tvmaze';

import ShowMainData from '../components/shows/ShowMainData';
import Details from '../components/shows/Details';
import Seasons from '../components/shows/Seasons';
import Cast from '../components/shows/Cast';

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
    return <div>We Have an error : {showError.message}</div>;
  }

  if (showData) {
    return (
      <div>
        <Link to="/">Go Back to Home</Link>

        <div>
          <ShowMainData
            image={showData.image}
            name={showData.name}
            rating={showData.rating}
            summary={showData.summary}
            genres={showData.genres}
          />
        </div>

        <div>
          <h1>DETAILS</h1>
          <Details
            status={showData.status}
            premiered={showData.premiered}
            network={showData.network}
          />
        </div>

        <div>
          <h2>Seasons</h2>
          <Seasons seasons={showData._embedded.seasons} />
        </div>
        <div>
          <h2>Cast</h2>
          <Cast cast={showData._embedded.cast} />
        </div>
      </div>
    );
  }

  return <div> Show page for {showId}</div>;
};

export default Show;
