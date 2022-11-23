import {React, useState} from "react";
import FormCard from "./FormCard";
import {InitialContext} from "./Form/InitialContext";
import {Col, Container, Row} from "react-bootstrap";
//import Service from '../Service'
import axios from "axios"
import PlotComponent from "./PlotComponent";

function ContentManager() {

    const [preSelection, setPreSelection] = useState(false);
    const [preQuestionaire, setQuestionaire] = useState(false);
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
            if (filter){
                setQuestionaire(event.map(e => {if (e.field_value !== undefined && e.field_value !== 'Select a value'){return e.id}}).filter(obj => {if (obj) return obj}));
                console.log(preQuestionaire)
                //send axios call to backend -> currently cors issue
                axios.get('http://localhost:5000/index', { "Access-Control-Allow-Origin": true}).then(e => {
                    console.log(e)
                })
            }
            // submit in attribute selection
            //TODO: console.log(event)
        }
    }

    const handleDataFilterFromScatterPlot = (event) => {

    }

    return (
        <InitialContext.Provider value={{ handleSubmit }}>
            <Container fluid={true}>
                <Row>
                    <Col xs lg="2">
                        <Row>
                            <Col style={{marginBottom: "1rem"}}>
                                <FormCard title={"Preselection - Select maximum 5"} value={{handleSubmit}} />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {preSelection &&
                                    <FormCard title={"Questionaire"} value={{handleSubmit}} filter={filter}/>
                                }
                            </Col>
                        </Row>
                        {/* Questions */}
                    </Col>
                    <Col xs lg="10">
                    {preQuestionaire &&
                        <PlotComponent/>
                    }</Col>
                </Row>
            </Container>

            {/*preSelection &&
                <Grid filter={filter} />
            */}
        </InitialContext.Provider>
    )

} export default ContentManager;