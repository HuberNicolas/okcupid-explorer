import {Component, React} from "react";
import {Card} from "react-bootstrap";
import Chart from "react-apexcharts";

class GeneralInformationFilterComponent extends Component {

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.data = {}
        this.chartOptions = {}
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
        this.props.filter.forEach(f => this.data[f] = this.props.data.map(e => e[f]))

        this.scat = {}
        Object.entries(this.data).forEach(element => {

            this.data[element[0]] = this.props.data.map(e => e[element[0]])
            this.data[element[0]] = this.data[element[0]].reduce((acc, curr) => {
                acc[curr] ? acc[curr]++ : (acc[curr] = 1);
                return acc;
            }, {});

            this.skeet = Object.entries(this.data[element[0]]).map(e => {
                if (e[0] == this.props.you.filter(x => x.id === element[0])[0].value) {
                    return {
                        x: e[0], y: e[1],
                        strokeColor: '#775DD0',
                        fillColor: '#775DD0',
                    }
                } else {
                    return {x: e[0], y: e[1]}
                }
            })
            this.scat[element[0]] = [{
                name: 'Distribution of ' + element[0] + 'across all the people',
                data: this.skeet,
            }];

            this.chartOptions[element[0]] = {
                options: {
                    chart: {
                        id: element[0],
                        height: 350,
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
        })

        //segment // element // object entry
        return (
            <div>
                {Object.entries(this.scat).map(entry => {
                   return (
                       <Card id="chart" bg={this.backgroundColor} style={{"color": "white", "padding": "1.5rem"}}>
                           <Card.Header>
                               {entry[0]} distribution across the all the entries
                           </Card.Header>
                           <Card.Body>
                            <Chart
                                options={this.chartOptions[entry[0]].options}
                                key={entry[0]}
                                series={entry[1]}
                                type={"bar"}
                                id={"mio charto"}
                            />
                           </Card.Body>
                       </Card>
                   )
                })}
            </div>
        )
    }
} export default GeneralInformationFilterComponent;