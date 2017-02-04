import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { User } from '../models/User';

export interface IColumnId {
  primary: boolean;
  'type': string;
  generated: boolean;
}

export interface IColumnTypeString {
  'type': string;
}

export interface IColumn {
  id: IColumnId;
  name: IColumnTypeString;
}

export interface IUserSchema {
  target: Object;
  columns: IColumn;
}

@Entity('User')
export const userSchema: IUserSchema = {
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'string',
    },
  },
};
