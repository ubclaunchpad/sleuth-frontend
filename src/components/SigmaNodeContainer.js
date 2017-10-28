import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize, ForceAtlas2} from 'react-sigma';

export default class SigmaNodeContainer extends React.Component {
    constructor(props){
        super(props);
        this.embedProperties = this.embedProperties.bind(this);
        props.sigma.graph.read(props.graph);
        //props.sigma.graph.addNode({id:"n3", label:props.label});
        console.log(props.graph)
        //props.sigma.refresh();
    }

    embedProperties(elements, extraProps) {
        return React.Children.map(
            elements,
            (element) => React.cloneElement(element, extraProps)
        );
    }

    render() {
        return (
            <div>
                { this.embedProperties(this.props.children, {sigma: this.props.sigma}) }
            </div>
        )
    }
}
