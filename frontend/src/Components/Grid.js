import {Container, Row, Stack, Col} from 'react-bootstrap'
import {Component} from "react";
import FormCard from "./FormCard";
import DetailGraphGrid from "./DetailGraphGrid";

class Grid extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Stack gap={3}>
                    <Row>
                        <Col>
                            <DetailGraphGrid filter={this.props.filter}/>
                        </Col>
                        <Col>
                            {/*insert the scatterplots here*/}

                            <FormCard title={"Attribute definition"} />
                        </Col>
                    </Row>
                </Stack>
            </Container>
        )
    }
} export default Grid;