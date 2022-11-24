import {Component, React} from "react";
import {Card,} from "react-bootstrap";
import Chart from "react-apexcharts";

class GroupComparisonComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {
            /**
             * {name: 'You',
             *           data: [44, 55, 57, 56, 61, 58, 63, 60, 66]}
             *           {name: 'Comparison',
             *           data: [4,5,5,3,3,3,3,3,3]}
             */
            options: {
                chart: {
                    height: 350,
                    type: this.props.type,
                    background: 'transparent',
                    zoom: {
                        enabled: true,
                        type: 'xy'
                    },
                },
                theme: {
                    mode: "dark"
                },
                xaxis: {
                    tickAmount: 10,
                    labels: {
                        formatter: function(val) {
                            return parseFloat(val).toFixed(1)
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Normalized Value'
                    }
                },
            },
        };
    }

    render(){
        return (
            <div id="profile" style={{"color": "white"}}>
                <Chart
                    options={this.state.options}
                    series={this.props.data}
                    type={this.props.type}
                />
            </div>
        )
    }

}export default GroupComparisonComponent