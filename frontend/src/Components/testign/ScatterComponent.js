import React, {Component} from "react";
import * as d3 from "d3";

class ScatterComponent extends Component {

    state = {
        selection: []
    }

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.fireEvent = this.fireEvent.bind(this);
    }

    componentDidMount() {
        this.drawChart();
    }

    fireEvent(e){
        console.log(JSON.parse(localStorage.getItem("selection")));
    }

    drawChart(){

        const {data, width, height} = this.props;

        const margin = ({top: 20, right: 30, bottom: 30, left: 40})

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x)).nice()
            .range([margin.left, width - margin.right])

        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y)).nice()
            .range([height - margin.bottom, margin.top])

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", -4)
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "end")
                .text(data.x))

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 4)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(data.y))

        const accessToRef = d3.select(this.ref.current)
            .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .style("background-color","white")
            .style("color","black")
            .style("padding", 10)
            .style("margin-left", 50)
            .property("value", []);

        const brush = d3.brush()
            .on("start brush end", brushed)
            .on("end", this.fireEvent);

        accessToRef.append("g")
            .call(xAxis);

        accessToRef.append("g")
            .call(yAxis);

        accessToRef.append("g")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
            .attr("r", 3);

        const dot = accessToRef.append("g")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
            .attr("r", 3);

        accessToRef.call(brush);

        function brushed({selection}) {
            let value = [];
            if (selection) {
                const [[x0, y0], [x1, y1]] = selection;
                value = dot
                    .style("stroke", "gray")
                    .filter(d => x0 <= x(d.x) && x(d.x) < x1 && y0 <= y(d.y) && y(d.y) < y1)
                    .style("stroke", "steelblue")
                    .data();
            } else {
                dot.style("stroke", "steelblue");
            }
            accessToRef.property("value", value).dispatch("input");
            localStorage.setItem("selection", JSON.stringify(value));
        }
    }

    render() {
        return (
            <div className="Scatter">
                <div ref={this.ref}>Test</div>
            </div>
        );
    }
}

export default ScatterComponent;