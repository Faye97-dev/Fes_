import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  Grid,
  Paper,
} from "@material-ui/core";

//import DialogContentText from "@material-ui/core/DialogContentText";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";
import { addClient } from "../actions/transaction";
import { connect } from "react-redux";

const validate = (values) => {
  const errors = {};
  if (!values.nom) {
    errors.nom = "Required";
  }
  if (!values.tel) {
    errors.tel = "Required";
  }
  return errors;
};

const validateSup3000 = (values) => {
  const errors = {};
  if (!values.nom) {
    errors.nom = "Required";
  }
  if (!values.tel) {
    errors.tel = "Required";
  }
  if (!values.nni) {
    errors.nni = "Required";
  }
  return errors;
};

export class FormClient extends Component {
  onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);

    const data = {
      ...values,
    };
    //console.log(data);
    this.props.addClient(data);
    this.props.handleClose();
  };
  render() {
    return (
      <>
        <DialogContent>
          {/* <DialogContentText>*/}
          <Form
            onSubmit={this.onSubmit}
            initialValues={{}}
            validate={
              this.props.IsSup300 === "SUP_3000" ? validateSup3000 : validate
            }
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        required
                        name="nom"
                        component={TextField}
                        type="text"
                        label="Nom complet"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        required
                        name="tel"
                        component={TextField}
                        type="number"
                        label="Numero de telephone"
                      />
                    </Grid>
                    {this.props.IsSup300 == "SUP_3000" ? (
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          required
                          name="nni"
                          component={TextField}
                          type="number"
                          label="Nni"
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={6}>
                        <Field
                          fullWidth
                          name="nni"
                          component={TextField}
                          type="number"
                          label="Nni"
                        />
                      </Grid>
                    )}

                    <Grid item style={{ marginTop: 16 }}>
                      <DialogActions>
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          disabled={submitting}
                          space={4}
                        >
                          Ajouter
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={this.props.handleClose}
                        >
                          Annuler
                        </Button>
                      </DialogActions>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            )}
          />
          {/*</DialogContentText>*/}
        </DialogContent>
      </>
    );
  }
}

function ModalClient(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="add_destinataire"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Ajouter un nouveau client
        </DialogTitle>

        <FormClient
          IsSup300={props.IsSup300}
          handleClose={handleClose}
          addClient={props.addClient}
        ></FormClient>
      </Dialog>
    </div>
  );
}
export default connect(null, {
  addClient,
})(ModalClient);
