import {Component, React} from "react";
import {Card,} from "react-bootstrap";
import { ReactComponent as Profile } from './profile.svg'
import ComparisonComponent from "./ComparisonComponent";
import axios from "axios";

class ProfileComponent extends Component{

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.selected = this.props.selected.point[2];
        this.you = this.props.you[2];
        this.filter = this.props.filter;
    }

    render(){
        const config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };

        axios.get(`http://127.0.0.1:5000/api/dev/list?id=${this.props.selected.point[2].index}`, config).then((e) => {
            this.comparisonData = Object.entries(e.data[0]).filter(q => this.props.filter.includes(q[0])).map(q => q[1])
        });

        console.log(this.comparisonData)
        this.data = [
            {
                name: 'You',
                data: Object.entries(this.props.you[2]).filter(e => this.props.filter.includes(e[0])).map(e => e[1])
            },{
                name: 'Comparison',
                data: this.comparisonData
            },
        ]
        /**
         * backend call => get numerical values for this guy
         */

        console.log(this.props.you[2])
        return (
            <div id="profile" style={{"color": "white"}}>
                <Card bg={this.backgroundColor}>
                    <Card.Header>
                        <Profile className="profilePic"  />

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
                        <ComparisonComponent data={this.data} type={"radar"} label={this.props.filter} />
                    </Card.Body>
                </Card>


            </div>
        )
    }

}export default ProfileComponent