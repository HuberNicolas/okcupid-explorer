import {Component, React} from "react";
import {Card} from "react-bootstrap";
import Chart from "react-apexcharts";

class GeneralInformationFilterComponent extends Component {

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.data = {}
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
                if (e[0] == this.props.you.filter(x => x.id === element[0])[0].value){
                    return {x: e[0], y:e[1],
                        strokeColor: '#775DD0',
                        fillColor: '#775DD0',
                    }
                }
                else {
                    return {x: e[0], y:e[1]}
                }
            })
            this.scat[element[0]] = [{
                name: 'Distribution of ' + element[0] + 'across all the people',
                data: this.skeet,
            }];
        })

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
            <div>
                {Object.entries(this.scat).map(entry => {
                   return (
                       <Card id="chart" bg={this.backgroundColor} style={{"color": "white", "padding": "1.5rem"}}>
                           <Card.Header>
                               {entry[0]} distribution across the all the entries
                           </Card.Header>
                           <Card.Body>
                            <Chart
                                options={chartOptions.options}
                                series={entry[1]}
                                type={"bar"}
                            />
                           </Card.Body>
                       </Card>
                   )
                })}
            </div>
        )
    }
} export default GeneralInformationFilterComponent;