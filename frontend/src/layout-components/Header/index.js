import React, { Fragment } from "react";

import clsx from "clsx";
import { Link } from "react-router-dom";

import {
  Hidden,
  IconButton,
  AppBar,
  Box,
  Button,
  Tooltip,
} from "@material-ui/core";

import { connect } from "react-redux";

import { setSidebarToggleMobile } from "../../reducers/ThemeOptions";
import projectLogo from "../../assets/images/react.svg";

import HeaderLogo from "../../layout-components/HeaderLogo";
import HeaderUserbox from "../../layout-components/HeaderUserbox";
import SidebarMenuListItem from "../../layout-components/SidebarMenu/SidebarMenuListItem";

import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Switch from "../../app-components/Switch";
const Header = (props) => {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile,
  } = props;

  return (
    <Fragment>
      <AppBar
        color="primary"
        className={clsx("app-header", {})}
        position={headerFixed ? "fixed" : "absolute"}
        elevation={headerShadow ? 11 : 3}
      >
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Hidden lgUp>
            <Box
              className="app-logo-wrapper"
              title="Carolina React Admin Dashboard with Material-UI Free"
            >
              <Link to="/DashboardDefault" className="app-logo-link">
                <IconButton
                  color="primary"
                  size="medium"
                  className="app-logo-btn"
                >
                  <img
                    className="app-logo-img"
                    alt="Carolina React Admin Dashboard with Material-UI Free"
                    src={projectLogo}
                  />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">App demo</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Hidden mdDown>
            <Box className="d-flex align-items-center">
              {/* <Button
                href="#"
                size="large"
                variant="contained"
                color="primary"
                className="mr-3"
              >
                Tableau de bord
              </Button>

              <SidebarMenuListItem
                depth="0"
                href="/Dashboard"
                icon=""
                key="jjj"
                label="Agences"
                title="test"
                color="white"
             />*/}
            </Box>
          </Hidden>
          <Box className="d-flex align-items-center">
            <Switch />
            <HeaderUserbox />
            <Box className="toggle-sidebar-btn-mobile">
              <Tooltip title="Toggle Sidebar" placement="right">
                <IconButton
                  color="inherit"
                  onClick={toggleSidebarMobile}
                  size="medium"
                >
                  {sidebarToggleMobile ? (
                    <MenuOpenRoundedIcon />
                  ) : (
                    <MenuRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
