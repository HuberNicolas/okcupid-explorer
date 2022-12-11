import {React, useState} from "react";
import FormCard from "./FormCard";
import {InitialContext} from "./Form/InitialContext";
import {Button, Col, Container, Row} from "react-bootstrap";
//import Service from '../Service'
import axios from "axios"
import PlotComponent from "./PlotComponent";
import FilterResetComponent from "./FilterReset";

function ContentManager({setRenderItem}) {

    const [preSelection, setPreSelection] = useState(false);
    const [you, setYou] = useState(false);
    const [preQuestionaire, setQuestionaire] = useState(false);
    const [data, setData] = useState([]);
    const [dataPlaceholder, setDataPlaceholder] = useState([]);
    const [standardDeviationData, setStandardDeviationData] = useState([]);
    const [youData, setYouData] = useState([]);
    const [filter, setFilter] = useState([]);


    const handleSubmit = (event, question) => {

        if (question.question !== "FILTER"){ //if we want to recalculate every time the user changes his / her values we would have to change this here.
            if (!(event.filter(e => {return e.field_value === undefined}).length > 0)){
                let overall = {}
                event.forEach(e => {
                    if(e.id === "income")
                        e.field_value = parseFloat(e.field_value)
                    overall[e.id] =e.field_value;
                })
                overall = {
                    "threshold": parseFloat(overall['threshold']),
                    "mode": overall['mode'],
                    "data": overall
                }
                delete overall.data.threshold;
                delete overall.data.mode;

                setYou(event.map(e => {return {id: e.id, value: e.field_value}}));
                const config = {
                    headers: {'Access-Control-Allow-Origin': '*'}
                };
                // /api/post/users/nonstd ->  alle users in nicht std. form (der eingegebene user ist NICHT angefügt)
                // append threshold + mode
                axios.post('http://127.0.0.1:5000/api/post/users/nonstd', overall, config).then((e) => {
                    setData(e.data)
                    setDataPlaceholder(e.data)
                    setQuestionaire(event.map(e => {return {id: e.id, value: e.field_value}}));
                });
                //  alle users in std. form
                axios.post('http://127.0.0.1:5000/api/post/users/std', overall, config).then((e) => {
                    setStandardDeviationData(e.data)
                });
                // aktueller user in std form
                axios.post('http://127.0.0.1:5000/api/post/user/std', overall, config).then((e) => {
                    setYouData(e.data)
                });
            }
        } else if (question.question === "FILTER"){
            let selected = event.filter(e => e.field_value);
            selected = selected.map(e => e.name);
            setFilter(selected);
            setPreSelection(true);
        }
    }


    const superCrazyFilter = (filterForData, columnToFilter) => {
        console.log(columnToFilter)
        console.log(filterForData)
        setData(data.filter(e => e[columnToFilter] == filterForData))
    }

    const resetSuperCrazyFilter = () => {
        setData(dataPlaceholder)
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
                            <div>
                                <FormCard title={"Preselection - Select maximum 9"} value={{handleSubmit}} question={"FILTER"}/>
                                <FilterResetComponent superCrazyFilter={resetSuperCrazyFilter}/>
                            </div>

                        }
                    </Col>
                    <Col xs lg="8">
                    {preSelection &&
                        <PlotComponent filter={filter} questionary={preQuestionaire} you={you} data={data} standardDeviationData={standardDeviationData} standardizedYou={youData} superCrazyFilter={superCrazyFilter} />
                    }</Col>
                </Row>
            </Container>
        </InitialContext.Provider>
    )

} export default ContentManager;
