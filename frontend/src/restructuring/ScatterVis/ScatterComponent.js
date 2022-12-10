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
            options: {
                chart: {
                    height: 350,
                    type: 'scatter',
                    zoom: {
                        enabled: true,
                        type: 'xy',
                        zoomedArea: {
                            fill: {
                                color: '#90CAF9',
                                opacity: 0.4
                            },
                            stroke: {
                                color: '#0D47A1',
                                opacity: 0.4,
                                width: 1
                            }
                        }
                    },
                    /*
                    zoom: {
                        enabled: true,
                        type: 'xy',
                        autoScaleYaxis: true,
                    },*/
                    selection: {
                        enabled: true,
                        type: 'xy',
                        fill: {
                            color: '#fff',
                            opacity: 0.1
                        },
                        stroke: {
                            width: 1,
                            dashArray: 3,
                            color: '#fff',
                            opacity: 0.4
                        },
                    },
                    events: {
                        /*beforeZoom: (e, data) => {
                            console.log(data,'**')
                            return {
                                xaxis: {
                                    min: -15,
                                    max: 15
                                }
                            }
                        },*/
                        zoomed: this.onZoom,
                        dataPointSelection: this.onClick,
                        selection: this.onSelect
                    },
                    background: 'transparent'
                },
                theme: {
                    mode: "dark"
                },
                tooltip: {
                    custom: function({series, seriesIndex, dataPointIndex, w, ctx}) {
                        const {data}=ctx;
                        const {threeDSeries}=data;
                        console.log(threeDSeries[seriesIndex], '==')
                        console.log(ctx)
                        return '<div class="arrow_box">' +
                            '<span>Age: ' + threeDSeries[dataPointIndex].age + '</span><br />' +
                            '<span>Height: ' + threeDSeries[dataPointIndex].height + '</span><br />' +
                            '<span>Income: ' + threeDSeries[dataPointIndex].income + '</span><br />' +
                            '<span>Job: ' + threeDSeries[dataPointIndex].job + '</span><br />' +
                            '<span>Body Type: ' + threeDSeries[dataPointIndex].body_type + '</span><br />' +
                            '<span>:Education ' + threeDSeries[dataPointIndex].education_institution + '</span><br />' +
                            '<span>Sign: ' + threeDSeries[dataPointIndex].sign + '</span><br />' +
                            '<span>Status: ' + threeDSeries[dataPointIndex].status + '</span><br />' +
                            '</div>'
                    }
                },
                xaxis: {
                    tickAmount: 10
                },
                yaxis: {
                    tickAmount: 10
                },
            },


        };
    }

    onClick (e, chartContext, config){
        const dataPoint = this.props.data[config.seriesIndex].data[config.dataPointIndex]
        this.props.filter({series: config.seriesIndex, point: dataPoint, filerType: 'profile'});
    }
    onSelect (chartContext, { xaxis, yaxis }){
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
        /*
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
        this.props.filter({data: categories, filerType: 'detail'})*/
    }

    render() {
        return (
            <Card id="chart" bg={this.backgroundColor} style={{"color": "white", "padding": "1.5rem"}}>
                <Card.Body>
                    <Chart
                        options={this.state.options}
                        series={this.props.data}
                        type="scatter"
                    />
                </Card.Body>
            </Card>
        );
    }
} export default ScatterComponent;
