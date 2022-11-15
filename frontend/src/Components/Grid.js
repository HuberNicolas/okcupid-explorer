import {Container, Row, Stack, Col} from 'react-bootstrap'
import {Component} from "react";
import FormCard from "./FormCard";
import DetailGraphGrid from "./DetailGraphGrid";

class Grid extends Component {


    render() {
        return (
            <Container>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <DetailGraphGrid />
                        </Col>
                        <Col>
                            {/*insert the scatterplots here*/}

                            <FormCard/>
                        </Col>
                    </Row>
                </Stack>
            </Container>
        )
    }
} export default Grid;