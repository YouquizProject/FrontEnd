import "../style/Header.scss";
import { Link } from "react-router-dom";

const Header = ({ page }) => {
  return (
    <>
      <div className="header-container">
        <div className="header">
          <div className="title">{page}</div>
          <Link to="/">
            <img className="header-logo" src="/YouQuiz-logo.png" alt="logo" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
