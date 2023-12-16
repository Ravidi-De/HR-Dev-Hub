import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
  {
    TraineeID: {
      type: String,
      required: true,
      unique: true,
    },
    TraineeName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

//manager database
const InternProject = mongoose.model('InternProject', ProjectSchema)

InternProject.syncIndexes()

export default InternProject
