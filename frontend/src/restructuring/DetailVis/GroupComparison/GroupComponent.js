import {Component, React} from "react";
import {Card,} from "react-bootstrap";
import { ReactComponent as Profile } from './groupProfile.svg'
import ComparisonComponent from "./GroupComparisonComponent";
import scatterData2 from "../../ScatterVis/test5.json";

class GroupComponent extends Component{

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
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
                            if (this.props.selected !== undefined){
                                this.data = this.props.selected.data.map(category => {
                                    return category.map(element => {
                                        return element[2][filteredItem]
                                    })
                                })
                            } else {
                                this.data = []
                            }
                            let scat = [{
                                name: 'Fourth Group',
                                data: this.data[0],
                            },{
                                name: 'First Group',
                                data: this.data[1],
                            },{
                                name: 'Second Group',
                                data: this.data[2],
                            },{
                                name: 'Third Group',
                                data: this.data[3],
                            }];
                            return(
                                <div key={filteredItem}>
                                    <ComparisonComponent data={scat} type={"scatter"} />
                                </div>
                                )
                        })}
                    </Card.Body>
                </Card>


            </div>
        )
    }

}export default GroupComponent