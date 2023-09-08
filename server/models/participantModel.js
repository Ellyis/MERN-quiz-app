import mongoose from 'mongoose';

const participantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
        },
        timeTaken: {
            type: Number,
        }
    },
    {
        timestamps: true,
    }
)

export const Participant = mongoose.model('Participant', participantSchema);