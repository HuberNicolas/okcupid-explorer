import {Component, React} from "react";
import {Button, Card} from "react-bootstrap";

/**
 * how was a vis prooblem reframed as an ml problem:
 * what separation measures could be used other than centroid
 * what do we mean by finding the good views
 * what personal experiences have you had with ml4vis
 */

class FilterResetComponent extends Component{
    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.superCrazyFilter = this.superCrazyFilter.bind(this)
    }

    superCrazyFilter(){
        this.props.superCrazyFilter();
    }

    render(){
        return (

            <Card id="chart" bg={this.backgroundColor} style={{"color": "white", "padding": "1.5rem"}}>
                <Card.Header>
                    Reset your chart filters
                </Card.Header>
                <Card.Body>
                    <Button onClick={this.superCrazyFilter}>Reset now</Button>
                </Card.Body>
            </Card>
        )
    }
}export default FilterResetComponent;