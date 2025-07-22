import cloudinary from "../config/cloudinary";
import Props from "../model/props.model";
import { Request, Response } from "express";

export const createprops = async (req: Request, res: Response): Promise<void> => {
    const { name, description, image, isAvailable } = req.body;
    if ( !name || !description || !image ) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        const props = await Props.findOne({ name });
        if (props) {
            res.status(400).json({ message: 'Props already exists' });
            return;
        }

        const imagedetails = await cloudinary.uploader.upload(image);
        const imageUrl = imagedetails.secure_url;
        const image_id = imagedetails.public_id;

        const newProps = new Props({ name, description, image: imageUrl, public_id: image_id, isAvailable });
        await newProps.save();

        res.status(201).json({ message: 'Props created successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const allProps = async (req: Request, res: Response): Promise<void> => {
    try {
        const props = await Props.find({}).sort({ createdAt: -1 });
        const count = await Props.countDocuments({});

        res.status(200).json({ props, count });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const UpdateProps = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, image } = req.body;
    if ( !name || !description || !image ) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const props = await Props.findById(id);
        if ( !props ) {
            res.status(404).json({ message: 'Props not found' });
            return;
        }

        if ( props.name === name && props.description === description && props.image === image ) {
            res.status(400).json({ message: 'No changes detected' });
            return;
        }

        if ( props.public_id ) {
            await cloudinary.uploader.destroy(props.public_id);
        }

        const newimage = await cloudinary.uploader.upload(image);
        const newimageUrl = newimage.secure_url;
        const newimage_id = newimage.public_id;

        const updatedProps = await Props.findByIdAndUpdate(id, { name, description, image: newimageUrl, public_id: newimage_id }, { new: true });
        res.status(200).json({ message: 'Props updated successfully', props: updatedProps });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const toggleAvailability = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const prop = await Props.findById(id);
        if (!prop) {
            res.status(404).json({ message: 'Props not found' });
            return;
        }

        const updatedProps = await Props.findByIdAndUpdate(id, { isAvailable: !prop.isAvailable }, { new: true });
        res.status(200).json({ message: 'Props updated successfully', props: updatedProps });
    } catch (error) {
        res.status(500).json({ message: error });
    }   
}