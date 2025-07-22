import cloudinary from "../config/cloudinary";
import Actor from "../model/actor.model";
import { Request, Response } from "express";

export const getAllActor = async (req: Request, res: Response): Promise<void> => {
    try {
        const actors = await Actor.find({}).sort({ createdAt: -1 });
        const count = await Actor.countDocuments({});

        res.status(200).json({ actors, count });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const createActor = async (req: Request, res: Response): Promise<void> => {
    const { name, role, availability, image } = req.body;
    if (!name || !role || !availability) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const actor = await Actor.findOne({ name });
        if ( actor ) {
            res.status(400).json({ message: 'Actor already exists' });
            return;
        }

        const imageDetails = await cloudinary.uploader.upload(image);
        const url = imageDetails.secure_url;
        const public_id = imageDetails.public_id;

        const newActor = new Actor({ name, role, availability, image: url, public_id });
        await newActor.save();

        res.status(201).json({ message: 'Actor created successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const deleteActor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const actor = await Actor.findById(id);
        if ( !actor ) {
            res.status(404).json({ message: 'Actor not found' });
            return;
        }

        if ( actor.public_id ) {
            await cloudinary.uploader.destroy(actor.public_id);
        }

        await Actor.findByIdAndDelete(id);
        res.status(200).json({ message: 'Actor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const updateActor = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, role, image } = req.body;
    if ( !name || !role  ) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        const actor = await Actor.findById(id);
        if ( !actor ) {
            res.status(404).json({ message: 'Actor not found' });
            return;
        }

        if ( image ) {
            if ( actor.public_id ) {
                await cloudinary.uploader.destroy(actor.public_id);
            }

            const imageDetails = await cloudinary.uploader.upload(image);
            const url = imageDetails.secure_url;
            const public_id = imageDetails.public_id;

            actor.image = url;
            actor.public_id = public_id;

            await actor.save();
        }

        actor.name = name;
        actor.role = role;

        await actor.save();

        res.status(200).json({ message: 'Actor updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}