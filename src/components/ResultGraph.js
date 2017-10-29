import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';

export default class ResultGraph extends React.Component {
    constructor(props) {
        super(props);
        this.getResultGraph=this.getResultGraph.bind(this);
        this.state={
            showResult:"show"
        }
    }

    /**
     * Returns graph of results
     */
    getResultGraph(results) {
        let nodes = [];
        let edges = [];
        results.forEach((result) => {
            nodes.push({
                id:String(result.url),
                label:String(result.pageName)
            });
              
            if (result.children) {
                result.children.forEach((child) => {
                    edges.push({
                        id:"e"+result.url+child,
                        source:result.url,
                        target:child,
                        label:"SEES"
                    });
                })
            }
        })
        return {nodes,edges};
    }

    componentWillReceiveProps(nextProps) {
        console.log("Next: " + nextProps.results)
        console.log("This: " + this.props.results)
        if (JSON.stringify(nextProps.results) !== JSON.stringify(this.props.results)) {
            if (this.state.showResult === "show") {
                this.setState({showResult:"hide"});
            } else {
                this.setState({showResult:"show"});
            }
        }
        return true;
    }

    render() {
        const graph = this.getResultGraph(this.props.results);
        console.log(graph);
        console.log(this.props.results);
        return (
            <Sigma key={this.state.showResult}
                    graph={graph}
                    settings={{drawEdges: true}}
                    onOverNode={e => this._onMouseOverNode()}
                    onClickNode={e => this._onNodeClick()}
                    onClickStage={ e => this._onStageClick()}>
                <RelativeSize initialSize={50}/>
                <RandomizeNodePositions/>
            </Sigma>
        )
    }

    _onNodeMouseOver(event) {
        // TODO
        let label = event.data.node.label;
    }

    _onNodeClick(event) {
        // TODO
    }

    _onStageClick(event) {
        // TODO
    }
}
