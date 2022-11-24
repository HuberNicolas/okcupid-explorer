import {React, useState} from "react";
import FormCard from "./FormCard";
import {InitialContext} from "./Form/InitialContext";
import Grid from "./Grid";
import {Col, Container, Row, Stack} from "react-bootstrap";
import ScatterComponent from "./testign/ScatterComponent";

function ContentManager() {

    const [preSelection, setPreSelection] = useState(false);
    const [filter, setFilter] = useState([]);

    const handleSubmit = (event) => {
        if (preSelection === false){
            const selectedElements = event.map(e => {if (e.field_value !== undefined && e.field_value !== 'Select a value')
            {
                return true;
            }}).filter(obj => {if (obj) {return true;}return false;}).length;
            setPreSelection(selectedElements <= 5 && selectedElements >= 2 ? true : false);
            setFilter(event.map(e => {if (e.field_value !== undefined && e.field_value !== 'Select a value'){return e.id}}).filter(obj => {if (obj) return obj}));
        } else {
            // submit in attribute selection
            //TODO: console.log(event)
        }
    }

    const data = [
        {
            name: "chevrolet chevelle malibu",
            x: 18,
            y: 130
        },
        {
            name: "mazda something",
            x: 45,
            y: 89
        },
        {
            name: "heavy chevy",
            x: 61,
            y: 74
        },
        {
            name: "toyota gorgonzola",
            x: 44,
            y: 180
        }
        ,
        {
            name: "toyota gorgonzola",
            x: 3,
            y: 430
        }

    ]
    const w = 500;
    const h = 400;


    return (
        <InitialContext.Provider value={{ handleSubmit }}>
            { preSelection ||
                <Container>
                    <ScatterComponent data={data} height={h} width={w} color={"green"}  />
                    <Stack gap={3}>
                        <Row>
                            <Col>
                                <FormCard title={"Preselection - Select maximum 5"} value={{handleSubmit}} />
                            </Col>
                        </Row>
                    </Stack>
                </Container>
            }
            {preSelection &&
                <Grid filter={filter} />
            }
        </InitialContext.Provider>
    )

} export default ContentManager;