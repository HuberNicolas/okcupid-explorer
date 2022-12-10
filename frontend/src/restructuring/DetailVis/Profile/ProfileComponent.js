import {Component, React} from "react";
import {Card,} from "react-bootstrap";
import { ReactComponent as Profile } from './profile.svg'
import ComparisonComponent from "./ComparisonComponent";

class ProfileComponent extends Component{

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.selected = this.props.selected;
        this.you = this.props.you[2];
        this.filter = this.props.filter;
    }


    /**
     * route: normalisierter  user input => für den vergleich im radar
     * route: get_one from std => für den vergelich im radar
     *
     * questionary requirement:
     * modus: 0,1 => similarity / dissimilariy
     * similarity_score: 0-1 => threshold
     * {
     *     modus: 0,
     *     similarity_score: 0.75
     *     data: {}
     * }
     *
     */


    render(){
        this.data = [
            {
                name: 'You',
                data: Object.entries(this.props.you).filter(e => this.props.filter.includes(e[0])).map(e => e[1])
            },{
                name: 'Comparison',
                data: Object.entries(this.props.selected[0]).filter(e => this.props.filter.includes(e[0])).map(e => e[1])
            },
        ]
        let filter = Object.entries(this.props.selected[0]).filter(e => this.props.filter.includes(e[0])).map(e => e[0])
        /**
         * backend call => get numerical values for this guy
         */

        return (
            <div id="profile" style={{"color": "white"}}>
                <Card bg={this.backgroundColor}>
                    <Card.Header>
                        <Profile className="profilePic"  />
                        <span style={{float: "right"}} onClick={this.props.frameSize}>X</span>
                    </Card.Header>
                    <Card.Body >
                        {/*this.props.filter.map(filteredItem => {
                            this.data = [
                                {
                                    name: 'You',
                                    data: [this.props.you[2][filteredItem]]
                                },{
                                    name: 'Comparison',
                                    data: [this.props.selected.point[2][filteredItem]]
                                },
                            ]
                            return(
                                <div key={filteredItem}>
                                    <span>Comparison of {filteredItem}</span>
                                    <ComparisonComponent data={this.data} type={"bar"} label={filteredItem} />
                                </div>
                                )
                        })*/}
                        <ComparisonComponent data={this.data} type={"radar"} label={filter} />
                    </Card.Body>
                </Card>


            </div>
        )
    }

}export default ProfileComponent