import pgPromise from 'pg-promise';
const pg = pgPromise({});

export const db = pg("postgres://eddie:password@fb-db:5432/fantastic-brew-db");