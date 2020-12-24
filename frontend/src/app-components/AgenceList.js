import React, { Fragment, Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { getAgences } from "../actions/transaction";
import { mapColorAgence } from "../actions/choices";
import {
  IconButton,
  Card,
  CardContent,
  Button,
  Tooltip,
} from "@material-ui/core";

import Dropdown from "./utils/Dropdown";

export class AgenceList extends Component {
  componentDidMount() {
    this.props.getAgences();
  }

  render() {
    return (
      <Fragment>
        <Card className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">
              <h6>Liste des Agences</h6>
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
                    <th className="text-left">Code Agence</th>
                    <th className="text-left">Nom</th>
                    <th className="text-center">Adresse</th>
                    <th className="text-center">Contact </th>
                    <th className="text-center">Type </th>
                    <th className="text-center">Status </th>
                    <th className="text-center">Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.agences.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.code_agence}</td>
                        <td>{item.nom}</td>
                        <td className="text-center">
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="..."
                            >
                              {item.commune.commune}
                            </a>
                            <span className="text-black-50 d-block">
                              {item.adresse}
                            </span>
                          </div>
                        </td>
                        <td className="text-center">
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="..."
                            >
                              {item.tel}
                            </a>
                            <span className="text-black-50 d-block">
                              {item.email}
                            </span>
                          </div>
                        </td>
                        <td className="text-center">
                          <div
                            className={
                              "badge px-4" +
                              " badge-" +
                              mapColorAgence[item.type_agence]
                            }
                          >
                            {item.type_agence}
                          </div>
                        </td>

                        <td className="text-center">
                          <div
                            className={
                              item.online
                                ? "badge px-4 badge-success"
                                : "badge px-4 badge-danger"
                            }
                          >
                            {item.online ? "En ligne" : "Hors ligne"}
                          </div>
                        </td>

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
  agences: state.transaction.agences,
});

export default connect(mapStateToProps, {
  getAgences,
})(AgenceList);
