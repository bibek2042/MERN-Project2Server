import {Sequelize} from 'sequelize-typescript'
import { envConfig } from '../config/config'
import User from './models/userModel'

const sequelize = new Sequelize(envConfig.connectionString as string,{
    models : [__dirname + '/models']
})

try {
    sequelize.authenticate()
    .then(()=>{
        console.log("milyo authentication !!")
    })
    .catch(err=>{
        console.log("error ayo", err)
    })
} catch (error) {
    console.log(error)
}
sequelize.sync({force : false,alter:false}).then(()=>{
    console.log("synced !!")
})

export default sequelize