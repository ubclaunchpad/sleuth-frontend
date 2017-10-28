import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';
import SigmaNodeContainer from './SigmaNodeContainer'

export default class ResultGraph extends React.Component {
    constructor(props) {
        super(props);
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
            /*
            for (var child in result.children) {
                edges.push({
                    id:"e"+result.url,
                    source:result.url,
                    target:result.children[0],
                    label:"SEES"
                });
            };
            */
        })
        return {nodes,edges};
    }

    render() {
        //const resultGraph = this.getResultGraph();
        console.log(this.props.results);
        const graph = this.getResultGraph(this.props.results);
        console.log(graph);
        /*
        return (
            <div>
                <Sigma graph={graph}
                        settings={{drawEdges: true}}
                        onOverNode={e => this._onMouseOverNode()}
                        onClickNode={e => this._onNodeClick()}
                        onClickStage={ e => this._onStageClick()}>
                    <RelativeSize initialSize={15}/>
                    <RandomizeNodePositions/>
                </Sigma>
            </div>
        )
        */
        
        return (
            <div>
                <Sigma settings={{drawEdges: true}}
                        onOverNode={e => this._onMouseOverNode()}
                        onClickNode={e => this._onNodeClick()}
                        onClickStage={ e => this._onStageClick()}>
                    <SigmaNodeContainer graph={graph}>
                        <RandomizeNodePositions />
                    </SigmaNodeContainer>
                </Sigma>
            </div>  
        )
        
    }

    _onNodeMouseOver(event) {
        let label = event.data.node.label;
    }

    _onNodeClick(event) {

    }

    _onStageClick(event) {

    }
}

const styles = {
    results: {
        width: '100%'
    }
}
