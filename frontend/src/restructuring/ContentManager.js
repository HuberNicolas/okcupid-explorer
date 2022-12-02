import {React, useState} from "react";
import FormCard from "./FormCard";
import {InitialContext} from "./Form/InitialContext";
import {Col, Container, Row} from "react-bootstrap";
//import Service from '../Service'
import axios from "axios"
import PlotComponent from "./PlotComponent";

function ContentManager() {

    const [preSelection, setPreSelection] = useState(false);
    const [you, setYou] = useState(false);
    const [preQuestionaire, setQuestionaire] = useState(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);

    const handleSubmit = (event, question) => {

        if (preQuestionaire === false){ //if we want to recalculate every time the user changes his / her values we would have to change this here.
            if (!(event.filter(e => {return e.field_value === undefined}).length > 0)){
                let overall = {}
                event.forEach(e => {
                    overall[e.id] =e.field_value;
                })
                setQuestionaire(event.map(e => {return {id: e.id, value: e.field_value}}));
                setYou(event.map(e => {return {id: e.id, value: e.field_value}}));
                const config = {
                    headers: {'Access-Control-Allow-Origin': '*'}
                };
                axios.post('http://127.0.0.1:5000/api/dev/std/db', overall, config).then((e) => {
                    setData(e.data)
                });
                axios.get('http://127.0.0.1:5000/api/std/index', config).then((e) => {
                    console.log(e.data)
                })
            }
        } else if (question.question === "FILTER"){
            let selected = event.filter(e => e.field_value)
            selected = selected.map(e => e.name)
            setFilter(selected)
            setPreSelection(true)
            /*
            const config = {
                headers: {'Access-Control-Allow-Origin': '*'}
            };
            axios.get('http://127.0.0.1:5000/api/std/index', config).then((e) => {
                //console.log(e.data)
            })*/
        }
    }

    return (
        <InitialContext.Provider value={{ handleSubmit }}>
            <Container fluid={true}>
                <Row>
                    <Col xs lg="2">
                        <FormCard title={"Questionaire"} value={{handleSubmit}} filter={filter} question={"QUESTIONARY"}/>
                        {/* Questions */}
                    </Col>
                    <Col xs lg="2">
                        {preQuestionaire &&
                            <FormCard title={"Preselection - Select maximum 9"} value={{handleSubmit}} question={"FILTER"}/>
                        }
                    </Col>
                    <Col xs lg="8">
                    {preSelection &&
                        <PlotComponent filter={filter} questionary={preQuestionaire} you={you} data={data} />
                    }</Col>
                </Row>
            </Container>
        </InitialContext.Provider>
    )

} export default ContentManager;