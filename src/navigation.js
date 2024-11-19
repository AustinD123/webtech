import { Home, User, FileText, Info } from 'react-feather';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className="icon-container">
      {/* Link to navigate to the Home page */}
      <Link to="/login" className="icon">
        <Home size={20} />
      </Link>

      {/* Link to navigate to the User Profile */}
      <Link to="/profile" className="icon">
        <User size={20} />
      </Link>

      {/* Link to navigate to the About page */}
      <Link to="/about" className="icon">
        <Info size={20} />
      </Link>

      {/* Link to navigate to Feedback */}
      <Link to="/feedback" className="icon">
        <FileText size={20} />
      </Link>
    </div>
  );
}

export default Navigation;
