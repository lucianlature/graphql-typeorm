import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('string')
  public title: string;

  @Column('date')
  public createdAt: string;
}
