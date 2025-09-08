import Actor from "../Model/ActorModel.js";

export const registerActor = async (req, res) => {
    const { name, role, availability } = req.body;
    if (!name || !role) return res.status(400).json({ message: "Please provide name and role" });
    try {
        const isExist = await Actor.findOne({ name, role });
        if (isExist) return res.status(400).json({ message: "Actor already exists" });

        const actor = new Actor({ name, role, availability, image: req.fileUrl || "" });
        await actor.save();
        res.status(201).json({ message: "Actor registered successfully", actor });
    } catch (error) {
        res.status(500).json({ message: "Error while registering actor", error });
    }
}

export const getAllActors = async (req, res) => {
    try {
        const actors = await Actor.find();
        const length = await Actor.countDocuments();
        if (length === 0) return res.status(404).json({ message: "No actors found" });
        res.status(200).json({ message: "Actors fetched successfully", actors });
    } catch (error) {
        res.status(500).json({ message: "Error while fetching actors", error });
    }
}