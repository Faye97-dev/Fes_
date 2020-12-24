import React, { Fragment, Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { getEmployes } from "../actions/auth";
import { mapColorAgence } from "../actions/choices";
import {
  IconButton,
  Card,
  CardContent,
  Button,
  Tooltip,
} from "@material-ui/core";

import Dropdown from "./utils/Dropdown";

export class EmployeList extends Component {
  componentDidMount() {
    this.props.getEmployes();
  }

  render() {
    return (
      <Fragment>
        <Card className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">
              <h6>Liste des Employes</h6>
            </div>
            <div className="card-header--actions">
              <Tooltip arrow title="Refresh">
                <IconButton size="small" color="primary" className="mr-3">
                  <FontAwesomeIcon icon={["fas", "cog"]} spin />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <CardContent className="p-3">
            <div className="table-responsive">
              <table className="table table-borderless table-hover text-nowrap mb-0">
                <thead>
                  <tr>
                    <th className="text-left">Nom complet</th>
                    <th className="text-center">Username</th>
                    <th className="text-center">telephone </th>
                    <th className="text-center">Email </th>
                    <th className="text-center">Adresse </th>
                    <th className="text-center">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.employes.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.first_name + "  " + item.last_name}</td>
                        <td className="text-center">{item.username}</td>
                        <td className="text-center">{item.tel}</td>
                        <td className="text-center">{item.email}</td>
                        <td className="text-center">{item.adresse}</td>
                        <td className="text-center">
                          <Dropdown item={item}></Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
          <div className="card-footer d-flex justify-content-between"></div>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  employes: state.auth.employes,
});

export default connect(mapStateToProps, {
  getEmployes,
})(EmployeList);
