import {Card, Button} from 'react-bootstrap'
import {useState, useEffect, useContext} from "react";
import formJSON from './Form/fields.json';
import preSelectionJSON from './Form/preselection.json';
import Element from "./Form/Element";
import { FormContext } from './Form/FormContext';
import {InitialContext} from "./Form/InitialContext";

function FormCard({title}) {
    const backgroundColor = "dark"


    const [elements, setElements] = useState([]);
    const { handleSubmit } = useContext(InitialContext)

    useEffect(()=>{
        if (title !== undefined){
            if (title.includes("Preselection")){
                setElements(preSelectionJSON)
            } else {
                setElements(formJSON)
            }
        }
    },[])

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
                    <Card.Body value={{handleChange}} style={{"margin": "auto"}}>
                        {elements.map((e) => {return (<Element key={e.id} field={e} />)})}
                        <Button onClick={event => handleSubmit(elements)}>Submit something</Button>
                    </Card.Body>
                </Card>
            }
        </FormContext.Provider>
    )
}
export default FormCard;