/** @flow */

export default class Task {
  id: number;
  title: string;
  createdAt: Date;

  constructor({ id, title, createdAt } : {id: number, title: string, createdAt: Date} = {}) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }
}
