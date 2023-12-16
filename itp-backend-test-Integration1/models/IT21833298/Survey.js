import mongoose from 'mongoose'

const InternSchema = new mongoose.Schema(
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
    Description: {
      type: String,
      required: true,
    },
    IsReviewed: {
      type: Boolean,
      required: true,
    },

    //skills
    TechnicalProficiency: {
      intern: {
        type: Number,
        required: true,
      },
      manager: {
        type: Number,
        required: true,
      },
    },
    ProblemSolving: {
      intern: {
        type: Number,
        required: true,
      },
      manager: {
        type: Number,
        required: true,
      },
    },
    CommunicationSkills: {
      intern: {
        type: Number,
        required: true,
      },
      manager: {
        type: Number,
        required: true,
      },
    },
    TeamCollaboration: {
      intern: {
        type: Number,
        required: true,
      },
      manager: {
        type: Number,
        required: true,
      },
    },
    Adaptability: {
      intern: {
        type: Number,
        required: true,
      },
      manager: {
        type: Number,
        required: true,
      },
    },
    TimeManagement: {
      intern: {
        type: Number,
        required: true,
      },
      manager: {
        type: Number,
        required: true,
      },
    },
    Creativity: {
      intern: {
        type: Number,
        required: true,
      },
      manager: {
        type: Number,
        required: true,
      },
    },
    AttentiontoDetail: {
      intern: {
        type: Number,
        required: true,
      },
      manager: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

//manager database
const Survey = mongoose.model('Survey', InternSchema)

Survey.syncIndexes()

export default Survey
