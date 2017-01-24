import { Task } from '../models/Task';

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
  title: IColumnTypeString;
  createdAt: IColumnTypeString;
}

export interface ITaskSchema {
  target: Object;
  columns: IColumn;
}

export const taskSchema: ITaskSchema = {
  target: Task,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'string',
    },
    createdAt: {
      type: 'date',
    },
  },
};
