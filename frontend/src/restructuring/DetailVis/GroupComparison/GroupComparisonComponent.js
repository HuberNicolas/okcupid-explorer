import {Component, React} from "react";
import Chart from "react-apexcharts";

class GroupComparisonComponent extends Component{


    render(){
        const chartOptions = {
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
                    categories: this.props.labels
                },
                yaxis: {
                    title: {
                        text: this.props.yaxis
                    }
                },
            },
        }
        return (
            <div id="profile" style={{"color": "white"}}>
                <Chart
                    options={chartOptions.options}
                    series={this.props.data}
                    type={this.props.type}
                />
            </div>
        )
    }

}export default GroupComparisonComponent