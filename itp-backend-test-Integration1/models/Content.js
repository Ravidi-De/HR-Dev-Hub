import mongoose from "mongoose";

const ContentSpaceSchema = new mongoose.Schema(
    {
        empName: String,
        empQuote: String,
    },
    {
        versionKey: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
      }
)

const Content = mongoose.model('Content', ContentSpaceSchema)

Content.syncIndexes()

export default Content