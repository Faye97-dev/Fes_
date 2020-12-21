import React, { Fragment, Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { getTransactions } from "../actions/transaction";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
} from "../actions/choices";
import {
  IconButton,
  Card,
  CardContent,
  Button,
  Tooltip,
} from "@material-ui/core";

import Dropdown from "./utils/Dropdown";
export class TransactionHistory extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }

  render() {
    return (
      <Fragment>
        <Card className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">
              <h6>Historiques des Transactions</h6>
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
                    <th className="text-left">Numero</th>
                    <th className="text-left">Date</th>
                    <th className="text-center">Agence d'origine</th>
                    <th className="text-center">Agence de destination</th>
                    <th className="text-center">Destinataire </th>
                    <th className="text-center">Montant</th>
                    <th className="text-center">Type </th>
                    <th className="text-center">Status </th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.transactions.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.code_transaction}</td>
                        <td>{item.date}</td>
                        <td>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="..."
                            >
                              {item.transaction.agence_origine.nom}
                            </a>
                            <span className="text-black-50 d-block">
                              {item.transaction.agence_origine.type_agence}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="..."
                            >
                              {item.transaction.agence_destination.nom}
                            </a>
                            <span className="text-black-50 d-block">
                              {item.transaction.agence_destination.type_agence}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div>
                            <a
                              href="#/"
                              onClick={(e) => e.preventDefault()}
                              className="font-weight-bold text-black"
                              title="..."
                            >
                              {item.transaction.destinataire.nom}
                            </a>
                            <span className="text-black-50 d-block">
                              {item.transaction.destinataire.tel}
                            </span>
                          </div>
                        </td>
                        <td> {item.transaction.montant} MRU</td>
                        <td className="text-center">
                          <div
                            className={
                              "badge px-4" +
                              " badge-" +
                              mapColorTypes[item.type_transaction]
                            }
                          >
                            {mapTypeNames[item.type_transaction]}
                          </div>
                        </td>
                        <td className="text-center">
                          <div
                            className={
                              "badge px-4" +
                              " badge-" +
                              mapColorStatus[item.transaction.status]
                            }
                          >
                            {item.transaction.status}
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
          <div className="card-footer d-flex justify-content-between">
            <div>
              <Button
                size="small"
                variant="contained"
                className="mr-3"
                color="primary"
              >
                Voir toute la liste
              </Button>
            </div>
          </div>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transaction.transactions,
});

export default connect(mapStateToProps, {
  getTransactions,
})(TransactionHistory);
