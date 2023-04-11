import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";

export const MenuButton = ({scrollToTodoList, scrollToTodoForm }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        <img src="assets/images/NavbarIcon2.png" alt="Logo" height="40px" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={scrollToTodoForm}>
          <Typography
            variant="button"
            component="div"
            sx={{ flexGrow: 1 }}
            fontFamily="GalaxyFontB"
          >
            Add
          </Typography>
        </MenuItem>
        <MenuItem onClick={scrollToTodoList}>
          <Typography
            variant="button"
            component="div"
            sx={{ flexGrow: 1 }}
            fontFamily="GalaxyFontB"
          >
            Details
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
