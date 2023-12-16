import Greeting from '../models/Greetings'
import HRSession from '../models/HRSessions'
import Content from '../models/Content'
import EmailSchedule from '../models/Emails'

// Greeting Repo
export const createGreetingRepo = async ({
  name,
  position,
  department,
  message,
  contactNo,
}) => {
  const greet = new Greeting({
    name,
    position,
    department,
    message,
    contactNo,
  })

  const status = await greet.save()
  return status
}

export const updateSessionRepo = async ({
  greetId,
  name,
  position,
  department,
  message,
}) => {
  const status = await Greeting.updateOne(
    { _id: greetId },
    {
      $set: {
        name,
        position,
        department,
        message,
      },
    }
  ).catch((err) => {
    return 0
  })

  return status
}

export const getGreetingsRepo = async () => {
  const greets = await Greeting.find({})
  return greets
}

export const getGreetingRepo = async ({ greetId }) => {
  const greet = await Greeting.findOne({ _id: greetId })
  return greet
}

export const deleteGreetingRepo = async ({ greetId }) => {
  const status = await Greeting.findByIdAndDelete({
    _id: greetId,
  })

  return status
}
// Greeting Repo End

//Content Space Repo

export const createContentRepo = async ({
  empName,
  empQuote
}) => {
  const content = new Content({
    empName,
    empQuote,
  })

  const status = await content.save()
  return status
}

export const getContentRepo = async () => {
  const greets = await Content.find({})
  return greets
}

export const uploadImage = async ({
  name, 
  data, 
}) => {
  try {
    const image = new Image({
      name, 
      data, 
  })
  const status = await image.save()
  return status
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};

// Content Space Repo End

// Session Repo
export const createEmailRepo = async ({
  name,
  sessionOrganizer,
  position,
  participantEmails,
  department,
  message,
}) => {
  const email = new EmailSchedule({
    name: name,
    sessionOrganizer: sessionOrganizer,
    position: position,
    participantEmails: participantEmails,
    department: department,
    message: message,
  })

  const status = await email.save()
  return status
}

export const createSessionRepo = async ({
  sessionName,
  sessionType,
  sessionStartTimestamp,
  sessionEndTimestamp,
  speaker,
}) => {
  const session = new HRSession({
    sessionName,
    sessionType,
    sessionStartTimestamp,
    sessionEndTimestamp,
    speaker,
  })

  const status = await session.save()
  return status
}

// export const getHRSessionRepo = async () => HRSession.find({})

export const getHRSessionRepo = async () => {
  const greets = await HRSession.find({})
  return greets
}

export const getHRSessionByIdRepo = async (_id) => HRSession.findById(_id)

export const updateHRSessionRepo = async ({
  sessionId,
  sessionName,
  sessionType,
  sessionStartTimestamp,
  sessionEndTimestamp,
  speaker,
}) => {
  try {
    const status = await HRSession.findByIdAndUpdate(
      { _id: sessionId },
      {
        $set: {
          sessionName: sessionName,
          sessionType: sessionType,
          sessionStartTimestamp: sessionStartTimestamp,
          sessionEndTimestamp: sessionEndTimestamp,
          speaker: speaker,
        },
      }
    )
    return status
  } catch (err) {
    return 0
  }
}

export const deleteHRSessionRepo = async (_id) =>
  HRSession.findByIdAndDelete({ _id })

// Session Repo End
