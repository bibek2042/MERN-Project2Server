import {Sequelize} from 'sequelize-typescript'
import { envConfig } from '../config/config'
import User from './models/userModel'
import Product from './models/productModel'
import Category from './models/categoryModel'
import Order from './models/orderModel'
import OrderDetails from './models/orderDetails'
import Payment from './models/paymentModel'

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

// relationships 
// Category x Product
Category.hasOne(Product,{foreignKey:'categoryId'})
Product.belongsTo(Category,{foreignKey:'categoryId'})


// user x order 
User.hasOne(Order,{foreignKey:'userId'})
Order.belongsTo(User,{foreignKey:'userId'})

// User X Order
User.hasMany(Order,{foreignKey:'userId'})
Order.belongsTo(User,{foreignKey:'userId'})

// Payment X Order 
Order.hasOne(Payment,{foreignKey:'orderId'})
Payment.belongsTo(Order,{foreignKey:'orderId'})

// Order x OrderDetails
Order.hasOne(OrderDetails,{foreignKey:'orderId'})
OrderDetails.belongsTo(Order,{foreignKey:'orderId'})

// Product x OrderDetails
Product.hasMany(OrderDetails,{foreignKey:'productId'})
OrderDetails.belongsTo(Product,{foreignKey:'productId'})



export default sequelize