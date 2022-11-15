import {Container, Row, Stack, Col} from 'react-bootstrap'
import {useState} from "react";
import UpsetGraph from "./UpsetGraph";
//import cleansedData from '../df_cleansed.json'

function DetailGraphGrid() {
    const [hover, setHover] = useState(null);
    const [selection, setSelection] = useState(null);
    let e = [{ name : "Person0", age: 22, sex: "m", height: 75.0, sets: ["body_type - a little extra","diet - strictly anything","drinks - socially","drugs - never","orientation - straight","sex - m","smokes - sometimes"]},
             { name : "Person1", age: 22, sex: "m", height: 75.0, sets: ["body_type - average","diet - mostly other","drinks - often","drugs - sometimes","orientation - straight","sex - m","smokes - no"]},
             { name : "Person2", age: 22, sex: "m", height: 75.0, sets: ["body_type - average","diet - mostly anything","drinks - socially","drugs - never","orientation - straight","sex - f","smokes - no"]}]
    /*let e = [{ name : "Person0", sets: ["body_type - a little extra","diet - strictly anything","drinks - socially","drugs - never","orientation - straight","sex - m","smokes - sometimes","status - single","religion_type - agnosticism","job - transportation","sign_extracted - gemini","pets_cats - likes cats","pets_dogs - likes dogs","offspring_status - doesn't have kids","offspring_future - might want",]},
             { name : "Person1", sets: ["body_type - average","diet - mostly other","drinks - often","drugs - sometimes","orientation - straight","sex - m","smokes - no","status - single","religion_type - agnosticism","job - hospitality / travel","sign_extracted - cancer","pets_cats - likes cats","pets_dogs - likes dogs","offspring_status - doesn't have kids","offspring_future - might want",]},
             { name : "Person2", sets: ["body_type - average","diet - mostly anything","drinks - socially","drugs - never","orientation - straight","sex - f","smokes - no","status - single","religion_type - christianity","job - artistic / musical / writer","sign_extracted - sagittarius","pets_cats - likes cats","pets_dogs - likes dogs","offspring_status - doesn't have kids","offspring_future - wants",]}]
    /*let e = [{ asdf: 'A', sets: ['S1', 'S2', 'S3'] },
        { asdf: 'B', sets: ['S1'] },
        { asdf: 'C', sets: ['S2'] },
        { asdf: 'D', sets: ['S1', 'S3'] }]
    /*
    let e = [{ name: 'body-type', sets: ['average', 'average', 'average', 'average', 'thin', 'thin', 'thin', 'fit', 'jacked'] },
        { name: 'diet', sets: ['vegan', 'vegan', 'vegan', 'halal', 'kosher', 'mostly anything', 'mostly anything', 'mostly anything', 'mostly anything'] },
        { name: 'drugs', sets: ['never', 'never', 'never', 'never', 'never', 'never', 'never', 'never', 'never'] },
        { name: 'sex', sets: ['m', 'f', 'f', 'f', 'f', 'f', 'm', 'm', 'm'] }]*/
    /*let e = [{ name: 'person1', sets: ['average', 'vegan', 'never', 'm'] },
             { name: 'person2', sets: ['thin', 'vegan', 'sometimes', 'm'] },
             { name: 'person8', sets: ['thin', 'vegan', 'sometimes', 'm'] },
             { name: 'person3', sets: ['average', 'kosher', 'never', 'f'] },
             { name: 'person4', sets: ['jacked', 'mostly anything', 'never', 'm'] },
             { name: 'person5', sets: ['thin', 'mostly anything', 'occasionally', 'f'] },
             { name: 'person6', sets: ['average', 'mostly anything', 'never', 'm'] },
             { name: 'person7', sets: ['curvy', 'strikt diet', 'never', 'm'] }]*/
    return (
        <Container>
            <Stack gap={3}>
                <Row>
                    <Col>
                        <UpsetGraph title={"Up Set"} dataset={e} setHover={setHover} hover={hover} selection={selection} setSelection={setSelection} graph={"upset"} />
                    </Col>
                </Row>
                <Row>
                    <UpsetGraph title={"Venn Diagram"} dataset={e} selection={selection} setSelection={setSelection} graph={"venn"} />
                </Row>
                <Row>
                    <UpsetGraph title={"Karnaugh Map"} dataset={e} selection={selection} setSelection={setSelection} graph={"kar"} />
                </Row>
            </Stack>
        </Container>
    )

} export default DetailGraphGrid;
