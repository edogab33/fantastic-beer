import pgPromise from 'pg-promise';
const pg = pgPromise({});

export const db = pg("postgres://eddie:password@localhost:5432/fantastic-brew-db");