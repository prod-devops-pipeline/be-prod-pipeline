import { Request, Response } from "express";
import { createProductsService, deleteProductService, getAllProductService, getProductByIdService, updateProductService } from "../services/productService";
import mongoose from "mongoose";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const data = await getAllProductService(req.query);
        setTimeout(() => { 
            return res.status(200).json({ message: 'Products Fetched successfully', data: data, status: 'success' }) }, 1000)
        return;
    }
    catch (error) {
        return res.status(500).json({ message: 'Somthing Went Wromg' })
    }

}

export const createProducts = async (req: Request, res: Response) => {
    try {
        const data = await createProductsService(req.body);
        return res.status(201).json({ message: 'Product Created successfully', product: data, status: 'success' })
    } catch (error) {
        return res.status(500).json({ message: 'Somthing Went Wromg' })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid product ID' })
        }
        await deleteProductService(id);
        res.status(200).json({ message: 'Product Deleted Successfully ', status: 'success' })
    } catch (error) {
        return res.status(500).json({ message: 'Somthing Went Wromg' })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid product ID' })
        }
        const data = await updateProductService(id, req.body);
        return res.status(200).json({ message: 'Product Updated Successfully ', Product: data, status: 'success' })
    } catch (error) {
        return res.status(500).json({ message: 'Somthing Went Wromg' })
    }
}

export const getProductsByID=async (req: Request, res: Response)=>{
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid product ID' })
        }
        const data = await getProductByIdService(id);
        return res.status(200).json({ message: 'Product Updated Successfully ', Product: data, status: 'success' })
    } catch (error) {
        return res.status(500).json({ message: 'Somthing Went Wromg' })
    }
}