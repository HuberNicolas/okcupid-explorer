import {Component, React} from "react";
import {Col, Row} from "react-bootstrap";
import ScatterComponent from "./ScatterVis/ScatterComponent";
import scatterData2 from "./ScatterVis/test6.json";
import ProfileComponent from "./DetailVis/Profile/ProfileComponent";
import GroupComponent from "./DetailVis/GroupComparison/GroupComponent";

/**
 * how was a vis prooblem reframed as an ml problem:
 * what separation measures could be used other than centroid
 * what do we mean by finding the good views
 * what personal experiences have you had with ml4vis
 */

class PlotComponent extends Component{
    constructor(props) {
        super(props);
        const first = scatterData2.map(e => {if (e.Segment === 'first') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj})
        const second = scatterData2.map(e => {if (e.Segment === 'second') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj})
        const third = scatterData2.map(e => {if (e.Segment === 'third') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj})
        const fourth = scatterData2.map(e => {if (e.Segment === null || e.Segment === undefined) return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj})
        const scat = [{
            name: 'First Group',
            data: first,
        },{
            name: 'Second Group',
            data: second,
        },{
            name: 'Third Group',
            data: third,
        },{
            name: 'Fourth Group',
            data: fourth,
        }];
        this.state = {
            data: scat,
            you: fourth,
            scatterFilter: '',
            scatterProfile: ''
        }
    }

    filter(element){
        if (element.filerType === "profile"){
            this.setState({scatterProfile : element})
            this.setState({scatterFilter : ''})
        } else {
            this.setState({scatterFilter : element})
            this.setState({scatterProfile : ''})
        }
    }

    render(){
        return (
            <Row>
                <Col xs lg="9">
                    {/*scatter plot with questionaire filter -> supply data from here, filter in function */}

                        <ScatterComponent data={this.state.data} filter={this.filter.bind(this)} />
                </Col>
                <Col xs lg="3">
                    {this.state.scatterFilter &&
                        <GroupComponent you={this.state.you[0]} selected={this.state.scatterFilter} filter={this.props.filter} questionary={this.props.questionary} />
                    }
                    {this.state.scatterProfile &&
                        <ProfileComponent you={this.state.you[0]} selected={this.state.scatterProfile} filter={this.props.filter} questionary={this.props.questionary}/>
                    }
                </Col>
            </Row>
        )
    }
}export default PlotComponent;