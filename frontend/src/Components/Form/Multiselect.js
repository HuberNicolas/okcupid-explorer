import {React, useContext} from 'react'
import { FormContext } from './FormContext';
const Multiselect = (fieldInputs) => {
    const { handleChange } = useContext(FormContext)
    return (
        <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={event => handleChange(fieldInputs.field_id, event)} />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
    )
}
export default Multiselect;