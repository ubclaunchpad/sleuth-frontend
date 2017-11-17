export class CourseItemResult {
    /**
     * Creates a CourseItemResult from the given search result data
     * @param {String} id
     * @param {String} description
     * @param {String} pageName
     * @param {String} siteName
     */
    constructor(id, description, pageName, siteName) {
        this.url = id;
        this.description = description;
        this.pageName = name;
        this.siteName = siteName;
    }
}

export class GenericPageResult {
    /**
     * Creates a GenericPageResult from the given search result data
     * @param {String} id
     * @param {String} description
     * @param {String} pageName
     * @param {String} siteName
     * @param {Array<String>} links
     */
    constructor(id, description, pageName, siteName, links) {
        this.url = id;
        this.description = description;
        this.pageName = pageName;
        this.siteName = siteName;
        this.links = links;
    }
}