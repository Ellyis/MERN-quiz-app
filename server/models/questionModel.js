import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
    {
        questionInWords: {
            type: String,
            required: true,
        },
        imageName: {
            type: String,
        },
        option1: {
            type: String,
            required: true,
        },
        option2: {
            type: String,
            required: true,
        },
        option3: {
            type: String,
            required: true,
        },
        option4: {
            type: String,
            required: true,
        },
        answer: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

export const Question = mongoose.model('Question', questionSchema);