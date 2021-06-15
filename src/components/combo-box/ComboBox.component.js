/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import "./ComboBox.scss";
// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11

export default function ComboBox(props) {
    
    return (
        <div className = "comboBox-container">
        
        <Autocomplete
          id="country-select-demo"
          style={{ width: 300 }}
          options={props.comboBoxArray}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(option) => (
            <React.Fragment>
              <span>{option.label}</span>
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password" // disable autocomplete and autofill
              }}
              className = "combo-box"
            />
          )}
        />
        </div>
    );
  }
  
  // From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

  