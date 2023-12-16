import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faChartSimple,
  faCircleExclamation,
  faFile,
  faHome,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard, Loader, Toast } from '../../../components/common'
import { BasicTable } from '../../../components/IT21833298'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { axiosInstance } from '../../../config'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

const SkillMatrixManagerEvaluateSurvey = () => {
  let { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [surveyData, setSurveyData] = useState({})
  const [matrixInternValues, setInternMatrixValues] = useState({
    TechnicalProficiency: 0,
    ProblemSolving: 0,
    CommunicationSkills: 0,
    TeamCollaboration: 0,
    Adaptability: 0,
    TimeManagement: 0,
    Creativity: 0,
    AttentiontoDetail: 0,
  })

  const [matrixManagerValues, setMatrixManagerValues] = useState({
    TechnicalProficiency: 0,
    ProblemSolving: 0,
    CommunicationSkills: 0,
    TeamCollaboration: 0,
    Adaptability: 0,
    TimeManagement: 0,
    Creativity: 0,
    AttentiontoDetail: 0,
  })

  useEffect(() => {
    document.title = 'Skill Matrix Intern Dashboard'

    axiosInstance.get(`/sms/survey/${id}`).then((res) => {
      setSurveyData(res.data)

      setInternMatrixValues((prevMatrixValues) => ({
        ...prevMatrixValues,
        TechnicalProficiency: res.data.TechnicalProficiency.intern,
        ProblemSolving: res.data.ProblemSolving.intern,
        CommunicationSkills: res.data.CommunicationSkills.intern,
        TeamCollaboration: res.data.TeamCollaboration.intern,
        Adaptability: res.data.Adaptability.intern,
        TimeManagement: res.data.TimeManagement.intern,
        Creativity: res.data.Creativity.intern,
        AttentiontoDetail: res.data.AttentiontoDetail.intern,
      }))

      setMatrixManagerValues((prevMatrixValues) => ({
        ...prevMatrixValues,
        TechnicalProficiency: res.data.TechnicalProficiency.manager,
        ProblemSolving: res.data.ProblemSolving.manager,
        CommunicationSkills: res.data.CommunicationSkills.manager,
        TeamCollaboration: res.data.TeamCollaboration.manager,
        Adaptability: res.data.Adaptability.manager,
        TimeManagement: res.data.TimeManagement.manager,
        Creativity: res.data.Creativity.manager,
        AttentiontoDetail: res.data.AttentiontoDetail.manager,
      }))
    })
  }, [])

  // Inside SkillMatrixManagerEvaluateSurvey
  const tableTypes = [
    {
      type: 'TechnicalProficiency',
      display: 'Technical Proficiency',
      id: 'TechnicalProficiencyId',
    },
    {
      type: 'ProblemSolving',
      display: 'Problem Solving',
      id: 'ProblemSolvingId',
    },
    {
      type: 'CommunicationSkills',
      display: 'Communication Skills',
      id: 'CommunicationSkillsId',
    },
    {
      type: 'TeamCollaboration',
      display: 'Team Collaboration',
      id: 'TeamCollaborationId',
    },
    { type: 'Adaptability', display: 'Adaptability', id: 'AdaptabilityId' },
    { type: 'TimeManagement', display: 'Time Management', id: 'TimeManaId' },
    { type: 'Creativity', display: 'Creativity', id: 'CreativityId' },
    {
      type: 'AttentiontoDetail',
      display: 'Attention to Detail',
      id: 'AttentiontoDetailId',
    },
    // Add more types and IDs as needed
  ]

  const handleFormSubmit = () => {
    setIsLoading(true)

    //request structure
    const payload = {
      IsReviewed: true,
      TechnicalProficiency: {
        intern: matrixInternValues.TechnicalProficiency,
        manager: matrixManagerValues.TechnicalProficiency,
      },
      ProblemSolving: {
        intern: matrixInternValues.ProblemSolving,
        manager: matrixManagerValues.ProblemSolving,
      },
      CommunicationSkills: {
        intern: matrixInternValues.CommunicationSkills,
        manager: matrixManagerValues.CommunicationSkills,
      },
      TeamCollaboration: {
        intern: matrixInternValues.TeamCollaboration,
        manager: matrixManagerValues.TeamCollaboration,
      },
      Adaptability: {
        intern: matrixInternValues.Adaptability,
        manager: matrixManagerValues.Adaptability,
      },
      TimeManagement: {
        intern: matrixInternValues.TimeManagement,
        manager: matrixManagerValues.TimeManagement,
      },
      Creativity: {
        intern: matrixInternValues.Creativity,
        manager: matrixManagerValues.Creativity,
      },
      AttentiontoDetail: {
        intern: matrixInternValues.AttentiontoDetail,
        manager: matrixManagerValues.AttentiontoDetail,
      },
    }

    axiosInstance
      .put(`/sms/survey/${id}`, payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Survey updated successfully.',
        })
      })
      .catch((error) => {
        if (error.code == 'ERR_NETWORK')
          return Toast('Cannot connect with backend API.', 'error', {})
        Toast(error.response.data.data, 'error', {})
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const formik = useFormik({
    initialValues: {
      TraineeID: surveyData.TraineeID,
      TraineeName: surveyData.TraineeName,
      Description: surveyData.Description,
    },
    validationSchema: Yup.object({
      TraineeID: Yup.string().required('Please enter a Trainee id.'),
      TraineeName: Yup.string().required('Enter organizer employee email.'),
      Description: Yup.string().required('Please enter a your Description.'),
    }),
    enableReinitialize: true,
    onSubmit: () => handleFormSubmit(),
  })

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Dashboard
          sectionLinks={[
            {
              section: 'Options',
              children: [
                {
                  path: '#',
                  name: 'Skill Survey',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faFile}
                    />
                  ),
                },
                {
                  path: '#',
                  name: 'Projects',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faChartSimple}
                    />
                  ),
                },
                {
                  path: '/skill-matrix/manager/dashboard',
                  name: 'Dashboard',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faHome}
                    />
                  ),
                },
                {
                  path: '/logout',
                  name: 'Logout',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faArrowRightFromBracket}
                    />
                  ),
                },
              ],
            },
          ]}
        >
          <div className="block my-6 mb-5 p-8">
            <p className="text-3xl font-semibold mb-2">Skill Survey</p>
          </div>
          <form onSubmit={formik.handleSubmit} className="my-3 m-1 p-8">
            <div className="grid grid-cols-1 xl:grid-cols-2">
              <div className="col lg:mr-4">
                {/* Trainee name */}
                <div className="mb-8">
                  <label
                    htmlFor="trainee-name"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Trainee Name:
                  </label>
                  <input
                    type="text"
                    id="TraineeName"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    required
                    value={formik.values.TraineeName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.TraineeName && formik.touched.TraineeName ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.TraineeName}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Trainee name End */}

                <div className="grid grid-cols-1 lg:grid-cols-2"></div>
              </div>

              <div className="col lg:ml-4 m-1">
                {/* Trainee Id: */}
                <div className="mb-8">
                  <label
                    htmlFor="traineee-id"
                    className="block mb-2 text-xl font-medium text-gray-900"
                  >
                    Trainee Id:
                  </label>
                  <input
                    type="text"
                    id="TraineeID"
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="..."
                    required
                    value={formik.values.TraineeID}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.TraineeID && formik.touched.TraineeID ? (
                    <div className="error text-red-400 p-4 text-lg">
                      <FontAwesomeIcon
                        className="mr-4 text-2xl"
                        icon={faCircleExclamation}
                      />
                      {formik.errors.TraineeID}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                {/* Trainee Id): End */}
              </div>
            </div>

            {/* Description: */}
            <div className="mb-8 m-1">
              <label
                htmlFor="description"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Description:
              </label>
              <textarea
                id="Description"
                rows="4"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="..."
                value={formik.values.Description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.errors.Description && formik.touched.Description ? (
                <div className="error text-red-400 p-4 text-lg">
                  <FontAwesomeIcon
                    className="mr-4 text-2xl"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.Description}
                </div>
              ) : (
                ''
              )}
            </div>
            {/* Description: End */}

            <div>
              <p className="text-2xl font-bold mb-2">Evaluation</p>
              <p className="text-lg font-semibold mb-2">
                Rank your skills (1 = worst, 5 = best)
              </p>
            </div>

            <div className="grid grid-cols-4 xl:grid-cols-2 m-auto overflow-x-scroll">
              <div className="flex">
                <div>
                  <BasicTable
                    values={matrixInternValues}
                    handleChange={setInternMatrixValues}
                    tableTypes={tableTypes}
                    isDisabled={true}
                  />
                </div>
                <div>
                  <BasicTable
                    values={matrixManagerValues}
                    handleChange={setMatrixManagerValues}
                    tableTypes={tableTypes}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="m-auto">
              <button
                type="submit"
                className="text-xl border-2 border-[#A4161A] text-[#A4161A] hover:bg-[#A4161A] hover:text-white rounded-lg px-5 py-2.5 my-4 w-72 block mx-auto mb-8"
              >
                Submit
              </button>
            </div>
          </form>
        </Dashboard>
      )}
    </>
  )
}

export default SkillMatrixManagerEvaluateSurvey
