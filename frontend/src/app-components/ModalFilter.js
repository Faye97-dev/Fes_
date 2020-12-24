import React, { Component } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  Grid,
  Paper,
  MenuItem,
} from "@material-ui/core";

//import DialogContentText from "@material-ui/core/DialogContentText";
import { FilterList } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";
import { addClient } from "../actions/transaction";
import { connect } from "react-redux";

const validate = (values) => {
  const errors = {};
  /*if (!values.nom) {
    errors.nom = "Required";
  }
  if (!values.tel) {
    errors.tel = "Required";
  }*/
  return errors;
};

export class FormFilter extends Component {
  state = {
    status: {
      label: "transaction#status",
      content: ["NOT_WITHDRAWED", "TO_VALIDATE", "WITHDRAWED", "CANCELED"],
    },
    type_transaction: {
      label: "type_transaction",
      content: [
        { value: "01", text: "TRANSFERT" },
        { value: "02", text: "RETRAIT" },
        { value: "03", text: "COMP_VERSEMENT" },
        { value: "04", text: "COMP_RETRAIT" },
      ],
    },
  };
  onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);

    const data = {
      ...values,
    };
    console.log(data);
    this.props.handleFilter(data);
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
            validate={validate}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        name={this.state.status.label}
                        component={Select}
                        label="Selectionner un status"
                        formControlProps={{ fullWidth: true }}
                      >
                        {this.state.status.content.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          );
                        })}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        fullWidth
                        name={this.state.type_transaction.label}
                        component={Select}
                        label="Selectionner un type transaction"
                        formControlProps={{ fullWidth: true }}
                      >
                        {this.state.type_transaction.content.map(
                          (item, index) => {
                            return (
                              <MenuItem key={index} value={item.value}>
                                {item.text}
                              </MenuItem>
                            );
                          }
                        )}
                      </Field>
                    </Grid>

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

function ModalFilter(props) {
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
        <FilterList />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Selectionner un filtre</DialogTitle>

        <FormFilter
          handleClose={handleClose}
          handleFilter={props.handleFilter}
        ></FormFilter>
      </Dialog>
    </div>
  );
}
export default connect(null, {
  addClient,
})(ModalFilter);
