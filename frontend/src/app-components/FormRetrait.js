import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";
import { Grid } from "@material-ui/core";
import ListRetraits from "./ListRetraits";
import axios from "axios";
import { HOST } from "../actions/types";
import { NOT_WITHDRAWED } from "../actions/choices";

async function getNotWhitrated(tel) {
  let data;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (tel !== "") {
    await axios
      .get(HOST + `api/transfert/list/`, {
        params: {
          tel: tel,
          status: NOT_WITHDRAWED,
        },
        config,
      })
      .then((res) => {
        console.log(" axios ... ", res.data);
        data = res.data.slice(0, 3);
      })
      .catch((err) => {
        console.log(err.response.data);
        data = [];
      });
    return data;
  } else {
    return [];
  }
}

export class FormRetrait extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", transferts: [] };
    this.removeTransfert = this.removeTransfert.bind(this);
  }
  removeTransfert(id) {
    const res = this.state.transferts.filter((item) => {
      if (item.id !== id) {
        return item;
      }
    });
    this.setState({ ...this.state, transferts: [...res] });
  }

  render() {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xs={10}>
          <SearchBar
            placeholder="Entrer un numero de telephone .."
            value={this.state.value}
            onChange={(newValue) =>
              this.setState({ ...this.state, value: newValue })
            }
            onRequestSearch={() => {
              //console.log(this.state.value);
              getNotWhitrated(this.state.value).then((res1) => {
                this.setState({ ...this.state, transferts: [...res1] });
              });
            }}
          />
          <br />
          <br />
          {this.state.transferts.length !== 0 && (
            <ListRetraits
              transferts={this.state.transferts}
              removeTransfert={this.removeTransfert}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

export default FormRetrait;
