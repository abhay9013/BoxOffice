import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getShowById } from '../api/tvmaze';

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
  });

  if (showError) {
    return <div>We Have an error : {showError.message}</div>;
  }

  if (showData) {
    return <div>Got Show Data: {showData.name}</div>;
  }

  return <div> Show page for {showId}</div>;
};

export default Show;
