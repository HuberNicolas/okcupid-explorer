import {Component, React} from "react";
import {Card,} from "react-bootstrap";
import { ReactComponent as Profile } from './groupProfile.svg'
import ComparisonComponent from "./GroupComparisonComponent";
import scatterData2 from "../../ScatterVis/test5.json";
import categories from "../../Form/fields.json"

class GroupComponent extends Component{

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
    }

    render(){
        //segment // element // object entry
        console.log(this.props.selected.data[1].map(e => e[2]['age']));
        return (
            <div id="profile" style={{"color": "white"}}>
                <Card bg={this.backgroundColor}>
                    <Card.Header>
                        <Profile className="profilePic"  />

                    </Card.Header>
                    <Card.Body >
                        {this.props.filter.map(filteredItem => {
                            const category = categories.filter(e => e.id==filteredItem)[0]
                            console.log(category)

                            const first = this.props.selected.data[0].map(e => e[2][filteredItem])
                            const second = this.props.selected.data[1].map(e => e[2][filteredItem])
                            const third = this.props.selected.data[2].map(e => e[2][filteredItem])
                            const fourth = this.props.selected.data[3].map(e => e[2][filteredItem])
                            /**
                             * for each category map the values from groups
                             */
                            const f1 = []
                            const f2 = []
                            const f3 = []
                            const f4 = []
                            category.options.forEach(cat => f1.push(first.filter(e => e === cat).length))
                            category.options.forEach(cat => f2.push(second.filter(e => e === cat).length))
                            category.options.forEach(cat => f3.push(third.filter(e => e === cat).length))
                            category.options.forEach(cat => f4.push(fourth.filter(e => e === cat).length))

                            console.log(f1)
                            console.log(f2)
                            console.log(f3)
                            console.log(f4)

                            const scat = [{
                                name: 'First Group',
                                data: f1,
                            },{
                                name: 'Second Group',
                                data: f2,
                            },{
                                name: 'Third Group',
                                data: f3,
                            },{
                                name: 'Fourth Group',
                                data: f4,
                            }];
                            return(
                                <div key={filteredItem}>
                                    <ComparisonComponent data={scat} type={"bar"} labels={category.options} />
                                </div>
                            )
                            })
                        }
                        {/*this.props.filter.map(filteredItem => {
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
                        })*/}
                    </Card.Body>
                </Card>


            </div>
        )
    }

}export default GroupComponent