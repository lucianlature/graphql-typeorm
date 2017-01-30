export interface IUser {
  id: number;
  name: string;
}

export  class User {
  public id: number;
  public name: string;

  constructor({ id, name }: IUser = { id: 0, name: '' }) {
    this.id = id;
    this.name = name;
  }
}
