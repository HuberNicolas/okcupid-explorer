import React from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

// select filter number 1
// select your attributes
// create similartiy based on those attribtues
// use only 1 2d element for this stuff (first row that the comparison to other people is correct
// color them and show them
const cosine = ([[1., 0.68055731, 0.72813623, 0.60187024, 0.56361172, 0.6147717, 0.9844421, 0.102123, 0.9543246, 0.8922124  ]])
function CosineMapping(){
    return cosine[0].map((e, index) => {
        let obj = {
            similarity: e,
            id: 'Person' + index,
            color: e > 0.9 ? "green" :e > 0.8 ? "blue" : e > 0.7 ? "lime" : e > 0.5 ? "orange": e > 0.25 ? "yellow" : "red"
        }
        return obj;
    });
}

function NetworkGraph(){
    const mapping = CosineMapping();
    return (
        <div>
            <InteractiveForceGraph
                simulationOptions={{ height: 300, width: 300 }}
                labelAttr="label"
                onSelectNode={(node) => console.log(node)}
                highlightDependencies
                animated
            >
                {mapping.map((element) => {
                    return <ForceGraphNode node={{ id: element.id, label: element.id}} fill={element.color} />
                })}

                {mapping.slice(1).map((element) => {
                    return <ForceGraphLink link={{ source: mapping[0].id, target: element.id, value:element.similarity}} />
                })}

            </InteractiveForceGraph>
        </div>

    );
} export default NetworkGraph;