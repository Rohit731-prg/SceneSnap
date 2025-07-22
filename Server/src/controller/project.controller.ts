import Project from "../model/project.model";
import { Request, Response } from "express";

export const createProject = async (req: Request, res: Response): Promise<void> => {
    const { title, description, owner } = req.body; 
    if ( !title || !description || !owner ) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const project = await Project.findOne({ title });
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }

        const newProject = new Project({ title, description, owner });
        await newProject.save();

        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const allProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const allProject = await Project.find({}).populate('owner');
        const count = await Project.countDocuments({});
        res.status(200).json({ projects: allProject, count: count });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const getProjectsByOwner = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const projects = await Project.find({ owner: id }).populate('owner');
        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        await Project.findByIdAndDelete(id);
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}