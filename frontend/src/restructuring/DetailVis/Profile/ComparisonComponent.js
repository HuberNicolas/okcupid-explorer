import {Component, React} from "react";
import {Card,} from "react-bootstrap";
import Chart from "react-apexcharts";

class ComparisonComponent extends Component{

    constructor(props) {
        super(props);

        this.state = {

            series: this.props.data,
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
                    background: 'transparent'
                },
                theme: {
                    mode: "dark"
                },
                xaxis: {
                    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], //this should be the likert scale
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
                    series={this.state.series}
                    type={this.props.type}
                />
            </div>
        )
    }

}export default ComparisonComponent