import cors from 'cors';
import express from 'express';
import { readFileSync } from 'fs';
import { v7 } from 'uuid';
import { getRole } from './db/role.db';
import { setRole } from './middleware/role.mid';
import { routers } from './routes/index.route';

const server = express();

server
    .use(cors())
    .use(express.json())
    .use(setRole)
    .use(routers)
    .get('/', (req, res) => {
        res.send({ status: 'ok' })
    })

    .listen(3000, () => console.log('server is up!'));

async function createCustomer() {
    const role = getRole('admin', '66408');
    if (!role) return;

    const data = readFileSync('people-2.csv', 'utf8');

    const rows_ = data.split(/\r?\n/).slice(2, 1002);
    for (const row of rows_) {
        const r = row.split(',');
        const vendor = {
            pk: v7(),
            id: r[0] + '-' + r[1],
            name: r[2] + ' ' + r[3],
            phone: r[6] + r[0],
            email: r[0] + '_' + r[5],
            address: r[8],
            notes: r[4] + ' - ' + r[7],
            active: true
        }

        const raw = await role.query('select * from party.save_vendor($1::uuid, $2::jsonb)', ['019af066-9554-7daf-887b-c242d13d552f', JSON.stringify(vendor)]);
        console.log(raw.rows);
    }
}

async function count() {
    const role = getRole('admin', '66408');
    if (!role) return;

    const count = await role.query('select * from party.count_customer()');
    console.log(count.rows);
}
// count();

// createCustomer();