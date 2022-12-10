import {Component, React} from "react";
import {Card} from "react-bootstrap";
import Chart from "react-apexcharts";

class GeneralInformationComponent extends Component {

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.first = this.props.data.filter(e => e.Segment === "first")
        this.second = this.props.data.filter(e => e.Segment === "second")
        this.third = this.props.data.filter(e => e.Segment === "third")
        this.fourth = this.props.data.filter(e => e.Segment === "fourth")

        this.first = this.first.map(e => e.age)
        this.second = this.second.age
        this.third = this.third.age
        this.fourth = this.fourth.age

        this.first = this.first.reduce((acc, curr) => {
            acc[curr] ? acc[curr]++ : (acc[curr] = 1);
            return acc;
        }, {});

        this.skeet = Object.entries(this.first).map(e => {
            if (e[0] == this.props.you[0].value){
                console.log("here")
                return {x: e[0], y:e[1],
                    strokeColor: '#775DD0',
                    fillColor: '#775DD0',
                }
            }
            else {
                console.log("not here")
                return {x: e[0], y:e[1]}
            }
        })
        this.scat = [{
            name: 'First Group',
            data: this.skeet,
        }];
    }

    render() {
        const chartOptions = {
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    background: 'transparent',
                },
                theme: {
                    mode: "dark"
                },
            }
        }

        //segment // element // object entry
        return (
            <Card id="chart" bg={this.backgroundColor} style={{"color": "white", "padding": "1.5rem"}}>
                <Card.Header>
                    Age distribution across the all the entries
                </Card.Header>
                <Card.Body>
                    <Chart
                        options={chartOptions.options}
                        series={this.scat}
                        type={"bar"}
                    />
                </Card.Body>
            </Card>
        )
    }
} export default GeneralInformationComponent;