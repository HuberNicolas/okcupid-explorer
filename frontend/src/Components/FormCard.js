import {Card, Button, Form} from 'react-bootstrap'
import {useState, useEffect} from "react";
import formJSON from './Form/fields.json';
import Element from "./Form/Element";
import { FormContext } from './Form/FormContext';

function FormCard() {
    const backgroundColor = "dark"
    const title = "Form"

    const [elements, setElements] = useState([]);
    useEffect(()=>{
        setElements(formJSON)
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (f_id, event) => {
        const newElements =  [...elements]
        newElements.forEach(field => {
            const { type, id } = field;
            if (f_id === id) {
                switch (type) {
                    case 'checkbox':
                        field['field_value'] = event.target.checked;
                        break;

                    default:
                        field['field_value'] = event.target.value;
                        break;
                }


            }
            setElements(newElements)
        });
    }

    const cardHeaderStyle = {
        color: "white"
    }

    return (
        <FormContext.Provider value={{ handleChange }}>
            {
                <Card bg={backgroundColor}>
                    <Card.Header style={cardHeaderStyle}>{title}</Card.Header>
                    <Card.Body value={{handleChange}}>
                        {elements.map((e) => {return (<Element key={e.id} field={e} />)})}
                        <Button onClick={handleSubmit}>Submit something</Button>
                    </Card.Body>
                </Card>
            }
        </FormContext.Provider>
    )
}
export default FormCard;