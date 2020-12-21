import React, { Component, Fragment } from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { ExampleWrapperSimple } from "../layout-components";

import TabTransaction from "./TabTransaction";
import TransactionHistory from "./TransactionHistory";
import Charts from "./Charts";
import { connect } from "react-redux";
import { login } from "../actions/auth";

export class Dashboard extends Component {
  componentDidMount() {
    //configureStore().dispatch(login);
    this.props.login();
  }

  render() {
    return (
      <Fragment>
        <Grid container spacing={4} alignItems="center" justify="center">
          <Grid item xs={12} sm={7} md={6} lg={5}>
            <Card className="card-box bg-primary text-light mb-4">
              <CardContent className="p-3">
                <div className=" text-center ">
                  <div className="font-weight-bold ">
                    <h6 className="text-white-20 d-block mb-1 text-uppercase">
                      Total de solde
                    </h6>
                    <span className="font-size-xxl mt-1">
                      {this.props.agence && this.props.agence.solde} MRU
                    </span>
                  </div>
                  {/*<div className="ml-auto">
                  <div className="bg-white text-center text-primary d-50 rounded-circle d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={["far", "chart-bar"]}
                      className="font-size-xl"
                    />
                  </div>
                </div>*/}
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={6} md={6} className="text-left">
                    <span className="text-white px-1 font-weight-bold">
                      {this.props.agence &&
                        this.props.agence.solde - this.props.agence.frais}{" "}
                      MRU
                    </span>
                    <br />
                    <span className="text-white-20">Total de transferts</span>
                  </Grid>
                  <Grid item xs={6} md={6} className="text-right">
                    <span className="text-white px-1 font-weight-bold">
                      {this.props.agence && this.props.agence.retrait} MRU
                    </span>
                    <br />
                    <span className="text-white-20">Total de retraits</span>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <ExampleWrapperSimple sectionHeading="">
          <TabTransaction />
        </ExampleWrapperSimple>

        <TransactionHistory />
        <Charts />
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  agence: state.auth.agence,
});
export default connect(mapStateToProps, { login })(Dashboard);
