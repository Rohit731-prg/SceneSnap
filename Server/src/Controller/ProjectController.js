import Project from "../Model/ProjectModel.js";

export const createProject = async (req, res) => {
    const { title, description, owner } = req.body;
    if (!title || !description || !owner) return res.status(400).json({ message: 'Title, description, and owner are required' });
    try {
        const newProject = new Project({ title, description, owner });
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ owner: req.user._id }).populate('owner', 'username email');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}