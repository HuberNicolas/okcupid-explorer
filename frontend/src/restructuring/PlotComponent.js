import {Component, React} from "react";
import {Col, Row} from "react-bootstrap";
import ScatterComponent from "./ScatterVis/ScatterComponent";
import ProfileComponent from "./DetailVis/Profile/ProfileComponent";
import GroupComponent from "./DetailVis/GroupComparison/GroupComponent";
import GeneralInformationComponent from "./ScatterVis/GeneralInformationComponent";
import axios from "axios";
import GeneralInformationFilterComponent from "./ScatterVis/GeneralInformationFilterComponent";
import GeneralInformationAgeComponent from "./ScatterVis/GeneralInformationAgeComponent";

/**
 * how was a vis prooblem reframed as an ml problem:
 * what separation measures could be used other than centroid
 * what do we mean by finding the good views
 * what personal experiences have you had with ml4vis
 */

class PlotComponent extends Component{
    constructor(props) {
        super(props);

        const scat = [{
            name: 'First Group',
            data: this.props.data.map(e => {if (e.Segment === 'first') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj}),
        },{
            name: 'Second Group',
            data: this.props.data.map(e => {if (e.Segment === 'second') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj}),
        },{
            name: 'Third Group',
            data: this.props.data.map(e => {if (e.Segment === 'third') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj}),
        },{
            name: 'Fourth Group',
            data: this.props.data.map(e => {if (e.Segment === 'fourth') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj}),
        }];
        this.state = {
            data: scat,
            standardizedUsers: this.props.standardDeviationData,
            you: this.props.standardizedYou,
            scatterFilter: '',
            scatterProfile: '',
            frameSize: {scatter: "9", detail: "3"}
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.data !== this.props.data){
            const scat = [{
                name: 'First Group',
                data: this.props.data.map(e => {if (e.Segment === 'first') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj}),
            },{
                name: 'Second Group',
                data: this.props.data.map(e => {if (e.Segment === 'second') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj}),
            },{
                name: 'Third Group',
                data: this.props.data.map(e => {if (e.Segment === 'third') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj}),
            },{
                name: 'Fourth Group',
                data: this.props.data.map(e => {if (e.Segment === 'fourth') return [e['PComp 1'], e['PComp 2'], e];}).filter(obj => {if (obj) return obj}),
            }];
            this.setState({data: scat})
        }
    }

    frameResize(element){
        let {filerType} = element
        if(filerType === "detail")
            this.setState({frameSize: {scatter: "4", detail: "8"}})
        else
            this.setState({frameSize: {scatter: "9", detail: "3"}})

    }

    filter(element){
        if (element.filerType === "profile"){
            const config = {
                headers: {'Access-Control-Allow-Origin': '*'}
            };

            axios.post('http://127.0.0.1:5000/api/post/user/std/radar', {"data": element.point[2]}, config).then((e) => {
                this.setState({scatterProfile : e.data})
            });

            this.setState({scatterFilter : ''})
        } else {
            this.setState({scatterFilter : element})
            this.setState({scatterProfile : ''})
        }
    }

    render(){
        return (
            <Row>
                <Col xs lg={this.state.frameSize.scatter}>
                    {/*scatter plot with questionaire filter -> supply data from here, filter in function */}
                        <ScatterComponent data={this.state.data} filter={this.filter.bind(this)} frameSize={this.frameResize.bind(this)} />
                        <GeneralInformationComponent filter={this.props.filter} you={this.props.you} data={this.props.data} />
                        <GeneralInformationAgeComponent filter={this.props.filter} you={this.props.you} data={this.props.data} />
                        <GeneralInformationFilterComponent filter={this.props.filter} you={this.props.you} data={this.props.data} />
                </Col>
                <Col xs lg={this.state.frameSize.detail}>
                    {this.state.scatterFilter &&
                        <GroupComponent you={this.state.you[0]} selected={this.state.scatterFilter} filter={this.props.filter} questionary={this.props.questionary} frameSize={this.frameResize.bind(this)} />
                    }
                    {this.state.scatterProfile &&
                        <ProfileComponent you={this.state.you[0]} selected={this.state.scatterProfile} filter={this.props.filter} questionary={this.props.questionary} frameSize={this.frameResize.bind(this)} />
                    }
                </Col>
            </Row>
        )
    }
}export default PlotComponent;