import React, { Component } from "react";
import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";
import {
  Paper,
  Grid,
  Button,
  MenuItem,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";

import ModalClient from "./ModalClient";

import Radio from "@material-ui/core/Radio";

import { getClients, getAgences, addTransfert } from "../actions/transaction";
import { login } from "../actions/auth";
import { connect } from "react-redux";

//import { AutoCompleteWrapper } from "./AutoComplete";
// Picker
/*import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';

function DatePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <DatePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}

function TimePickerWrapper(props) {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    ...rest
  } = props;
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched;

  return (
    <TimePicker
      {...rest}
      name={name}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={restInput}
      onChange={onChange}
      value={value === '' ? null : value}
    />
  );
}
*/

class FormTransfert extends Component {
  state = {
    IsSup300: "INF_3000",
  };

  componentDidMount() {
    this.props.getClients();
    this.props.getAgences();
  }

  validateSup3000 = (values) => {
    const errors = {};
    if (!values.agence_destination) {
      errors.agence_destination = "Required";
    }
    if (!values.destinataire) {
      errors.destinataire = "Required";
    }
    if (!values.expediteur) {
      errors.expediteur = "Required";
    }
    if (!values.montant) {
      errors.montant = "Required";
    }
    if (!values.frais_origine) {
      errors.frais_origine = "Required";
    }
    if (!values.frais_destination) {
      errors.frais_destination = "Required";
    }

    return errors;
  };

  validate = (values) => {
    const errors = {};
    if (!values.agence_destination) {
      errors.agence_destination = "Required";
    }
    if (!values.destinataire) {
      errors.destinataire = "Required";
    }
    if (!values.montant) {
      errors.montant = "Required";
    }
    if (!values.frais_origine) {
      errors.frais_origine = "Required";
    }
    if (!values.frais_destination) {
      errors.frais_destination = "Required";
    }

    return errors;
  };

  onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    //console.log(values);
    const data = {
      ...values,
      categorie_transaction: this.state.IsSup300,
      agence_origine: this.props.user.agence.id,
    };
    this.props.addTransfert(data);
    //this.props.login();
    //window.alert(JSON.stringify(values, 0, 2));
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      IsSup300: e.target.value,
    });
    console.log(e.target.value);
  };

  render() {
    const expediteur = (
      <>
        <Grid item xs={5}>
          <Field
            fullWidth
            required
            name="expediteur"
            component={Select}
            label="Selectionner un expediteur"
            formControlProps={{ fullWidth: true }}
          >
            {this.props.clients.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.nom} - {item.tel}
                </MenuItem>
              );
            })}
          </Field>
        </Grid>
        <Grid item xs={1} style={{ paddingTop: "15px" }}>
          <ModalClient IsSup300={this.state.IsSup300} />
        </Grid>
      </>
    );
    return (
      <>
        <Paper style={{ padding: 20 }}>
          <Grid item>
            <FormControl component="fieldset">
              <FormLabel component="legend">Types de transferts</FormLabel>
              <RadioGroup
                row
                aria-label="type transfert"
                name="type transfert"
                onChange={this.onChange}
                value={this.state.IsSup300}
              >
                <FormControlLabel
                  label="Moins de 3000"
                  control={<Radio />}
                  value="INF_3000"
                />
                <FormControlLabel
                  label="Plus de 3000"
                  control={<Radio />}
                  value="SUP_3000"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Paper>
        <br /> <br />
        <Form
          onSubmit={this.onSubmit}
          initialValues={{}}
          validate={
            this.state.IsSup300 === "SUP_3000"
              ? this.validateSup3000
              : this.validate
          }
          render={({ handleSubmit, reset, submitting, pristine, values }) => (
            <form
              onSubmit={(event) => {
                handleSubmit(event).then(reset);
              }}
              noValidate
            >
              <Paper style={{ padding: 20 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="agence_destination"
                      component={Select}
                      label="Selectionner une agence de destination"
                      formControlProps={{ fullWidth: true }}
                    >
                      {this.props.user &&
                        this.props.agences
                          .filter(
                            (item) => this.props.user.agence.id !== item.id
                          )
                          .map((item) => {
                            return (
                              <MenuItem key={item.id} value={item.id}>
                                {item.nom} - {item.code_agence + "  "}(
                                {item.commune.commune})
                              </MenuItem>
                            );
                          })}
                    </Field>
                  </Grid>
                  <Grid item xs={5}>
                    <Field
                      fullWidth
                      required
                      name="destinataire"
                      component={Select}
                      label="Selectionner un destinataire"
                      formControlProps={{ fullWidth: true }}
                    >
                      {this.props.clients.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nom} - {item.tel}
                          </MenuItem>
                        );
                      })}
                    </Field>
                  </Grid>
                  <Grid item xs={1} style={{ paddingTop: "15px" }}>
                    <ModalClient IsSup300={this.state.IsSup300} />
                  </Grid>
                  {this.state.IsSup300 === "SUP_3000" && expediteur}
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      name="montant"
                      component={TextField}
                      type="number"
                      label="Montant"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      name="frais_origine"
                      component={TextField}
                      type="number"
                      label="Frais d'origine"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      fullWidth
                      required
                      name="frais_destination"
                      component={TextField}
                      type="number"
                      label="Frais de destination"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="remarque"
                      component={TextField}
                      multiline
                      label="Remarque"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="motif"
                      component={TextField}
                      multiline
                      label="Motif"
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={submitting}
                    >
                      Ajouter
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
              {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
            </form>
          )}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  agences: state.transaction.agences,
  clients: state.transaction.clients,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getAgences,
  getClients,
  addTransfert,
  login,
})(FormTransfert);

