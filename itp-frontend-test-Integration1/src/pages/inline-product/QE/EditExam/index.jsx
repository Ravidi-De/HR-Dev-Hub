import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressBook,
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faUserGroup,
  faCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Dashboard, Loader, Toast } from '../../../../components/common'
import { axiosInstance } from '../../../../config'
import { useParams } from 'react-router-dom'
import { time24hAdjust } from '../../../../utils/time'
import Swal from 'sweetalert2'

const QEEditExam = () => {
  const { id } = useParams()
  const [examData, setExamData] = useState([])
  const [selectedInternEmails, setSelectedInternEmails] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [participantScores, setParticipantScores] = useState({})
  const [participantStatus, setParticipantStatus] = useState({})
  const [permissionToUpdate, setPermissionToUpdate] = useState(false)

  useEffect(() => {
    document.title = 'Edit a Final Exam'
    axiosInstance.get(`/ipm/exam/${id}`).then((res) => {
      setIsLoading(false)
      let date = new Date(res.data.StartTimestamp)

      // Manipulate fields
      res.data.ExamDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

      res.data.StartTime = time24hAdjust(date.getTime())
      res.data.EndTime = time24hAdjust(
        new Date(res.data.EndTimestamp).getTime()
      )
      // Manipulate fields

      setExamData(res.data)

      // Add email to UI
      let emails = []
      for (const item of res.data.participantEmails) {
        emails.push(item.email)
      }
      setSelectedInternEmails(emails)

      // Initialize participant scores and status
      const initialScores = {}
      const initialStatus = {}
      emails.forEach((email) => {
        initialScores[email] = ''
        initialStatus[email] = ''
      })
      setParticipantScores(initialScores)
      setParticipantStatus(initialStatus)
    })
  }, [id])

  const handleScoreChange = (email, score) => {
    if (score >= 50) {
      setParticipantStatus({ ...participantStatus, [email]: 'Pass' })
    } else {
      setParticipantStatus({ ...participantStatus, [email]: 'Fail' })
    }
    setParticipantScores({ ...participantScores, [email]: score })
  }

  const handlePass = (email) => {
    if (participantScores[email] < 50)
      return Toast(`Cannot pass. Marks must be greater than 50`, 'error', {})

    // Log participantScores and updatedParticipantEmails
    console.log('participantScores:', participantScores)
    console.log('participantScores:', participantScores[email])
    const updatedParticipantEmails = examData.participantEmails.map(
      (participant) => {
        if (participant.email === email) {
          return {
            ...participant,
            results: {
              pass: true,
              fail: false,
            },
            score: participantScores[email],
          }
        }
        return participant
      }
    )

    // setIsLoading(true)
    setExamData({
      ...examData,
      participantEmails: updatedParticipantEmails,
    })
    setPermissionToUpdate(true)
  }

  const handleFail = (email) => {
    if (participantScores[email] >= 50) {
      return Toast(`Cannot fail. Marks must be less than 50`, 'error', {})
    }

    // Filter out the email from the participantEmails array
    const updatedParticipantEmails = examData.participantEmails.filter(
      (participant) => participant.email !== email
    )

    setExamData({
      ...examData,
      participantEmails: updatedParticipantEmails,
    })

    setPermissionToUpdate(true)
  }

  const handleSubmit = () => {
    // setIsLoading(true)
    const payload = {
      ExamType: examData.ExamType,
      InvigilatorEmpID: examData.InvigilatorEmpID,
      Location: examData.Location,
      Materials: examData.Materials,
      Questions: examData.Questions,
      StartTimestamp: new Date(
        `${examData.ExamDate} ${examData.StartTime}`
      ).getTime(),
      EndTimestamp: new Date(
        `${examData.ExamDate} ${examData.EndTime}`
      ).getTime(),
      participantEmails: examData.participantEmails,
    }
    console.log(payload)

    axiosInstance
      .put(`/ipm/exam/${id}`, payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Exam updated successfully.',
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

  useEffect(() => {
    if (permissionToUpdate) {
      handleSubmit()
      setPermissionToUpdate(false)
    }
  }, [examData])

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
                  path: '/inline-product-mgt/QE/create-exam',
                  name: 'Create Exam Paper',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faAddressBook}
                    />
                  ),
                },
                {
                  path: '/inline-product-mgt/QE/evaluate',
                  name: 'Evaluate Exam Papers',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faMagnifyingGlass}
                    />
                  ),
                },
                {
                  path: '/inline-product-mgt/QE/Dashboard',
                  name: 'Dashboard',
                  icon: () => (
                    <FontAwesomeIcon
                      className="mr-4 text-3xl text-gray-300"
                      icon={faUserGroup}
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
          <div className="block my-6 mb-12 p-8">
            <p className="text-3xl text-center font-semibold mb-8">
              Final Examination Paper &quot;{examData.ExamType}&quot;
            </p>
            <p className="text-xl text-center mb-4">
              Exam Date: {examData.ExamDate}
            </p>
            <p className="text-xl text-center mb-4">
              Exam Time: {examData.StartTime} - {examData.EndTime}
            </p>
            <p className="text-xl text-center mb-8">
              Invigilator ID: {examData.InvigilatorEmpID}
            </p>
            <hr />
          </div>

          <div className="headers">
            <div className="grid grid-cols-12">
              <div className="col-span-3 text-center">
                <p className="text-2xl">Participant List</p>
              </div>
              <div className="col-span-3 text-center">
                <p className="text-2xl">Score</p>
              </div>
              <div className="col-span-3 text-center">
                <p className="text-2xl">Status</p>
              </div>
              <div className="col-span-3 text-center">
                <p className="text-2xl">Settings</p>
              </div>
            </div>
          </div>

          {selectedInternEmails.map((email, index) => (
            <div key={index} className="grid grid-cols-12">
              <div className="col-span-3 text-center flex items-center justify-center my-4">
                <p className="text-lg">{email}</p>
              </div>
              <div className="col-span-3 text-center flex items-center justify-center my-4">
                <input
                  type="text"
                  className="block mx-auto w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter score"
                  value={participantScores[email]}
                  onChange={(e) => handleScoreChange(email, e.target.value)}
                />
              </div>
              <div className="col-span-3 text-center flex items-center justify-center my-4">
                {participantStatus[email] === 'Pass' ? (
                  <span className="text-green-500">Pass</span>
                ) : participantStatus[email] === 'Fail' ? (
                  <span className="text-red-500">Fail</span>
                ) : (
                  <span>&mdash;</span>
                )}
              </div>
              <div className="col-span-3 text-center flex items-center justify-center my-4">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-500 cursor-pointer text-2xl mx-2"
                  onClick={() => handlePass(email)}
                />

                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-500 cursor-pointer text-2xl mx-2"
                  onClick={() => handleFail(email)}
                />
              </div>
            </div>
          ))}
        </Dashboard>
      )}
    </>
  )
}

export default QEEditExam
