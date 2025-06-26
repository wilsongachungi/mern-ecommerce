import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import categoryModel from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
    try{
        const { name } = req.body;
       if(!name) {
        return res.json({error: "Name is required"});
       }

       const existingCategory = await Category.findOne({ name })

       if(existingCategory) {
        return res.json({error: "Already exists"})
       }

    }catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

export {createCategory}