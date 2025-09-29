import Scene from "../Model/Scenemodel.js";

export const createProject = async (req, res) => {
    const { title, location, status, project, actors, props } = req.body;
    if (!title || !location || !project || !actors) return res.status(400).json({ message: 'Title, location, project, and actors are required' });
    try {
        const newScene = new Scene({ title, location, status, project, actors, props });
        await newScene.save();
        res.status(201).json({ message: 'Scene created successfully', scene: newScene });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllScenes = async (req, res) => {
    const { id } = req.params;
    try {
        const scenes = await Scene.find({ project: id }).populate('project').populate('actors').populate('props');
        const count = await Scene.countDocuments({ project: id });
        if (count === 0) return res.status(404).json({ message: 'No scenes found for this project' });
        res.status(200).json(scenes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}