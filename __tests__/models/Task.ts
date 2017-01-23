export class Task {
  public id: number;
  public title: string;
  public createdAt: Date;

  constructor({ id = 0, title = '', createdAt = null }: { id: number, title: string, createdAt: Date }) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }
}
