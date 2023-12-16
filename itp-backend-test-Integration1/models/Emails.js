import mongoose from 'mongoose'

// Example modal. Cahnge it according to your needs.
const EmailSchema = new mongoose.Schema(
  {
    name: String,
    sessionOrganizer: String,
    position: String,
    participantEmails: Array,
    department: String,
    message: String,
  },
  
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
)

const EmailSchedule = mongoose.model('Email', EmailSchema)

EmailSchedule.syncIndexes()

export default EmailSchedule
