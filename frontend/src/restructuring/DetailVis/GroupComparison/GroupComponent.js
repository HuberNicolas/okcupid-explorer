import {Component, React} from "react";
import {Card, Tab, Tabs,} from "react-bootstrap";
import { ReactComponent as Profile } from './groupProfile.svg'
import ComparisonComponent from "./GroupComparisonComponent";
import categories from "../../Form/fields.json"

class GroupComponent extends Component{

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.state = {
            eventKey: "absolute"
        }

    }

    render(){

        //segment // element // object entry
        return (
            <div id="profile" style={{"color": "white"}}>
                <Card bg={this.backgroundColor}>
                    <Card.Header>
                        <Profile className="profilePic"  />
                        <span style={{float: "right"}} onClick={e => this.props.frameSize({filerType: 'close'})}>X</span>
                    </Card.Header>
                    <Card.Body >
                        <Tabs
                            defaultActiveKey="absolute"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="absolute" title="Absolute Numbers">
                                {this.props.filter.map(filteredItem => {
                                    const category = categories.filter(e => e.id == filteredItem)[0]

                                    const first = this.props.selected.data[0].map(e => e[2][filteredItem])
                                    const second = this.props.selected.data[1].map(e => e[2][filteredItem])
                                    const third = this.props.selected.data[2].map(e => e[2][filteredItem])
                                    const fourth = this.props.selected.data[3].map(e => e[2][filteredItem])
                                    /**
                                     * for each category map the values from groups
                                     */
                                    let f1 = []
                                    let f2 = []
                                    let f3 = []
                                    let f4 = []
                                    category.options.forEach(cat => f1.push(first.filter(e => e === cat).length))
                                    category.options.forEach(cat => f2.push(second.filter(e => e === cat).length))
                                    category.options.forEach(cat => f3.push(third.filter(e => e === cat).length))
                                    category.options.forEach(cat => f4.push(fourth.filter(e => e === cat).length))

                                    const scat = [{
                                        name: 'First Group',
                                        data: f1,
                                    }, {
                                        name: 'Second Group',
                                        data: f2,
                                    }, {
                                        name: 'Third Group',
                                        data: f3,
                                    }, {
                                        name: 'Fourth Group',
                                        data: f4,
                                    }];
                                    return (
                                        <div key={filteredItem}>
                                            <div><h3>In-depth comparison on your selected group: {filteredItem}</h3></div>
                                            <ComparisonComponent data={scat} type={"bar"} labels={category.options}
                                                                 yaxis={'Absolute Value Distribution'}/>
                                        </div>
                                    )
                                })}
                            </Tab>
                            <Tab eventKey="relative" title="Comparison">
                                {
                                    this.props.filter.map(filteredItem => {
                                        const category = categories.filter(e => e.id == filteredItem)[0]

                                        const first = this.props.selected.data[0].map(e => e[2][filteredItem])
                                        const second = this.props.selected.data[1].map(e => e[2][filteredItem])
                                        const third = this.props.selected.data[2].map(e => e[2][filteredItem])
                                        const fourth = this.props.selected.data[3].map(e => e[2][filteredItem])
                                        /**
                                         * for each category map the values from groups
                                         */
                                        let f1 = []
                                        let f2 = []
                                        let f3 = []
                                        let f4 = []
                                        category.options.forEach(cat => f1.push(first.filter(e => e === cat).length))
                                        category.options.forEach(cat => f2.push(second.filter(e => e === cat).length))
                                        category.options.forEach(cat => f3.push(third.filter(e => e === cat).length))
                                        category.options.forEach(cat => f4.push(fourth.filter(e => e === cat).length))

                                        const cumulativeSum = (sum => value => sum += value)(0);
                                        const f1_cum = f1.map(cumulativeSum)
                                        const cumulativeSum2 = (sum => value => sum += value)(0);
                                        const f2_cum = f2.map(cumulativeSum2)
                                        const cumulativeSum3 = (sum => value => sum += value)(0);
                                        const f3_cum = f3.map(cumulativeSum3)
                                        const cumulativeSum4 = (sum => value => sum += value)(0);
                                        const f4_cum = f4.map(cumulativeSum4)
                                        f1 = f1.map((e,i) => e/f1_cum[f1_cum.length-1]*100)
                                        f2 = f2.map((e,i) => e/f2_cum[f2_cum.length-1]*100)
                                        f3 = f3.map((e,i) => e/f3_cum[f3_cum.length-1]*100)
                                        f4 = f4.map((e,i) => e/f4_cum[f4_cum.length-1]*100)
                                        const scat = [{
                                            name: 'First Group',
                                            data: f1,
                                        }, {
                                            name: 'Second Group',
                                            data: f2,
                                        }, {
                                            name: 'Third Group',
                                            data: f3,
                                        }, {
                                            name: 'Fourth Group',
                                            data: f4,
                                        }];
                                        return (
                                            <div key={filteredItem}>
                                                <div><h3>In-depth comparison on your selected group: {filteredItem}</h3></div>
                                                <ComparisonComponent data={scat} type={"bar"} labels={category.options}
                                                                     yaxis={'Relative Value Distribution'}/>
                                            </div>
                                        )
                                    })
                                }
                            </Tab>
                        </Tabs>
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