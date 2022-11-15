import {Card, Button, Form} from 'react-bootstrap'
import {Component} from "react";

class FormCard extends Component {
    constructor(props) {
        super(props);
        this.title="Form"
        this.backgroundColor = "dark"
    }

    itemSelected(){
        console.log("item selected")
    }

    submit(){
        console.log("submitted")
    }

    render(){
        const cardHeaderStyle = {
            color: "white"
        }

        const dropDownStyle = {
            border: "0.1rem solid"
        }
        return (
            <div>
                {
                    <Card bg={this.backgroundColor}>
                        <Card.Header style={cardHeaderStyle}>{this.title}</Card.Header>
                        <Card.Body>
                            <Form.Select aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            <Button onClick={this.submit()}>Submit something</Button>
                        </Card.Body>
                    </Card>
                }
            </div>
        )
    }
}
export default FormCard;