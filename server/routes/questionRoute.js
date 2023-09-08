import express from 'express';
import { Question } from '../models/questionModel.js'

const router = express.Router();

// Get random 5 questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.aggregate([
            { $sample: { size: 5 } }, // Randomly select 5 questions
            {
                $project: {
                    questionInWords: 1,
                    imageName: 1,
                    options: ["$option1", "$option2", "$option3", "$option4"]
                }
            }
        ]);

        return res.status(200).send({
            count: questions.length,
            data: questions
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Get answers for the questions
router.post('/GetAnswers', async (req, res) => {
    try {
        const qna = await Question.aggregate([
            {
                $project: {
                    questionInWords: 1,
                    imageName: 1,
                    answer: 1,
                    options: ["$option1", "$option2", "$option3", "$option4"]
                }
            }
        ]);

        res.status(200).send(qna);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})

// Create a new question
router.post('/', async (req, res) => {
    try {
        const newQuestion = {
            questionInWords: req.body.questionInWords,
            imageName: req.body.imageName,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            answer: req.body.answer,
        }

        const answer = await Question.create(newQuestion);

        return res.status(201).send(answer);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
})


export default router;