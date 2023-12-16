import express from 'express'
import { validateData } from '../middleware/joiValidate'
import { authorize } from '../middleware/authorize'
import {
  CreateProject,
  CreateSurvey,
  deleteSurvey,
  getsurveyM,
  getsurveysM,
  updatesurvey,
} from '../controllers/SkillMatrix.controller'

import {
  projectCreateSchema,
  surveyCreateSchema,
  surveyUpdateSchema,
} from '../validations/skillMatrixSystem.validation'

const SkillMatrixRouter = express.Router()

//Skill Matrix routes below
SkillMatrixRouter.post(
  '/survey/create',
  authorize(['intern']),
  validateData(surveyCreateSchema),
  CreateSurvey
)

SkillMatrixRouter.delete('/survey/:id', authorize(['manager']), deleteSurvey)

SkillMatrixRouter.get('/survey/', authorize(['manager']), getsurveysM)

SkillMatrixRouter.get('/survey/:id', authorize(['manager']), getsurveyM)

SkillMatrixRouter.put(
  '/survey/:id',
  authorize(['manager']),
  validateData(surveyUpdateSchema),
  updatesurvey
)

SkillMatrixRouter.post(
  '/project/submit',
  authorize('intern'),
  validateData(projectCreateSchema),
  CreateProject
)

//Skill Matrix routes above

export default SkillMatrixRouter
