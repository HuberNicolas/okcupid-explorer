import {React, useContext} from 'react'
import {Form} from 'react-bootstrap'
import { FormContext } from './FormContext';
const Input = (fieldInputs) => {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <Form.Label>{fieldInputs.field_label}</Form.Label>
            <Form.Control onChange={event => handleChange(fieldInputs.field_id, event)} type="number" max={100} placeholder={fieldInputs.field_label} id={fieldInputs.id} />
        </div>
    )
}
export default Input;