{
  /*const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
  ];
  <AutoCompleteWrapper
        id="combo-box-demo"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" />
        )}
        />*/
}

{
  /**<Grid item xs={6}>
                <Field
                  fullWidth
                  required
                  name="firstName"
                  component={TextField}
                  type="text"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  fullWidth
                  required
                  name="lastName"
                  component={TextField}
                  type="text"
                  label="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="email"
                  fullWidth
                  required
                  component={TextField}
                  type="email"
                  label="Email"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  label="Employed"
                  control={
                    <Field
                      name="employed"
                      component={Checkbox}
                      type="checkbox"
                    />
                  }
                />
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Best Stooge</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      label="Larry"
                      control={
                        <Field
                          name="stooge"
                          component={Radio}
                          type="radio"
                          value="larry"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Moe"
                      control={
                        <Field
                          name="stooge"
                          component={Radio}
                          type="radio"
                          value="moe"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Curly"
                      control={
                        <Field
                          name="stooge"
                          component={Radio}
                          type="radio"
                          value="curly"
                        />
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Sauces</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      label="Ketchup"
                      control={
                        <Field
                          name="sauces"
                          component={Checkbox}
                          type="checkbox"
                          value="ketchup"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Mustard"
                      control={
                        <Field
                          name="sauces"
                          component={Checkbox}
                          type="checkbox"
                          value="mustard"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Salsa"
                      control={
                        <Field
                          name="sauces"
                          component={Checkbox}
                          type="checkbox"
                          value="salsa"
                        />
                      }
                    />
                    <FormControlLabel
                      label="Guacamole 🥑"
                      control={
                        <Field
                          name="sauces"
                          component={Checkbox}
                          type="checkbox"
                          value="guacamole"
                        />
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="notes"
                  component={TextField}
                  multiline
                  label="Notes"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  name="city"
                  component={Select}
                  label="Select a City"
                  formControlProps={{ fullWidth: true }}
                >
                  <MenuItem value="London">London</MenuItem>
                  <MenuItem value="Paris">Paris</MenuItem>
                  <MenuItem value="Budapest">
                    A city with a very long Name
                  </MenuItem>
                </Field>
              </Grid>
              */
}

{
  /*<MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item xs={6}>
                    <Field
                      name="rendez-vous"
                      component={DatePickerWrapper}
                      fullWidth
                      margin="normal"
                      label="Rendez-vous"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="alarm"
                      component={TimePickerWrapper}
                      fullWidth
                      margin="normal"
                      label="Alarm"
                    />
                    </Grid>
                    </MuiPickersUtilsProvider>*/
}
