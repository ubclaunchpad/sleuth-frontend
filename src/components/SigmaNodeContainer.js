import React from 'react';

export default class SigmaNodeContainer extends React.Component {
    constructor(props){
        super(props);
        this.embedProperties = this.embedProperties.bind(this);
        //props.sigma.graph.read(props.graph);
        props.sigma.graph.addNode(props.node);
        console.log(props.node)
        props.sigma.refresh();
        console.log("Refreshed")
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
                { this.embedProperties(this.props.children, {sigma: this.props.sigma}) };
            </div>
        )
    }
}
