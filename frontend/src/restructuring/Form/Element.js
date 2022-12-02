import React from 'react'
import Input from './Input';
import Dropdown from './Dropdown';
import Select from './Select';
import MultipleInput from "./MultipleInput";

const Element = ({ field }) => {
    switch (field.type) {
        case 'input':
            return (
                <Input
                    field_id={field.id}
                    field_label={field.label}
                />);
        case 'dropdown':
            return (
                <Dropdown
                    field_id={field.id}
                    field_label={field.label}
                    field_options={field.options}
                />
            )
        case 'checkbox':
            return (<Select
                field_id={field.id}
                field_label={field.label}
                field_name={field.name}
                field_options={field.options}
            />)
        case 'multiselect':
            return (<MultipleInput
                field_id={field.id}
                field_label={field.label}
                field_options={field.options}
            />)
        default:
            return null;
    }

}
export default Element;