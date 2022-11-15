import {React, useContext} from 'react'
import { FormContext } from './FormContext';
import Form from 'react-bootstrap/Form';

const Select = (fieldInputs) => {
    const { handleChange } = useContext(FormContext)
    return (
        <div className="form-check" className="mb-3">
            <Form.Check
                        type={"checkbox"}
                        id={`${fieldInputs.field_id}`}
                        label={`${fieldInputs.field_label}`}
                        onChange={event => handleChange(fieldInputs.field_id, event)}
                    />

        </div>
    )
}
export default Select;