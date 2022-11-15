import {Container, Row, Stack, Col} from 'react-bootstrap'
import {Component} from "react";
import FormCard from "./FormCard";

class Grid extends Component {

    render() {
        return (
            <Container>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            {/* insert the scatterplot graph here*/}
                        </Col>
                    </Row>
                    <Row>
                        <FormCard title={"Attribute definition"} />
                    </Row>
                </Stack>
            </Container>
        )
    }
} export default Grid;