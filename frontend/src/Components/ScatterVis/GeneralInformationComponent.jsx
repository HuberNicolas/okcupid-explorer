import {Component, React} from "react";
import {Card} from "react-bootstrap";
import Chart from "../../Chart";

class GeneralInformationComponent extends Component {

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.superCrazyFilter = this.superCrazyFilter.bind(this)
    }

    superCrazyFilter(event, chartContext, config, key){
        const {data} = chartContext
        const {dataPointIndex} = config
        const {w} = config;
        const {globals} = w
        const {twoDSeriesX} = data
        const f = twoDSeriesX[dataPointIndex]
        this.props.superCrazyFilter(f, globals.chartID);
    }

    render() {
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
        const chartOptions = {
            options: {
                chart: {
                    id: 'age',
                    height: 350,
                    type: 'treemap',
                    background: 'transparent',
                    events: {
                        dataPointSelection: this.superCrazyFilter
                    }
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
            <Card id="chart" bg={this.backgroundColor} style={{"color": "white", "padding": "1.5rem", "marginTop": "1rem"}}>
                <Card.Header className={"bg-danger"}>
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