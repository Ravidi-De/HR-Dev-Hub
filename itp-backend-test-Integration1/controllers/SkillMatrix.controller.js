import {
  createProjectRepo,
  createSurveyRepo,
} from '../repository/skillMatrix.intern.repository'
import {
  deleteSurveyRepo,
  getsurveyMrepo,
  getsurveysMrepo,
  updateSurveyRepo,
} from '../repository/skillMatrix.manager.repository'

import { sendEmail } from '../utils/email'

//create
export const CreateSurvey = async (req, res) => {
  const { status, reason } = await createSurveyRepo({ ...req.body })
  if (status == 0) {
    return res.status(400).json({ data: reason })
  }
  return res.json({ data: reason })
}

//update
export const updatesurvey = async (req, res) => {
  if (req.params.id == undefined || req.params.id == '') {
    return res.status(400).json({ error: 'Survey ID is required' })
  }

  const surveyId = req.params.id
  const status = await updateSurveyRepo({ surveyId, ...req.body })
  if (status == 0) {
    return res.status(404).json({ data: 'Survey not found.' })
  }

  //     // Send emails
  //     for (const participant of req.body.participantEmails) {
  //       await sendEmail({
  //         from: 'No Reply <sliitproj@gmail.com>',
  //         recipient: participant.email,
  //         subject: 'Session Updated',
  //         greeting: 'Hello User',
  //         emailBody: `Your session "${
  //           req.body.sessionName
  //         }" have been updated successfully. Which will be held on ${sessionDateTime.toLocaleDateString(
  //           'en-US'
  //         )} at ${sessionDateTime.getHours()}:${sessionDateTime.getMinutes()}. Hope to see you there!`,
  //       })
  //     }

  return res.status(200).json({ data: 'Survey updated successfully.' })
}

//read
export const getsurveysM = async (req, res) => {
  const survey = await getsurveysMrepo()
  return res.status(200).json(survey)
}

export const getsurveyM = async (req, res) => {
  if (req.params.id == undefined || req.params.id == '') {
    return res.status(400).json({ error: 'Survey ID is required' })
  }

  const surveyId = req.params.id
  const survey = await getsurveyMrepo({ surveyId })
  if (survey == null) {
    return res.status(404).json({ data: 'survey not found.' })
  }

  return res.status(200).json(survey)
}

//delete
export const deleteSurvey = async (req, res) => {
  if (req.params.id == undefined || req.params.id == '') {
    return res.status(400).json({ error: 'Survey ID is required' })
  }

  const surveyId = req.params.id
  const status = await deleteSurveyRepo({ surveyId })
  if (status == null) {
    return res.status(404).json({ data: 'Survey not found.' })
  }

  //     // Send emails
  //     for (const participant of status.participantEmails) {
  //       await sendEmail({
  //         from: 'No Reply <sliitproj@gmail.com>',
  //         recipient: participant.email,
  //         subject: 'Session Cancelled',
  //         greeting: 'Hello User',
  //         emailBody: `Your session "${status.sessionName}" have been canceled by the admin.`,
  //       })
  //     }
  return res.status(200).json({ data: 'Survey deleted successfully.' })
}

export const CreateProject = async (req, res) => {
  const { status, reason } = await createProjectRepo({ ...req.body })
  if (status == 0) {
    return res.status(400).json({ data: reason })
  }
  return res.json({ data: reason })
}

//   export const updateAttendance = async (req, res) => {
//     if (req.params.id == undefined || req.params.id == '') {
//       return res.status(400).json({ error: 'Session ID is required' })
//     }

//     const sessionId = req.params.id
//     const status = await updateAttendanceRepo({ sessionId, ...req.body })
//     if (!status) {
//       return res.status(404).json({ data: 'Session not found.' })
//     }

//     return res.status(200).json({ data: 'Session updated successfully.' })
//   }
