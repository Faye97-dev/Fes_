import React from "react";

import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={["fas", "arrow-right"]} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.children}
        <MenuItem onClick={handleClose}>
          <IconButton size="small" variant="outlined" color="primary">
            <FontAwesomeIcon icon={["fas", "edit"]} />
          </IconButton>
          <span className="px-2">Modifier</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton size="small" variant="outlined" color="primary">
            <FontAwesomeIcon icon={["fas", "history"]} />
          </IconButton>
          <span className="px-2">Historique</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
