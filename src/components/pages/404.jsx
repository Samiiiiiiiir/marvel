import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>404</h2>
      <p>This is not the web page you are looking for.</p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          backgroundColor: '#9F0013',
          color: '#fff',
          padding: '8px',
          margin: '10px',
          borderRadius: '4px',
        }}
      >
        Return to main page
      </Link>
    </div>
  );
};

export default NotFound;
