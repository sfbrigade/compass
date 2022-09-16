import "./index.scss";
import { AiOutlineHome } from "react-icons/ai";

import { BsSquare } from "react-icons/bs";

const NavBar = () => {
  return (
    <div className="navbar">
      <a href="/" className="active">
        <div>
          <AiOutlineHome size={55} />
        </div>
        <div>Home</div>
      </a>
      <a href="/?">
        <div>
          <BsSquare size={55} />
        </div>
        <div>Icon 2</div>
      </a>
      <a href="/?">
        <div>
          <BsSquare size={55} />
        </div>
        <div>Icon 3</div>
      </a>
      <a href="/?">
        <div>
          <BsSquare size={55} />
        </div>
        <div>Icon 4</div>
      </a>
    </div>
  );
};

export default NavBar;
