import knex from 'knex';
import path from 'path';

require('dotenv').config();

const connection = knex({
    client: process.env.DB_CLIENT,
    connection: {
       filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;