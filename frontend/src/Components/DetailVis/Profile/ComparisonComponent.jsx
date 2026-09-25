import {Component, React} from "react";
import Chart from "../../../Chart";

class ComparisonComponent extends Component{
    state = {options: {}}
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        const chartOptions = {
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
                    categories: this.props.label, //this should be the likert scale
                },
                yaxis: {
                    categories: this.props.yaxis,
                },
            }
        }
        return (
            <div id="profile" style={{"color": "white"}}>
                <h6>In-depth comparison on your selected person</h6>
                <Chart
                    options={chartOptions.options}
                    series={this.props.data}
                    type={this.props.type}
                />
            </div>
        )
    }

}export default ComparisonComponent