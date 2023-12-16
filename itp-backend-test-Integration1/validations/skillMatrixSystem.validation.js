import { Joi } from 'celebrate'

export const surveyCreateSchema = Joi.object({
  TraineeID: Joi.string().required(),
  TraineeName: Joi.string().required(),
  Description: Joi.string().required(),
  IsReviewed: Joi.boolean().required(),
  TechnicalProficiency: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  ProblemSolving: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  CommunicationSkills: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  TeamCollaboration: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  Adaptability: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  TimeManagement: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  Creativity: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  AttentiontoDetail: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
})

export const surveyUpdateSchema = Joi.object({
  IsReviewed: Joi.boolean().required(),
  TechnicalProficiency: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  ProblemSolving: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  CommunicationSkills: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  TeamCollaboration: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  Adaptability: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  TimeManagement: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  Creativity: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
  AttentiontoDetail: Joi.object({
    intern: Joi.number().required(),
    manager: Joi.number().required(),
  }),
})

export const projectCreateSchema = Joi.object({
  TraineeID: Joi.string().required(),
  TraineeName: Joi.string().required(),
  Birth: Joi.date().required(),
  Description: Joi.string().required(),
  File: Joi.string().required(),
})
