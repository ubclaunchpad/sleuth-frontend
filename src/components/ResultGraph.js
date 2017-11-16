import React from 'react';
import PropTypes from 'prop-types';
import {
    scaleOrdinal,
    schemeCategory20
} from 'd3-scale';
import {
    drag
} from 'd3-drag';
import {
    select,
    event
} from 'd3-selection';
import {
    forceCenter,
    forceSimulation,
    forceManyBody,
    forceLink
} from 'd3-force';

export default class ResultGraph extends React.Component {
    constructor(props) {
        super(props);

        this.data = {
            nodes: [],
            edges: [],
        }

        this._createColor = scaleOrdinal(schemeCategory20);
        this._tick = this._tick.bind(this);
        this._startDrag = this._startDrag.bind(this);
        this._endDrag = this._endDrag.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.queryId === this.props.queryId) {
            // The query hasn't changed, no need to re-render.
            return;
        }

        // Create nodes and edges from new search results.
        this.data = this._createResultNodesAndEdges(nextProps.results);

        // Search results have changed, so remove the old ones.
        select('svg').remove();

        // Add a container svg for our graph to our parent div.
        let domElement = select('#result-graph')
            .append('svg')
            .attr('width', this.mount.clientWidth)
            .attr('height', this.mount.clientHeight);

        // Add a group of edges to our container svg and bind our edge data to
        // the group. This will add a line for each element in our array of edges.
        this.edges = domElement.append('g')
            .selectAll('line')
            .data(this.data.edges)
            .enter().append('line')
            .attr('stroke-width', edge => { return edge.weight; })
            .attr('stroke', '#ccc');

        // Add a group of nodes to our container svg and bind our nodes data to
        // the group. This will add a circle for each element in our array of nodes.
        // We also attach drag handlers to each element.
        this.nodes = domElement.append('g')
            .selectAll('circle')
            .data(this.data.nodes)
            .enter().append('circle')
            .attr('r', 5)
            .attr('fill', node => { return this._createColor(node.category); })
            .call(drag()
                .on('start', this._startDrag)
                .on('drag', this._doDrag)
                .on('end', this._endDrag));

        // Each node gets a title based on it's id (url).
        this.nodes.append('title')
            .text(node => { return node.id; });

        // Add forces on the edges between nodes to pull them back together when
        // they are separated.
        this.simulation = forceSimulation()
            .force('link', forceLink().id(function(d) { return d.id; }))
            .force('charge', forceManyBody())
            .force('center', forceCenter(this.mount.clientWidth / 2, this.mount.clientHeight / 2));

        this.simulation
            .nodes(this.data.nodes)
            .on('tick', this._tick);

        this.simulation.force('link')
            .links(this.data.edges);
    }

    /**
     * Returns an object of the following form
     *  {
     *      nodes: Array.of(Node),
     *      edges: Array.of(Edge),
     *  }
     * constructed from the given array of search results.
     * @param {Array} results An array of search results defined in Proptypes.
     */
    _createResultNodesAndEdges(results) {
        const resultMap = new Map();
        const connectedNodes = new Map();
        const edges = [];
        const nodes = [];

        // Create a map from result URL to result, and add create a Node for
        // each result.
        results.forEach(result => {
            nodes.push(new Node(result));
            resultMap.set(result.url, result);
        });

        // Create an Edge for each reference from one page to another in our
        // array of results.
        results.forEach(parent => {
            (parent.children || []).forEach(childUrl => {
                // Check that there is a node in our results with the childUrl
                // and that there exists a connection parent -> child or
                // child -> parent.
                if (resultMap.get(childUrl) === undefined ||
                    connectedNodes.get(childUrl) === parent.url ||
                    connectedNodes.get(parent.url) === childUrl ||
                    parent.url === childUrl) {
                    // There is no node with the childUrl in our results or
                    // there is already an edge between parent and child.
                    return;
                }

                // TODO: don't make all edge weights 3
                edges.push(new Edge(parent.url, childUrl, 3));

                // Mark these nodes as connected so we don't try to connect
                // them again.
                connectedNodes.set(parent.url, childUrl);
            });
        });

        return {
            nodes: nodes,
            edges: edges,
        };
    }

    /**
     * Called on each tick of D3's animation. Updates nodes and edges.
     */
    _tick() {
        this.nodes
            .attr('cx', node => { return node.x; })
            .attr('cy', node => { return node.y; });

        this.edges
            .attr('x1', edge => { return edge.source.x; })
            .attr('y1', edge => { return edge.source.y; })
            .attr('x2', edge => { return edge.target.x; })
            .attr('y2', edge => { return edge.target.y; });
    }

    /**
     * Called when the user first clicks a node to begin a drag action.
     * @param {Node} node
     */
    _startDrag(node) {
        if (!event.active) {
            this.simulation.alphaTarget(0.3).restart();
        }
        node.fx = node.x;
        node.fy = node.y;
    }

    /**
     * Called while the user drags a node.
     * Updates node position.
     * @param {Node} node
     */
    _doDrag(node) {
        node.fx = event.x;
        node.fy = event.y;
    }

    /**
     * Called when the user finishes dragging a node.
     * Sets node fixed x and y positions to null.
     * @param {Node} node
     */
    _endDrag(node) {
        if (!event.active) {
            this.simulation.alphaTarget(0);
        }
        node.fx = null;
        node.fy = null;
    }

    render() {
        return (
            <div
                id='result-graph'
                style={{ width: '100%', height: '500px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

ResultGraph.propTypes = {
    queryId: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        description: PropTypes.string,
        pageName: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.string)
    }))
};

/**
 * Node holds data for a search result and is visually represented by a cirle in
 * the graph.
 */
class Node {
    /**
     * @constructor
     * @param {Object} result A search result with a String url property.
     */
    constructor(result) {
        this.id = result.url;
        this.category = 1; // TODO: add categorization
    }
}

/**
 * Edge holds data for a link between two search results and is represented by
 * a line between two circles in the graph.
 */
class Edge {
    /**
     * @constructor
     * @param {String} source The url of the parent page
     * @param {String} target The url of the child page referenced by the parent page
     * @param {Number} weight The weight of the edge between the pages
     */
    constructor(source, target, weight) {
        this.source = source;
        this.target = target;
        this.weight = weight;
    }
}

