import React, { Component } from "react";
import Chart from "react-apexcharts";
import {Card} from "react-bootstrap";

class ScatterComponent extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onZoom = this.onZoom.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.backgroundColor = "dark"
        this.state = {

            series: this.props.data,
            options: {
                chart: {
                    height: 350,
                    type: 'scatter',
                    zoom: {
                        enabled: true,
                        type: 'xy'
                    },
                    selection: {
                        enabled: true,
                        type: 'xy'
                    },
                    events: {
                        zoomed: this.onZoom,
                        dataPointSelection: this.onClick,
                        selection: this.onSelect
                    },
                    background: 'transparent'
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
                    tickAmount: 7
                },
            },


        };
    }

    onClick (e, chartContext, config){
        console.log(config)
        const dataPoint = this.props.data[config.seriesIndex].data[config.dataPointIndex]
        this.props.filter({series: config.seriesIndex, point: dataPoint, filerType: 'profile'});
    }
    onSelect (chartContext, { xaxis, yaxis }){
        console.log(xaxis.min)

        const min = [xaxis.min, yaxis.min]
        const max = [xaxis.max, yaxis.max]
        const categories = this.props.data.map(category => {
            return category.data.map(value => {
                if ((min[0] < value[0] && value[0] < max[0]) && (min[1] < value[1] && value[1] < max[1])){
                    return value
                }
            }).filter(obj => {if (obj) {return true;}return false;})
        })
        this.props.filter({data: categories, filerType: 'detail'})
    }
    onZoom (e, chartContext){
        let categories = undefined
        if (chartContext.xaxis.max !== undefined){
            const min = [chartContext.xaxis.min, chartContext.yaxis[0].min]
            const max = [chartContext.xaxis.max, chartContext.yaxis[0].max]
            categories = this.props.data.map(category => {
                return category.data.map(value => {
                    if ((min[0] < value[0] && value[0] < max[0]) && (min[1] < value[1] && value[1] < max[1])){
                        return value
                    }
                }).filter(obj => {if (obj) {return true;}return false;})
            })
        }
        this.props.filter({data: categories, filerType: 'detail'})
    }

    render() {
        return (
            <Card id="chart" bg={this.backgroundColor} style={{"color": "white", "padding": "1.5rem"}}>
                <Card.Body>
                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="scatter"
                    />
                </Card.Body>
            </Card>
        );
    }
} export default ScatterComponent;
