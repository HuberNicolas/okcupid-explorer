import {React, useContext} from 'react'
import { FormContext } from './FormContext';
import {Form} from "react-bootstrap";

const MultipleInput = (fieldInputs) => {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <Form.Label>{fieldInputs.field_label}</Form.Label>
            <Form.Select multiple id={fieldInputs.field_id} onChange={event => handleChange(fieldInputs.field_id, event)} aria-label={fieldInputs.field_label}>
                {fieldInputs.field_options.map((option) => {
                    return (<option key={option} value={option}>{option}</option>)
                })}
            </Form.Select>
        </div>
    )
}
export default MultipleInput;