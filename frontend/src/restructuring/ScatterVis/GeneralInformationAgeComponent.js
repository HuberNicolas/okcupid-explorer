import {Component, React} from "react";
import {Card} from "react-bootstrap";
import Chart from "react-apexcharts";

class GeneralInformationAgeComponent extends Component {

    constructor(props) {
        super(props);
        this.backgroundColor = "dark"
        this.superCrazyFilter = this.superCrazyFilter.bind(this)
    }

    async superCrazyFilter(event, chartContext, config, key) {
        const {data} = chartContext
        const {dataPointIndex} = config
        const {twoDSeriesX} = data
        const f = twoDSeriesX[dataPointIndex]
        this.props.superCrazyFilter(f, 'age');
        let sex = ''
        if (config.seriesIndex === 0) {
            //m
            sex = 'm'
        } else {
            sex = 'f'
        }
        await new Promise(r => setTimeout(r, 1000));
        this.props.superCrazyFilter(sex, 'sex');
    }


    render() {
        this.male = this.props.data.filter(e => e.sex === 'm')
        this.female = this.props.data.filter(e => e.sex === 'f')

        this.first = this.male.map(e => e.age)
        this.first = this.first.reduce((acc, curr) => {
            acc[curr] ? acc[curr]++ : (acc[curr] = 1);
            return acc;
        }, {});

        this.second = this.female.map(e => e.age)
        this.second = this.second.reduce((acc, curr) => {
            acc[curr] ? acc[curr]++ : (acc[curr] = 1);
            return acc;
        }, {});

        const cumulativeSum = (sum => value => sum += value)(0);
        const cumulativeSumFem = (sum => value => sum += value)(0);

        const age = Object.entries(this.first).map(e => cumulativeSum(e[1]))
        this.male = Object.entries(this.first).map((e) => e[1]/age[age.length-1]*100)

        const femage = Object.entries(this.second).map(e => cumulativeSumFem(e[1]))
        this.female = Object.entries(this.second).map((e) => e[1]/femage[femage.length-1]*100)

        this.skeet = Object.entries(this.male).map(e => {
            if (Object.keys(this.first)[e[0]] == this.props.you[0].value){
                if (this.props.you[1].value === 'm'){
                    return {x: Object.keys(this.first)[e[0]], y:e[1],
                        strokeColor: '#775DD0',
                        fillColor: '#775DD0',
                    }
                } else {
                    return {x: Object.keys(this.first)[e[0]], y:e[1]}
                }
            }
            else {
                return {x: Object.keys(this.first)[e[0]], y:e[1]}
            }
        })

        this.yeet = Object.entries(this.female).map(e => {
            if (Object.keys(this.second)[e[0]] == this.props.you[0].value){
                if (this.props.you[1].value === 'f'){
                    return {x: Object.keys(this.second)[e[0]], y:e[1]*-1,
                        strokeColor: '#775DD0',
                        fillColor: '#775DD0',
                    }
                } else {
                    return {x: Object.keys(this.second)[e[0]], y:e[1]*-1}
                }
            }
            else {
                return {x: Object.keys(this.second)[e[0]], y:e[1]*-1}
            }
        })


        this.scat = [{
            name: '% distribution of males with this age',
            data: this.skeet,
        }, {
            name: '% distribution of females with this age',
            data: this.yeet,
        }];

        const chartOptions = {
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    background: 'transparent',
                    events: {
                        dataPointSelection: this.superCrazyFilter
                    }
                },
                colors: ['#008FFB', '#FF4560'],
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: '80%',
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 1,
                    colors: ["#fff"]
                },

                grid: {
                    xaxis: {
                        lines: {
                            show: false
                        }
                    }
                },
                yaxis: {
                    min: -8,
                    max: 8,
                    title: {
                        text: 'Age',
                    },
                },
                tooltip: {
                    shared: false,
                    x: {
                        formatter: function (val) {
                            return val
                        }
                    },
                    y: {
                        formatter: function (val) {
                            return Math.abs(val).toFixed(2) + "%"
                        }
                    }
                },
                xaxis: {
                    title: {
                        text: 'Percent'
                    },
                    labels: {
                        formatter: function (val) {
                            return Math.abs(Math.round(val)) + "%"
                        }
                    }
                },
                theme: {
                    mode: "dark"
                },
            }
        }

        //segment // element // object entry
        return (
            <Card id="chart" bg={this.backgroundColor} style={{"color": "white", "padding": "1.5rem", "marginTop": "1rem"}}>
                <Card.Header className={"bg-danger"}>
                    Age distribution across the all the entries compared by men and women
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
} export default GeneralInformationAgeComponent;