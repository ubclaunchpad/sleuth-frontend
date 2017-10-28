import React from 'react';
import {Sigma, RandomizeNodePositions, RelativeSize, ForceAtlas2} from 'react-sigma';
import SigmaNodeContainer from './SigmaNodeContainer'

export default class ResultGraph extends React.Component {
    constructor(props) {
        super(props);
        this.getResultGraph = this.getResultGraph.bind(this);
    }

    /**
     * Returns graph of results
     */
    getResultGraph() {
        let nodes = [];
        let edges = [];
        this.props.results.map((result) => {
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
        
        return {nodes:nodes,edges:edges};
    }

    render() {
        const resultGraph = JSON.parse(JSON.stringify(this.getResultGraph()));
        /*
        return (
            <div>
                <Sigma graph={resultGraph}
                        settings={{drawEdges: true}}
                        onOverNode={e => this._onMouseOverNode()}
                        onClickNode={e => this._onNodeClick()}
                        onClickStage={ e => this._onStageClick()}>
                    <RelativeSize initialSize={15}/>
                    <RandomizeNodePositions/>
                </Sigma>
                <p>{String(resultGraph.nodes)}</p>
            </div>
        )
        */
        return (
            <div>
                <Sigma settings={{drawEdges: true}}
                        onOverNode={e => this._onMouseOverNode()}
                        onClickNode={e => this._onNodeClick()}
                        onClickStage={ e => this._onStageClick()}>
                    {
                        resultGraph.nodes.map((node) =>
                            <SigmaNodeContainer node={node}>
                                <ForceAtlas2 iterationsPerRender={1} timeout={600}/>
                                <RandomizeNodePositions />
                            </SigmaNodeContainer>
                        )
                    }
                </Sigma>
                <p>{String(resultGraph.nodes)}</p>
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
