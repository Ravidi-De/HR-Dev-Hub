import {
  createGreetingRepo,
  getGreetingsRepo,
  deleteGreetingRepo,
  getGreetingRepo,
  updateSessionRepo,
  createSessionRepo,
  createContentRepo,
  getHRSessionRepo,
  getHRSessionByIdRepo,
  updateHRSessionRepo,
  deleteHRSessionRepo,
  getContentRepo,
  createEmailRepo
} from '../repository/adminTaskMgt.repository'
import { sendEmail } from '../utils/email'

// Session
export const createEmail = async (req, res) => {
  // Create session
  const status = await createEmailRepo({ ...req.body })
  const sessionDateTime = new Date(req.body.sessionDateTime)

  // Send emails
  for (const participant of req.body.participantEmails) {
    await sendEmail({
      from: 'No Reply <navodanip019@gmail.com>',
      recipient: participant.email,
      subject: 'New Session',
      greeting: 'Hello User',
      emailBody: `Welcome to MAS Bodyline! "${
        req.body.message
      }"`
    })
  }

  return res.json(status)
}

export const createSession = async (req, res) => {
  const status = await createSessionRepo({ ...req.body })
  return res.json(status)
}

export const getHRSession = async (req, res) => {
  const status = await getHRSessionRepo()
  return res.json(status)
}

export const getHRSessionById = async (req, res) => {
  const session = await getHRSessionByIdRepo(req.params.id)
  return res.status(200).json(session)
}

export const updateHRSession = async (req, res) => {
  if (req.params.id == undefined || req.params.id == '') {
    return res.status(400).json({ error: 'Session ID is required' })
  }

  const sessionId = req.params.id
  const status = await updateHRSessionRepo({ sessionId, ...req.body })
  if (status == 0) {
    return res.status(404).json({ data: 'Session not found.' })
  }

  const sessionDateTime = new Date(req.body.sessionStartTimestamp)

  return res.status(200).json({ data: 'Session updated successfully.' })
}

export const deleteHRSession = async (req, res) => {
  if (req.params.id == undefined || req.params.id == '') {
    return res.status(400).json({ error: 'Session ID is required' })
  }

  const sessionId = req.params.id
  const status = await deleteHRSessionRepo(sessionId)
  if (status == null) {
    return res.status(404).json({ data: 'Session not found.' })
  }

  return res.status(200).json({ data: 'Session canceled successfully.' })
}


// Session End

//Content Space

export const createContent = async (req, res) => {
  const status = await createContentRepo({ ...req.body})
  return res.json(status)
}

export const getContent = async (req, res) => {
  const status = await getContentRepo()
  return res.json(status)
}

export const uploadImage = async (req, res) => {
  const status = await createImageRepo({ ...req.body})
  return res.json(status);
};

//Content Space

// Greetings
export const createGreet = async (req, res) => {
  const status = await createGreetingRepo({ ...req.body })
  return res.json(status)
}

export const updateGreeting = async (req, res) => {
  if (req.params.id == undefined || req.params.id == '') {
    return res.status(400).json({ error: 'Greet ID is required' })
  }

  const greetId = req.params.id
  const greet = await updateSessionRepo({ greetId, ...req.body })
  if (greet == 0 || greet == null) {
    return res.status(404).json({ data: 'Greet not found.' })
  }

  return res.status(200).json(greet)
}

export const getGreetings = async (req, res) => {
  const status = await getGreetingsRepo()
  return res.json(status)
}

export const getGreeting = async (req, res) => {
  if (req.params.id == undefined || req.params.id == '') {
    return res.status(400).json({ error: 'Greet ID is required' })
  }

  const greetId = req.params.id
  const greet = await getGreetingRepo({ greetId })
  if (greet == null) {
    return res.status(404).json({ data: 'Greet not found.' })
  }

  return res.status(200).json(greet)
}

export const deleteGreeting = async (req, res) => {
  if (req.params.id == undefined || req.params.id == '') {
    return res.status(400).json({ error: 'Greet ID is required' })
  }

  const greetId = req.params.id
  const status = await deleteGreetingRepo({ greetId })
  if (status == null) {
    return res.status(404).json({ data: 'Greet not found.' })
  }

  return res.status(200).json({ data: 'Greet deleted successfully.' })
}
// Greetings End
