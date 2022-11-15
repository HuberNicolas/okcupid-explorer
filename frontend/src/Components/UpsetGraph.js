import { extractCombinations, UpSetJS, VennDiagram, KarnaughMap } from '@upsetjs/react';
import {useMemo, useState} from 'react';
import {Card, Col, Container, Row, Stack} from 'react-bootstrap'
import cleansedData from '../df_cleansed.json'
import FormCard from "./FormCard";

function UpsetGraph() {
    console.log(cleansedData.age["72"])
    const elems = useMemo(
        () => [
            { name: 'A', sets: ['S1', 'S2'] },
            { name: 'B', sets: ['S1'] },
            { name: 'C', sets: ['S2'] },
            { name: 'D', sets: ['S1', 'S3'] },
        ],
        []
    );
    const backgroundColor = "dark"
    const title = "Upset"
    const cardHeaderStyle = {
        color: "white"
    }

    const { sets, combinations } = useMemo(() => extractCombinations(elems), [elems]);
    const [selection, setSelection] = useState(null);

    return (
        <Container>
            <Stack gap={3}>
                <Row>
                    <Col>
                        <Card bg={backgroundColor}>
                            <Card.Header style={cardHeaderStyle}>{title}</Card.Header>
                            <Card.Body>

                                <UpSetJS
                                    sets={sets}
                                    combinations={combinations}
                                    width={780} height={400}
                                    selection={selection}
                                    onHover={setSelection}
                                    theme={backgroundColor}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card bg={backgroundColor}>
                            <Card.Header style={cardHeaderStyle}>{title}</Card.Header>
                            <Card.Body>

                                <VennDiagram
                                    sets={sets}
                                    width={780} height={400}
                                    selection={selection}
                                    onHover={setSelection}
                                    theme={backgroundColor}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card bg={backgroundColor}>
                            <Card.Header style={cardHeaderStyle}>{title}</Card.Header>
                            <Card.Body>

                                <KarnaughMap
                                    sets={sets}
                                    width={780} height={400}
                                    selection={selection}
                                    onHover={setSelection}
                                    theme={backgroundColor}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Stack>
        </Container>

        )
} export default UpsetGraph;