import './Header.css';
import { BsBank2 } from 'react-icons/bs';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header-con">
          <div className="logo-container">
            <h1>
              <BsBank2 /> WELCOME TO SWEA BANK
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
