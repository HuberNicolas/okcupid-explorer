import {Container, Row, Stack, Col} from 'react-bootstrap'
import {useState} from "react";
import UpsetGraph from "./UpsetGraph";
import data from '../data/data_file.json'

function DetailGraphGrid({filter}) {
    const [hover, setHover] = useState(null);
    const [selection, setSelection] = useState(null);
    const filteredData = filteredDataFromJson();

    function filteredDataFromJson() {
        let fD = []
        data.forEach(e => {
            let obj = {}
            obj['name'] = e.name;
            obj.age = e.age;
            obj.height = e.height;
            let arr = [];
            e.sets.forEach(item => {
                filter.forEach(f => {
                    if (item.includes(f)){
                        arr.push(item);
                    }
                });
            });
            obj.sets = arr;
            fD.push(obj);
        });
        return fD;
    }
    return (
        <Container>
            <Stack gap={3}>
                <Row>
                    <Col>
                        <UpsetGraph title={"Up Set"} dataset={filteredData} setHover={setHover} hover={hover} selection={selection} setSelection={setSelection} graph={"upset"} />
                    </Col>
                </Row>
                {/*}
                <Row>
                    <UpsetGraph title={"Venn Diagram"} dataset={filteredData} selection={selection} setSelection={setSelection} graph={"venn"} />
                </Row>
                <Row>
                    <UpsetGraph title={"Karnaugh Map"} dataset={filteredData} selection={selection} setSelection={setSelection} graph={"kar"} />
                </Row>*/}
            </Stack>
        </Container>
    )

} export default DetailGraphGrid;
