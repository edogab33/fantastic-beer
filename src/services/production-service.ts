import {db} from '../connection'

export const getProductions = async () => {
    return await db.query('SELECT * FROM production')
}

export const getProductionsQuantity = async (start_day: string, end_date?: string, name?: string) => {
    return await db.query(
        `SELECT SUM(quantity) AS produced_beer 
        FROM production 
        WHERE ($1 IS NULL OR name = $1) AND (
            ($3 IS NOT NULL AND day BETWEEN $2 AND $3) OR (day = $2)
        )`, [name, start_day, end_date]
    ).catch(err=>{console.log(err)})
}

export const insertProduction = async (newProduction: { name: string; day: string; quantity: number }) => {
    return await db.query(
        'INSERT INTO production (name, day, quantity) VALUES ($1, $2, $3) RETURNING *', 
        [newProduction.name, newProduction.day, newProduction.quantity]
    )
}

// TODO: sum should be STRICLY greater than previous days
export const getLaudableDays = async (start_day: string, end_day: string, name?: string) => {
    return await db.query(
        `WITH overall_prod as (
            SELECT day, lead(sum(quantity),1,0) over(order by day) l, sum(quantity) s
            FROM production
            WHERE ($1 IS NULL OR name = $1) AND day BETWEEN $2 AND $3
            GROUP BY day 
            ORDER BY day
          )
          SELECT day, s as sum FROM (
            SELECT day, s, l, max(s) over(
                order by day rows unbounded preceding exclude current row
            ) m 
            FROM overall_prod
          ) as mt
          WHERE s > m AND s > l AND s != 0;`, [name, start_day, end_day]
    );
}