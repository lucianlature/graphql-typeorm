export default class Task {
  id: number;
  title: string;
  createdAt: Date;

  constructor({ id = 0, title = '', createdAt = null }: { id: number, title: string, createdAt: Date }) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }
}
