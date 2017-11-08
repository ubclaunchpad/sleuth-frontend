/**
 * Note that ResultNode does not inherit from React.Component. It is rendered
 * by the Three.js CSS3D renderer.
 */

export default class ResultNode {
    constructor(title, url, description, children) {
        this.title = title;
        this.url = url;
        this.description = description;
        this.children = children;

        // Create renderable for this result
        const element = document.createElement('div');
        element.innerHTML = `<h1>${this.title}</h1><p>${this.description}</p>`;
        this.renderable = new THREE.CSS3DObject(element);
    }

    asRenderable() {
        return this.renderable;
    }
}