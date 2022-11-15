import React from 'react'
import Input from './Input';
import Dropdown from './Dropdown';
import Multiselect from './Multiselect';

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
            return (<Multiselect
                field_id={field.id}
                field_label={field.label}
                field_options={field.options}
            />)
        default:
            return null;
    }

}
export default Element;