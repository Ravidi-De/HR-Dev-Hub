import InternSchema from '../models/IT21833298/Survey'
import ProjectSchema from '../models/IT21833298/Project/index'

export const createSurveyRepo = async ({
  TraineeID,
  TraineeName,
  Description,
  IsReviewed,
  TechnicalProficiency,
  ProblemSolving,
  CommunicationSkills,
  TeamCollaboration,
  Adaptability,
  TimeManagement,
  Creativity,
  AttentiontoDetail,
}) => {
  try {
    const survey = new InternSchema({
      TraineeID,
      TraineeName,
      Description,
      IsReviewed,
      TechnicalProficiency,
      ProblemSolving,
      CommunicationSkills,
      TeamCollaboration,
      Adaptability,
      TimeManagement,
      Creativity,
      AttentiontoDetail,
    })

    await survey.save()
    return { status: 1, reason: 'Survey created.' }
  } catch (error) {
    if (error.code === 11000) {
      return { status: 0, reason: 'Intern already created survey.' }
    }
    console.log(error)
    return { status: 0, reason: 'Unknown' }
  }
}

export const createProjectRepo = async ({
  TraineeID,
  TraineeName,
  description,
  birthday,
  file,
}) => {
  try {
    const project = new ProjectSchema({
      TraineeID,
      TraineeName,
      description,
      birthday,
      file,
    })

    await project.save()
    return { status: 1, reason: 'Project Submitted.' }
  } catch (error) {
    if (error.code === 11000) {
      return { status: 0, reason: 'Intern already submitted the project.' }
    }
    console.log(error)
    return { status: 0, reason: 'Unknown' }
  }
}
// export const updateSessionRepo = async ({
//   sessionId,
//   sessionName,
//   sessionOrganizer,
//   sessionDateTime,
//   location,
//   participantEmails,
//   sessionDesc,
// }) => {
//   const status = await TrainingSession.findByIdAndUpdate(
//     { _id: sessionId },
//     {
//       $set: {
//         sessionName: sessionName,
//         sessionOrganizer: sessionOrganizer,
//         sessionDateTime: sessionDateTime,
//         location: location,
//         participantEmails: participantEmails,
//         sessionDesc: sessionDesc,
//       },
//     }
//   ).catch((err) => {
//     return 0
//   })

//   return status
// }

// export const deleteSessionRepo = async ({ sessionId }) => {
//   const status = await TrainingSession.findByIdAndDelete({
//     _id: sessionId,
//   })

//   return status
// }

// export const getSessionsRepo = async () => {
//   const sessions = await TrainingSession.find({})
//   return sessions
// }

// export const updateAttendanceRepo = async ({
//   sessionId,
//   email,
//   attendance,
// }) => {
//   const status = await TrainingSession.findOneAndUpdate(
//     { _id: sessionId, 'participantEmails.email': email },
//     {
//       $set: {
//         'participantEmails.$.attendance': attendance,
//       },
//     },
//     { new: true }
//   ).catch((err) => {
//     return 0
//   })

//   return status
// }
