import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      HOME PAGE
      <Link to="/starred">Go to starred page</Link>
    </div>
  );
};

export default Home;
