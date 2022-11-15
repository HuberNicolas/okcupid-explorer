import {Container, Row, Stack, Col} from 'react-bootstrap'
import {useState} from "react";
import UpsetGraph from "./UpsetGraph";

function DetailGraphGrid() {
    const [selection, setSelection] = useState(null);
        let e = [{ name: 'A', sets: ['S1', 'S2'] },
            { name: 'B', sets: ['S1'] },
            { name: 'C', sets: ['S2'] },
            { name: 'D', sets: ['S1', 'S3'] }]
        return (
            <Container>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <UpsetGraph title={"Up Set"} dataset={e} selection={selection} setSelection={setSelection} graph={"upset"} />
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
