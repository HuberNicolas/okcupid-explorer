import { extractCombinations, UpSetJS, VennDiagram, KarnaughMap } from '@upsetjs/react';
import {useMemo} from 'react';
import {Card, Col, Container, Row, Stack} from 'react-bootstrap'

function UpsetGraph(props) {
    const elems = useMemo(
        () => props.dataset, []
    );
    const backgroundColor = "dark"
    const cardHeaderStyle = {
        color: "white"
    }

    const { sets, combinations } = useMemo(() => extractCombinations(elems), [elems]);

    return (
        <Container>
            <Stack gap={3}>
                <Row>
                    <Col>
                        <Card bg={backgroundColor}>
                            <Card.Header style={cardHeaderStyle}>{props.title}</Card.Header>
                            <Card.Body>
                                {props.graph === "upset" &&
                                <UpSetJS
                                    sets={sets}
                                    combinations={combinations}
                                    width={780} height={400}
                                    selection={props.selection}
                                    onHover={props.setHover}
                                    onClick={props.setSelection}
                                    theme={backgroundColor}
                                />}
                                {props.graph === "venn" &&
                                    <VennDiagram
                                        sets={sets}
                                        combinations={combinations}
                                        width={780} height={400}
                                        selection={props.selection}
                                        onHover={props.setHover}
                                        onClick={props.setSelection}
                                        theme={backgroundColor}
                                    />}
                                {props.graph === "kar" &&
                                    <KarnaughMap
                                        sets={sets}
                                        combinations={combinations}
                                        width={780} height={400}
                                        selection={props.selection}
                                        onHover={props.setHover}
                                        onClick={props.setSelection}
                                        theme={backgroundColor}
                                    />}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Stack>
        </Container>

        )
} export default UpsetGraph;
