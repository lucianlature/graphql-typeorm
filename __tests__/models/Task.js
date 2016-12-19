/** @flow */

export default class Task {
    constructor({id, title, createdAt}) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
    }
}
