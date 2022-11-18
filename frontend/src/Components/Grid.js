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
                            <DetailGraphGrid filter={this.props.filter}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*insert the scatterplots here*/}
                        </Col>
                        <Col>
                            <FormCard title={"Attribute definition"} />
                        </Col>
                    </Row>
                </Stack>
            </Container>
        )
    }
} export default Grid;