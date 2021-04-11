import React from 'react';
import './form-input.styles.scss';
import TextField from '@material-ui/core/TextField';

const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className='group'>
        <TextField
            id='outlined-basic'
            variant='outlined'
            onChange={handleChange}
            label={label}
            {...otherProps}
            className='form-input'
        />
    </div>
);
export default FormInput;
