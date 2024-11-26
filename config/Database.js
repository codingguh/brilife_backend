import { Sequelize } from "sequelize";

const db = new Sequelize('dbbril_agen','root','',{
    host:'localhost',
    dialect:'mysql'
})

export default db;