import "./index.scss";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

const NavBar = () => {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon sx={{ fontSize: 55, color: "black" }} />}
      />
      <BottomNavigationAction
        label="Icon 2"
        icon={
          <CheckBoxOutlineBlankOutlinedIcon
            sx={{ fontSize: 55, color: "black" }}
          />
        }
      />
      <BottomNavigationAction
        label="Icon 3"
        icon={
          <CheckBoxOutlineBlankOutlinedIcon
            sx={{ fontSize: 55, color: "black" }}
          />
        }
      />
      <BottomNavigationAction
        label="Icon 4"
        icon={
          <CheckBoxOutlineBlankOutlinedIcon
            sx={{ fontSize: 55, color: "black" }}
          />
        }
      />
    </BottomNavigation>
  );
};

export default NavBar;
