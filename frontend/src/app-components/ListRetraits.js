import React, { Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Grid, Card, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { addRetrait } from "../actions/transaction";
function ListRetrait(props) {
  return (
    <Fragment>
      <Grid container spacing={4}>
        <Grid item lg={12}>
          <Card className="card-box mb-2">
            <div className="scroll-area rounded bg-white shadow-overflow">
              <PerfectScrollbar>
                <div className="p-3">
                  {props.transferts.map((item) => {
                    return (
                      <div key={item.id}>
                        <div className="d-flex justify-content-between">
                          <div>
                            <div className="font-weight-bold">
                              <span className="text-black">
                                {item.agence_destination.nom}
                              </span>
                            </div>
                            <small className="d-flex pt-2 align-items-center">
                              <span>
                                {item.destinataire.nom} -{item.destinataire.tel}
                              </span>
                              <span className="pl-2 text-black">
                                {item.date_creation}
                              </span>
                            </small>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div className="badge badge-warning px-4">
                              {item.status}
                            </div>
                          </div>
                          <div className="px-4">
                            <Button
                              color="primary"
                              aria-label="retrait"
                              variant="outlined"
                              onClick={() => {
                                props.addRetrait({ id: item.id });
                                props.removeTransfert(item.id);
                              }}
                            >
                              <span className="px-2">Retirer </span>
                              <FontAwesomeIcon icon={["fas", "arrow-right"]} />
                            </Button>
                          </div>
                        </div>
                        <Divider className="my-3" />
                      </div>
                    );
                  })}
                </div>
              </PerfectScrollbar>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default connect(null, { addRetrait })(ListRetrait);
