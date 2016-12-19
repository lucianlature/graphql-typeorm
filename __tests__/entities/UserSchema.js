import { User } from '../models/User';
import { Task } from '../models/Task';

const UserSchema = {
    target: User,
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'string'
        }
    },
    relations: {
        tasks: {
            target: Task,
            type: 'has-many',
            joinTable: true,
            cascadeInsert: true
        }
    }
};

export default {
    UserSchema
};