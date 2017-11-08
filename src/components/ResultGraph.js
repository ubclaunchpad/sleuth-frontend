import React from 'react';
import PropTypes from 'prop-types';
import ResultNode from './ResultNode';

export default class ResultGraph extends React.Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.renderScene = this.renderScene.bind(this);
    }

    /**
     * Creates a THREE scene, camera, renderer, and controls for viewing the
     * results graph and adds the results passed as props to the scene.
     */
    componentDidMount() {
        // Create Three.js objects
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.CSS3DRenderer();
        this.controls = new THREE.TrackballControls(this.camera);
        this.scene = new THREE.Scene();

        this.camera.position.z = 500;
        this.renderer.setSize(width, height);
        this.controls.rotateSpeed = 0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;

        // Create a map from url to the result with that url so we can look up
        // nodes quickly. Add each node to the scene.
        this.nodeMap = this.createResultNodes(this.props.results);

        this.mount.appendChild(this.renderer.domElement);
        this.start();
    }

    createResultNodes(results) {
        const nodeMap = {};

        results.forEach(result => {
            const resultNode = new ResultNode(
                result.title,
                result.url,
                result.description,
                result.children
            );
            nodeMap[result.url] = resultNode;

            // Add the CSS3D representation of this result to the scene
            const renderable = resultNode.asRenderable();
            this.scene.add(renderable);
        });

        return nodeMap;
    }

    setNodePositions(nodes) {
        nodes.forEach((node, index) => {
            if (index === 1) {
                // The first node should be left at the center of the scene
                continue;
            }


        });
    }

    /**
     * Stops rendering the THREE scene and unmounts it from the DOM.
     */
    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    /**
     * Starts the animation and rendering cycle.
     */
    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    /**
     * Stops the animation and rendering cycle.
     */
    stop() {
        cancelAnimationFrame(this.frameId);
    }

    /**
     * Updates the scene based on the controls/camera position and renders it,
     * then requests another animation frame to keep the animation going.
     */
    animate() {
        this.controls.update();
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    /**
     * Renders the scene.
     */
    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div
                style={{ width: '100%', height: '400px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

ResultGraph.propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        description: PropTypes.string,
        pageName: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.string)
    }))
};

