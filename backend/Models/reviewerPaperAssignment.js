const mongoose = require('mongoose');

const reviewerPaperAssignmentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviewer',
        required: true
    },
    paperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ResearchPaper',
        required: true
    },
    assignedDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['assigned', 'reviewing', 'completed', 'rejected'],
        default: 'assigned'
    },
    comments: {
        type: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                role: {
                    type: String,
                    enum: ['reviewer', 'admin'],
                    required: true
                },
                commentText: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
    }
}, { timestamps: true });

const ReviewerPaperAssignment = mongoose.models.ReviewerPaperAssignment || mongoose.model('ReviewerPaperAssignment', reviewerPaperAssignmentSchema);
module.exports = ReviewerPaperAssignment;
