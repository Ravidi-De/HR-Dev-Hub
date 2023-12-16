import Survey from '../models/IT21833298/Survey'

export const getsurveysMrepo = async () => {
  const survey = await Survey.find({})
  return survey
}

export const getsurveyMrepo = async ({ surveyId }) => {
  const survey = await Survey.findOne({ _id: surveyId })
  return survey
}

export const updateSurveyRepo = async ({
  IsReviewed,
  TechnicalProficiency,
  ProblemSolving,
  CommunicationSkills,
  TeamCollaboration,
  Adaptability,
  TimeManagement,
  Creativity,
  AttentiontoDetail,
  surveyId,
}) => {
  const status = await Survey.findByIdAndUpdate(
    { _id: surveyId },
    {
      $set: {
        IsReviewed,
        TechnicalProficiency,
        ProblemSolving,
        CommunicationSkills,
        TeamCollaboration,
        Adaptability,
        TimeManagement,
        Creativity,
        AttentiontoDetail,
      },
    }
  ).catch((err) => {
    return 0
  })

  return status
}

export const deleteSurveyRepo = async ({ surveyId }) => {
  const status = await Survey.findByIdAndDelete({
    _id: surveyId,
  })

  return status
}
