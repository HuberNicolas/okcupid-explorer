import {React, useContext} from 'react'
import { FormContext } from './FormContext';
import Form from 'react-bootstrap/Form';

const Slide = (fieldInputs) => {
    const { handleChange } = useContext(FormContext)
    return (
        <div className="mb-3">
            <Form.Label>{fieldInputs.field_label}</Form.Label>
            <Form.Range
                id={`${fieldInputs.field_id}`}
                label={`${fieldInputs.field_label}`}
                defaultValue={0.8}
                min={0}
                max={1}
                step={0.1}
                name={`${fieldInputs.field_name}`}
                onChange={event => handleChange(fieldInputs.field_id, event)}
            />
        </div>
    )
}
export default Slide;