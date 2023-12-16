import { Joi } from 'celebrate'

// Greetings Validations
export const greetCreateSchema = Joi.object({
  name: Joi.string().required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  message: Joi.string().required(),
  contactNo: Joi.string().required(),
})

export const greetUpdateSchema = Joi.object({
  name: Joi.string().required(),
  position: Joi.string().required(),
  department: Joi.string().required(),
  message: Joi.string().required(),
})
// Greetings Validations End

//Content Space 
export const ContentSpaceSchema = Joi.object({
  empName: Joi.string().required(),
  empQuote: Joi.string().required(),
})

//Content Space End

// Session Validations
export const HRSessionCreateSchema = Joi.object({
  sessionName: Joi.string().required(),
  sessionType: Joi.string().required(),
  sessionStartTimestamp: Joi.number().required(),
  sessionEndTimestamp: Joi.number().required(),
  speaker: Joi.string().required(),
})

export const emailCreateSchema = Joi.object({
  sessionOrganizer: Joi.string().email().required(),
  position: Joi.string().required(),
  participantEmails: Joi.array()
  .items({
    email: Joi.string().email().required()
  })
  .required(),
  department: Joi.string().required(),
  message: Joi.string().required(),
})


// Session Validations End
