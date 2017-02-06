import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  public id: number;

  @Column('string')
  public name: string;
}
