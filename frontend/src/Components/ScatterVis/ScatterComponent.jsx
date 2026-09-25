import React, { Component } from "react";
import Chart from "../../Chart";
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
                        type: 'y',
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
                    custom: function({series, seriesIndex, dataPointIndex, w}) {
                        // Each point is [PComp 1, PComp 2, profile]; ApexCharts 7 no longer exposes
                        // the third value internally, so read it from the configured series
                        const point = w.config.series[seriesIndex].data[dataPointIndex];
                        if (!point || !point[2]) return '';
                        const person = point[2];
                        return '<div class="arrow_box">' +
                            '<span>Age: ' + person.age + '</span><br />' +
                            '<span>Height: ' + person.height + '</span><br />' +
                            '<span>Income: ' + person.income + '</span><br />' +
                            '<span>Job: ' + person.job + '</span><br />' +
                            '<span>Body Type: ' + person.body_type + '</span><br />' +
                            '<span>:Education ' + person.education_institution + '</span><br />' +
                            '<span>Sign: ' + person.sign + '</span><br />' +
                            '<span>Status: ' + person.status + '</span><br />' +
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
        this.props.frameSize({filerType: 'detail'})
    }
    onSelect (chartContext, { xaxis, yaxis }){
        // ApexCharts 4 reports NaN for the y range of an xy selection; compute it from the selection rectangle
        if (isNaN(yaxis.min) || isNaN(yaxis.max)) {
            const {selection, gridHeight, yAxisScale} = chartContext.w.globals
            const {niceMin, niceMax} = yAxisScale[0]
            const yAt = pixel => niceMax - pixel / gridHeight * (niceMax - niceMin)
            yaxis = {min: yAt(selection.y + selection.height), max: yAt(selection.y)}
        }
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
        this.props.frameSize({filerType: 'detail'})
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
                <Card.Header className={"bg-danger"}>
                    Scatter plot mapping the similarities / dissimilarities to your entered data
                </Card.Header>
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
