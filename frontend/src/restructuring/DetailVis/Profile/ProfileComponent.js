import {Component, React} from "react";
import {Card,} from "react-bootstrap";
import { ReactComponent as Profile } from './profile.svg'
import ComparisonComponent from "./ComparisonComponent";

class ProfileComponent extends Component{

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.selected = this.props.selected.point[2];
        this.you = this.props.you[2];
        this.filter = this.props.filter;
    }

    render(){
        return (
            <div id="profile" style={{"color": "white"}}>
                <Card bg={this.backgroundColor}>
                    <Card.Header>
                        <Profile className="profilePic"  />

                    </Card.Header>
                    <Card.Body >
                        {this.props.filter.map(filteredItem => {
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
                                    <ComparisonComponent data={this.data} type={"bar"} />
                                </div>
                                )
                        })}
                    </Card.Body>
                </Card>


            </div>
        )
    }

}export default ProfileComponent