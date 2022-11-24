import {Container, Row, Stack, Col, Card, Button} from 'react-bootstrap'
import {Component} from "react";
import FormCard from "./FormCard";
import DetailGraphGrid from "./DetailGraphGrid";
import NetworkGraph from "./NetworkGraph/NetworkGraph";
import Element from "./Form/Element";

class Grid extends Component {

    render() {
        return (
            <Container>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <Card bg={'light'}>
                                <Card.Header >Graph</Card.Header>
                                <Card.Body >
                                    <NetworkGraph />
                                </Card.Body>
                            </Card>

                        </Col>
                    </Row>
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