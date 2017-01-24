import { User } from '../models/User';

export {
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'string',
    }, /* ,
    relations: {
        tasks: {
            target: Task,
            type: 'has-many',
            joinTable: true,
            cascadeInsert: true
        }
    }*/
  },
};
