import {Component, React} from "react";
import {Card} from "react-bootstrap";
import Chart from "react-apexcharts";

class GeneralInformationComponent extends Component {

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"


        this.first = this.props.data.map(e => e.age)

        this.first = this.first.reduce((acc, curr) => {
            acc[curr] ? acc[curr]++ : (acc[curr] = 1);
            return acc;
        }, {});

        this.skeet = Object.entries(this.first).map(e => {
            if (e[0] == this.props.you[0].value){
                return {x: e[0], y:e[1],
                    strokeColor: '#775DD0',
                    fillColor: '#775DD0',
                }
            }
            else {
                return {x: e[0], y:e[1]}
            }
        })
        this.scat = [{
            name: 'Number of people with this age',
            data: this.skeet,
        }];

        console.log(this.scat)
    }

    render() {
        const chartOptions = {
            options: {
                chart: {
                    height: 350,
                    type: 'treemap',
                    background: 'transparent',
                },
                theme: {
                    mode: "dark"
                },
                zoom: {
                    enabled: true,
                    type: 'xy',
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