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
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ModalTransactionDetail from "./ModalTransactionDetail";
import Dropdown from "./utils/Dropdown";
import {
  filterDataProcess,
  filterToBool,
  PaginateData,
} from "./utils/DataTable";

import ModalFilter from "./ModalFilter";
export class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      init: true,
      search: "",
      totalPage: 1,
      totalRows: 5,
      totalData: 0,
      page: 1,
      current: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }
  componentDidMount() {
    this.props.getTransactions(true);
  }
  UNSAFE_componentWillUpdate(nextProps) {
    if (nextProps.transactions !== this.state.data && this.state.init) {
      console.log(" sync transactions to props table  ...");
      this.Paginate([...nextProps.transactions], this.state.totalRows, true);
    }
  }

  reset() {
    console.log(" reset ...");
    this.Paginate([...this.props.transactions], this.state.totalRows, true);
  }

  handleChange(event) {
    this.setState({ ...this.state, search: event.target.value });
  }
  search() {
    const filter = [...this.props.transactions].filter((item) =>
      item.transaction.destinataire.nom.includes(this.state.search)
    );
    this.Paginate([...filter], this.state.totalRows, false);
  }

  handlePage(e, val) {
    this.setState({
      ...this.state,
      page: val,
      current: [...this.state.data].filter((item) => item.page === val),
    });
  }

  Paginate(data, rows, resetSearch) {
    const [page, paginated] = PaginateData(data, rows);
    //return [page, paginated];
    const temp = [...paginated].filter((item) => item.page === 1);
    if (resetSearch) {
      this.setState({
        ...this.state,
        data: [...paginated],
        init: false,
        search: "",
        totalPage: page,
        totalData: paginated.length,
        page: 1,
        current: temp,
      });
    } else {
      this.setState({
        ...this.state,
        data: [...paginated],
        init: false,
        totalPage: page,
        totalData: paginated.length,
        page: 1,
        current: temp,
      });
    }
  }

  handleFilter(data) {
    /*const [fil, keys] = filterDataProcess({
      "transaction#status": "WITHDRAWED",
      type_transaction: "02",
    });*/
    //const keys = Object.keys({ ...fil });
    //const keys = [["transaction", "status"], ["type_transaction"]];
    const [fil, keys] = filterDataProcess(data);
    const filter = [...this.props.transactions].filter((item) =>
      filterToBool(item, fil, keys)
    );
    this.Paginate([...filter], this.state.totalRows, true);
  }

  render() {
    return (
      <Fragment>
        <Card className="card-box mb-4">
          <div className="card-header pr-2">
            <div className="card-header--title">
              <h6>Liste des Transactions</h6>
              <label className="px-3">
                <input
                  type="text"
                  value={this.state.search}
                  onChange={this.handleChange}
                />
              </label>
              <Button
                size="small"
                variant="contained"
                className="mr-3"
                color="primary"
                onClick={this.search}
              >
                search
              </Button>

              <ModalFilter className="px-3" handleFilter={this.handleFilter} />
              <Button
                size="small"
                variant="contained"
                className="mr-3"
                color="primary"
                onClick={this.reset}
              >
                reset
              </Button>
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
                  {this.state.current.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.code_transaction}</td>
                        <td>{item.date}</td>
                        <td className="text-center">
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
                        <td className="text-center">
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
                        <td className="text-center">
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
                          <Dropdown>
                            <ModalTransactionDetail
                              item={item}
                            ></ModalTransactionDetail>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
          <div className="card-footer d-flex justify-content-between">
            {/*<Button
              size="small"
              variant="contained"
              className="mr-3"
              color="primary"
              onClick={() => this.handleFilter({})}
            >
              WITHDRAWED
            </Button>*/}
          </div>
          <div>
            <Typography>{"Total :" + " " + this.state.totalData}</Typography>
            <Pagination
              count={this.state.totalPage}
              page={this.state.page}
              onChange={this.handlePage}
            />
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
})(TransactionList);
