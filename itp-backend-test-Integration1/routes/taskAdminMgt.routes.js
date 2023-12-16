import express from 'express'
import { validateData } from '../middleware/joiValidate'
import {
  HRSessionCreateSchema,
  greetCreateSchema,
  greetUpdateSchema,
  ContentSpaceSchema,
  emailCreateSchema
} from '../validations/adminTaskMgt.validations'
import {
  createGreet,
  getGreetings,
  deleteGreeting,
  getGreeting,
  updateGreeting,
  createSession,
  createContent,
  getHRSession,
  getHRSessionById,
  updateHRSession,
  deleteHRSession,
  getContent,
  uploadImage,
  createEmail
} from '../controllers/TaskAdminMgt.controller'
import { authorize } from '../middleware/authorize'

const AdminTaskRouter = express.Router()

// Greeting
AdminTaskRouter.post(
  '/greetings',
  authorize(['admin']),
  validateData(greetCreateSchema),
  createGreet
)
AdminTaskRouter.put(
  '/greetings/:id',
  authorize(['admin']),
  validateData(greetUpdateSchema),
  updateGreeting
)
AdminTaskRouter.get('/greetings', authorize(['admin']), getGreetings)
AdminTaskRouter.get('/greetings/:id', authorize(['admin']), getGreeting)
AdminTaskRouter.delete('/greetings/:id', authorize(['admin']), deleteGreeting)
// Greetings End

//Conten Space

AdminTaskRouter.post(
  '/content',
  authorize('admin'),
  validateData(ContentSpaceSchema),
  createContent
)

AdminTaskRouter.get(
  '/content',
  authorize(['admin']), 
  getContent
)

AdminTaskRouter.post(
  '/upload', 
  authorize(['admin']), 
  uploadImage
);

//Content Space

// HR Sessions
AdminTaskRouter.post(
  '/email/schedule',
  authorize(['admin']),
  validateData(emailCreateSchema),
  createEmail
)

AdminTaskRouter.post(
  '/session',
  authorize(['admin']),
  validateData(HRSessionCreateSchema),
  createSession
)

AdminTaskRouter.get(
  '/hrsession',
  authorize(['admin']), 
  getHRSession
)

AdminTaskRouter.get(
  '/hrsession/:id',
  authorize(['admin']),
  getHRSessionById
)

AdminTaskRouter.put(
  '/edithrsession/:id',
  authorize(['admin']),
  validateData(HRSessionCreateSchema),
  updateHRSession
)

AdminTaskRouter.delete(
  '/hrsession/:id',
  authorize(['admin']),
  deleteHRSession
)

// HR Sessions End

export default AdminTaskRouter
