import express from 'express';
import { Participant } from '../models/participantModel.js'

const router = express.Router();

// Get all participants
router.get('/', async (req, res) => {
    try {
        const participants = await Participant.find({});

        return res.status(200).send({
            count: participants.length,
            data: participants
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Get participant by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const participant = await Participant.findById(id);

        return res.status(200).send(participant);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Create a new participant
router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.email) {
            return res.status(400).send({ message: "Fill all required fields"});
        }
        // Try to find participant by email
        const email = req.body.email;
        const existingParticipant = await Participant.findOne({ email });
        
        // If a participant with the same email exists, update it
        if (existingParticipant) {
            const updatedParticipant = await Participant.findOneAndUpdate(
                { email },
                { ...req.body },
                { new: true }
            );

            return res.status(200).send(updatedParticipant);
        }
        // If email does not exist, create a new participant
        const newParticipant = new Participant({
            ...req.body,
        });
        const participant = await Participant.create(newParticipant);

        return res.status(201).send(participant);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Update participant details
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const updatedParticipant = await Participant.findOneAndUpdate(
            { _id: id },
            { $set: req.body }
        )

        return res.status(200).send(updatedParticipant);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

export default router;