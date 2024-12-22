import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './config/database.sqlite'
});

export default sequelize;