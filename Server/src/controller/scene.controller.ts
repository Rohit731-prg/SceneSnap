import { Request, Response } from "express";
import Scene from "../model/scene.model";

export const createScene = async (req: Request, res: Response): Promise<void> => {
    const { title, location, status, project, actors, props } = req.body;
    if ( !title || !location || !status || !project || !actors || !props ) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const scene = await Scene.findOne({ title });
        if (scene) {
            res.status(400).json({ message: 'Scene already exists' });
            return;
        }

        const newScene = new Scene({ title, location, status, project, actors, props });
        await newScene.save();

        res.status(201).json({ message: 'Scene created successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getAllScene = async (req: Request, res: Response): Promise<void> => {
    try {
        const scenes = await Scene.find({}).sort({ createdAt: -1 });
        const count = await Scene.countDocuments({});

        res.status(200).json({ scenes, count });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const deleteScene = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const scene = await Scene.findById(id);
        if (!scene) {
            res.status(404).json({ message: 'Scene not found' });
            return;
        }
        await Scene.findByIdAndDelete(id);
        res.status(200).json({ message: 'Scene deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { ststus } = req.body;
    if ( !ststus ) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const scene = await Scene.findById(id);
        if (!scene) {
            res.status(404).json({ message: 'Scene not found' });
            return;
        }
        const updatedScene = await Scene.findByIdAndUpdate(id, { status: ststus }, { new: true });
        res.status(200).json({ message: 'Scene updated successfully', scene: updatedScene });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}