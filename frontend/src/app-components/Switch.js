import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { updateStatusAgence } from "../actions/auth";
import { connect } from "react-redux";
const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export class CustomizedSwitches extends Component {
  state = {
    checked: false,
  };

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
    this.props.updateStatusAgence(event.target.checked);
  };

  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.user.agence.online !== this.state.checked) {
      console.log(" sync checked to props agence  ...");
      this.setState({ checked: nextProps.user.agence.online });
    }
  }

  render() {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={this.state.checked}
              onChange={this.handleChange}
              name="checked"
            />
          }
          label="Active"
        />
      </FormGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  updateStatusAgence,
})(CustomizedSwitches);
