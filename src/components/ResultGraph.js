import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';

export default class ResultGraph extends React.Component {
    constructor(props) {
        super(props);
        this.getResultGraph=this.getResultGraph.bind(this);
        this.state={
            showResult:false
        }
    }

    /**
     * Returns results as a graph object
     * with list of nodes and objects
     * @param {list} results
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

    /**
     * Determines when Sigma graph needs to be updated
     * and sets state accordingly to remount the component
     */
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.results) !== JSON.stringify(this.props.results)) {
            // changing the key of the component remounts it
            let newState = !this.state.showResult;
            this.setState({showResult:newState});
        }
        return true;
    }

    render() {
        const graph = this.getResultGraph(this.props.results);
        console.log(graph);
        console.log(this.props.results);
        return (
            <Sigma key={String(this.state.showResult)}
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

    /**
     * Called when user hovers over a Sigma node
     */
    _onNodeMouseOver(event) {
        // TODO
        let label = event.data.node.label;
    }

    /**
     * Called when user clicks a Sigma node
     */
    _onNodeClick(event) {
        // TODO
    }

    /**
     * Called when user clicks the background of graph
     */
    _onStageClick(event) {
        // TODO
    }
}
