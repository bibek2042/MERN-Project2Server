import { Request, Response } from "express";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";


class ProductController{
    async createProduct(req:Request,res:Response):Promise<void>{
      
            const {productName,productDescription,productPrice,productTotalStock,discount,categoryId} = req.body 
        const filename = req.file ? req.file.filename : "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
        if(!productName || !productDescription || !productPrice || !productTotalStock  || !categoryId){
            res.status(400).json({
                message : "Please provide productName,productDescription,productPrice,productTotalStock,discount,categoryId"
            })
            return
        }
        const product =  await Product.create({
            productName,
            productDescription,
            productPrice,
            productTotalStock,
            discount : discount || 0,
            categoryId:categoryId, 
            productImageUrl : filename
        })
        res.status(200).json({
            message : "Product created successfully", 
            data : product
        })
  
    }
    async getAllProducts(req:Request,res:Response) : Promise<void>{
        const datas = await Product.findAll({
            include : [
                {
                    model : Category, 
                    attributes : ['id','categoryName']
                }
            ]
        })
        res.status(200).json({
            message : "Products fetched successfully", 
            data : datas
        })
    }
    async getSingleProduct(req:Request,res:Response) : Promise<void>{
        const {id} = req.params
        const [datas] = await Product.findAll({
            where : {
                id : id
            },
            include : [
                {
                    model : Category, 
                    attributes : ['id','categoryName']
                }
            ]
        })
        res.status(200).json({
            message : "Products fetched successfully", 
            data : datas
        })
    }
    async deleteProduct(req:Request,res:Response) : Promise<void>{
        const {id} = req.params
        const datas = await Product.findAll({
            where : {
                id : id
            }
        })
        if(datas.length === 0){
            res.status(404).json({
                message : "No product with that id"
            })
        }else{
            await Product.destroy({
                where : {
                    id : id
                }
            })
            res.status(200).json({
                message : "Products deleted successfully", 
                data : datas
            })
        }
    }
    async updateProduct(req:Request,res:Response):Promise<void>{
        const {id} = req.params
          const {productName,productDescription,productPrice,productTotalStock,discount,categoryId} = req.body ?? {};
        const filename = req.file ? req.file.filename : "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png"
        if(!productName || !productDescription || !productPrice || !productTotalStock  || !categoryId){
            res.status(400).json({
                message : "Please provide productName,productDescription,productPrice,productTotalStock,discount,categoryId"
            })
            return
        }
        const data = await Product.findAll({
            where : {
                id : id
            }
        }) // array return 
        // const data = await Category.findByPk(id) // object return 
        if(data.length === 0){
            res.status(404).json({
                message : "No category with that id"
            })
        }else{
           const product = await Product.update({
               productName,
            productDescription,
            productPrice,
            productTotalStock,
            discount : discount || 0,
            categoryId:categoryId, 
            productImageUrl : filename
            },{
                where : {
                    id
                }
            })
            res.status(200).json({
                message : "Category updated successfully",
                data : data,
            
                
            })
        }
    }
   

}

export default new ProductController