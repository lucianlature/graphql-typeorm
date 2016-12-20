/** @flow */

import Task from '../models/Task';

const TaskSchema = {
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

export default TaskSchema;
