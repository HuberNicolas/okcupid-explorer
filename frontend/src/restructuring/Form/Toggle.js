import {React, useContext, useState} from 'react'
import { FormContext } from './FormContext';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


const Toggle = (fieldInputs) => {
    const { handleChange } = useContext(FormContext)
    return (
        <div className="mb-3">
            <ButtonGroup>
                {fieldInputs.field_options.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        checked={fieldInputs.field_value === radio.value}
                        value={radio.value}
                        onChange={event => handleChange(fieldInputs.field_id, event)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    )
}
export default Toggle;