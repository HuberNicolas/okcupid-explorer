import {React, useContext} from 'react'
import { FormContext } from './FormContext';
import {Form} from "react-bootstrap";
const Dropdown = (fieldInputs) => {
    const { handleChange } = useContext(FormContext)
    return (
        <div>
            <Form.Select id={fieldInputs.field_id} onChange={event => handleChange(fieldInputs.field_id, event)}>
                {fieldInputs.field_options.map((option) => {
                    return (<option key={option} value={option}>{option}</option>)
                })}
            </Form.Select>
        </div>
)
}
export default Dropdown;