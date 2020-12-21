import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@material-ui/core";

//import DialogContentText from "@material-ui/core/DialogContentText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "@material-ui/core/IconButton";
import {
  mapColorStatus,
  mapTypeNames,
  mapColorTypes,
} from "../actions/choices";

class TransactionDetail extends Component {
  render() {
    const item = this.props.item;
    return (
      <>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card className="card-box mb-4">
                <div className="card-header">
                  <span className="font-size-lg mb-0 py-2">
                    Agence d'origine
                  </span>
                </div>
                <CardContent>
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Nom</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_origine.nom}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Code Agence</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_origine.code_agence}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Commune</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_origine.commune.commune}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Adresse</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_origine.adresse}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Telephone</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_origine.tel}
                    </div>
                  </div>
                  <Divider />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="card-box mb-4">
                <div className="card-header">
                  <span className="font-size-lg mb-0 py-2">
                    Agence de destination
                  </span>
                </div>
                <CardContent>
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Nom</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_destination.nom}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Code Agence</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_destination.code_agence}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Commune</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_destination.commune.commune}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Adresse</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_destination.adresse}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Telephone</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.agence_destination.tel}
                    </div>
                  </div>
                  <Divider />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card className="card-box mb-4">
                <div className="card-header">
                  <span className="font-size-lg mb-0 py-2">Transaction</span>
                </div>
                <CardContent>
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Code</div>
                    <div className=" font-size-lg text-primary">
                      {item.code_transaction}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Date</div>
                    <div className=" font-size-lg text-primary">
                      {item.date}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Type</div>
                    <div
                      className={
                        "font-size-lg" +
                        "badge px-4" +
                        " badge-" +
                        mapColorTypes[item.type_transaction]
                      }
                    >
                      {mapTypeNames[item.type_transaction]}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Status</div>
                    <div
                      className={
                        " font-size-lg" +
                        "badge px-4" +
                        " badge-" +
                        mapColorStatus[item.transaction.status]
                      }
                    >
                      {item.transaction.status}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Montant</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.montant}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Frais d'origine</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.frais_origine}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Frais de destination</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.frais_destination}
                    </div>
                  </div>
                  <Divider />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="card-box mb-4">
                <div className="card-header">
                  <span className="font-size-lg mb-0 py-2">Destinataire</span>
                </div>
                <CardContent>
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Nom</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.destinataire.nom}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Telephone</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.destinataire.tel}
                    </div>
                  </div>
                  <Divider />
                  <div className="d-flex align-items-center justify-content-between p-3">
                    <div className=" font-size-md">Nni</div>
                    <div className=" font-size-lg text-primary">
                      {item.transaction.destinataire.nni}
                    </div>
                  </div>
                  <Divider />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </>
    );
  }
}

export class ModalTransactionDetail extends Component {
  state = {
    open: false,
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <div className="px-3" onClick={this.handleClickOpen}>
          <IconButton size="small" variant="outlined" color="primary">
            <FontAwesomeIcon icon={["fas", "eye"]} />
          </IconButton>
          <span className="px-2">Voir plus</span>
        </div>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth="md"
          scroll="paper"
        >
          <DialogTitle id="form-dialog-title">
            <span className="font-size-lg mb-0 py-2 ">
              Informations de la transaction
            </span>
          </DialogTitle>

          <TransactionDetail item={this.props.item}></TransactionDetail>
        </Dialog>
      </>
    );
  }
}

export default ModalTransactionDetail;

/*
export default function ModalTransactionDetail(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      
    </>
  );
}
*/
