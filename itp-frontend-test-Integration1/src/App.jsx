import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Logout } from './pages/common'

// Page  Imports from bellow
import Home from './pages/home'
import ManagerLogin from './pages/login/manager'
import InternLogin from './pages/login/intern'
import AdminLogin from './pages/login/admin'
import {
  TrainingScheduleMgtAdminDashboard,
  CreateSessionPage,
  TrainingScheduleMgtAdminLogin,
  TrainingScheduleMgtInternLogin,
  TrainingScheduleMgtManagerDashboard,
  TrainingScheduleMgtManagerLogin,
  TrainingScheduleMgtInternDashboard,
  AdminViewSessionsPage,
  AdminViewSessionPage,
  EditSessionPage,
  ManagerViewSessionsPage,
  ManagerViewSessionPage,
} from './pages/training-schedule-mgt'
import ActivityMgtDashboard from './pages/activity-mgt-systm/dashboard'
import InstructorLogin from './pages/activity-mgt-systm/login'
import Activity from './pages/activity-mgt-systm/activity'
import Member from './pages/activity-mgt-systm/member'
import CreateActivity from './pages/activity-mgt-systm/activity/create'
import AddMember from './pages/activity-mgt-systm/member/addMember'
import ActivityReport from './pages/activity-mgt-systm/report'
import SummarySheet from './pages/activity-mgt-systm/summarySheet'
import {
  AdminAttendanceDashboard,
  EmployeeDashboard,
  RequestQR,
  CreateQR,
  QRCodeScanner,
  ATAdminLogin,
  EmployeeLogin,
  ViewRecord,
  ATManagerLogin,
} from './pages/attendance-tracker'
import {
  CreateProfile,
  FinancialDashboard,
  ViewProfile,
  PaymentProfileDashboard,
  UpdateProfile,
} from './pages/payment-mgt'
import {
  CreateTrainee,
  HRManagerDashboard,
  SendInquiries,
  ViewTrainees,
  SignaturePad,
  AddTrainees,
  ViewEmpProfile,
  UpdateTrainee,
} from './pages/profile-mgt'

import {
  AdminLeaveDashboard,
  UpdateLeaveStatus,
  ViewLeaveAdmin,
  CreateLeave,
  UpdateLeaveEMP,
  ViewLeaveEmp,
  ViewLeavesEMP,
} from './pages/leave-mgt'

import {
  IEDashboard,
  IELogin,
  OnJobTraining,
  PEDashboard,
  PELogin,
  QECreateExam,
  QEDashboard,
  QEEditExam,
  QEEvaluate,
  QELogin,
  TmReqForm,
} from './pages/inline-product'
import {
  TraineeCreateDiary,
  TraineeDiaryDashboard,
  TraineeDiaryInternLogin,
  EditDiary,
  ViewDiary,
} from './pages/trainee-diary'
import HRAdminLogin from './pages/admin-task-mgt/login'
import AdminTaskMgtDashboard from './pages/admin-task-mgt/dashboard'
import {
  AdminTaskMgtGreetingsPage,
  EmailScheduler,
  Scheduler,
  SessionScheduler,
  SubmitGreet,
  ViewGreet,
  ViewGreets,
  ContentSpace,
  AddContent,
  InternContentSpace,
  ViewHRSession,
  HRViewSessionPage,
  EditHRSessionPage,
} from './pages/admin-task-mgt'
import QEViewExam from './pages/inline-product/QE/ViewExam'

import {
  SkillMatrixInternDashboard,
  SkillMatrixInternFeedback,
  SkillMatrixInternLogin,
  SkillMatrixInternProject,
  SkillMatrixInternSurvey,
  SkillMatrixManagerDashboard,
  SkillMatrixManagerEvaluateSurvey,
  SkillMatrixManagerLogin,
  SkillMatrixManagerProject,
  SkillMatrixManagerReceivedSurvey,
  SkillMatrixReportSubmission,
} from './pages/skill-matrix'

// =================================================================================
function App() {
  useEffect(() => {
    document.title = 'HR DevHub'
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Misc Routes */}
        <Route path="/logout" element={<Logout />} />
        {/* Misc Routes */}

        {/* Login Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/manager" element={<ManagerLogin />} />
        <Route path="/login/intern" element={<InternLogin />} />
        {/* Login Routes */}

        {/* Admin Task Management Routes - AKILA ====================================== */}
        <Route path="/admin-task-mgt/login" element={<HRAdminLogin />} />
        <Route
          path="/admin-task-mgt/dashboard"
          element={<AdminTaskMgtDashboard />}
        />
        <Route
          path="/admin-task-mgt/greetings"
          element={<AdminTaskMgtGreetingsPage />}
        />
        <Route path="/admin-task-mgt/greetings/view" element={<ViewGreets />} />
        <Route
          path="/admin-task-mgt/greetings/view/:id"
          element={<ViewGreet />}
        />
        <Route
          path="/admin-task-mgt/greetings/create"
          element={<SubmitGreet />}
        />
        <Route
          path="/admin-task-mgt/content-space"
          element={<ContentSpace />}
        />
        <Route
          path="/admin-task-mgt/intern-content-space"
          element={<InternContentSpace />}
        />
        <Route path="/admin-task-mgt/content-space/add" element={<AddContent/>}/>
        <Route path="/admin-task-mgt/scheduler" element={<Scheduler />} />
        <Route
          path="/admin-task-mgt/scheduler/email-scheduler"
          element={<EmailScheduler />}
        />
        <Route
          path="/admin-task-mgt/scheduler/session-scheduler"
          element={<SessionScheduler />}
        />
        <Route
          path="/admin-task-mgt/scheduler/view-session"
          element={<ViewHRSession />}
        />
        <Route
          path="/admin-task-mgt/scheduler/session/:id"
          element={<HRViewSessionPage />}
        />
        <Route
          path="/admin-task-mgt/scheduler/session/edit/:id"
          element={<EditHRSessionPage />}
        />

        {/* Admin Task Management Routes End - AKILA ====================================== */}

        {/* Training Schedule Management Routes - SHALINDA ====================================== */}
        <Route
          path="/training-schedule-mgt/admin/dashboard"
          element={<TrainingScheduleMgtAdminDashboard />}
        />
        <Route
          path="/training-schedule-mgt/manager/dashboard"
          element={<TrainingScheduleMgtManagerDashboard />}
        />
        <Route
          path="/training-schedule-mgt/intern/dashboard"
          element={<TrainingScheduleMgtInternDashboard />}
        />
        <Route
          path="/training-schedule-mgt/admin/sessions/create"
          element={<CreateSessionPage />}
        />
        <Route
          path="/training-schedule-mgt/admin/sessions/edit/:id"
          element={<EditSessionPage />}
        />
        <Route
          path="/training-schedule-mgt/admin/login"
          element={<TrainingScheduleMgtAdminLogin />}
        />
        <Route
          path="/training-schedule-mgt/manager/login"
          element={<TrainingScheduleMgtManagerLogin />}
        />
        <Route
          path="/training-schedule-mgt/intern/login"
          element={<TrainingScheduleMgtInternLogin />}
        />
        <Route
          path="/training-schedule-mgt/admin/sessions"
          element={<AdminViewSessionsPage />}
        />
        <Route
          path="/training-schedule-mgt/admin/sessions/:id"
          element={<AdminViewSessionPage />}
        />
        <Route
          path="/training-schedule-mgt/manager/sessions"
          element={<ManagerViewSessionsPage />}
        />
        <Route
          path="/training-schedule-mgt/manager/sessions/:id"
          element={<ManagerViewSessionPage />}
        />
        {/* Training Schedule Management Routes - SHALINDA ====================================== */}

        {/* Inline Production Management-SUPUN */}
        <Route
          path="/inline-product-mgt/IE/Login"
          element={<IELogin />}
        ></Route>
        <Route
          path="/inline-product-mgt/PE/Dashboard"
          element={<PEDashboard />}
        ></Route>

        <Route
          path="/inline-product-mgt/PE/Login"
          element={<PELogin />}
        ></Route>

        <Route
          path="/inline-product-mgt/QE/Login"
          element={<QELogin />}
        ></Route>

        <Route
          path="/inline-product-mgt/QE/Dashboard"
          element={<QEDashboard />}
        ></Route>

        <Route
          path="/inline-product-mgt/IE/Dashboard"
          element={<IEDashboard />}
        ></Route>

        <Route
          path="/inline-product-mgt/IE/TMReq"
          element={<TmReqForm />}
        ></Route>

        <Route
          path="/inline-product-mgt/IE/OnJobTraining"
          element={<OnJobTraining />}
        ></Route>

        <Route
          path="/inline-product-mgt/QE/create-exam"
          element={<QECreateExam />}
        ></Route>
        <Route
          path="/inline-product-mgt/QE/edit-exam/:id"
          element={<QEEditExam />}
        ></Route>
        <Route
          path="/inline-product-mgt/QE/evaluate"
          element={<QEEvaluate />}
        ></Route>
        <Route
          path="/inline-product-mgt/QE/view-exam/:id"
          element={<QEViewExam />}
        ></Route>
        {/* ATTENDANCE TRACKER ROUTES - SANDUN */}

        {/* Training School Activity Management Routes ====================================== */}
        <Route
          path="/training-scl-activity-mgt/login"
          element={<InstructorLogin />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/dashboard"
          element={<ActivityMgtDashboard />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/activity"
          element={<Activity />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/activity/create"
          element={<CreateActivity />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/member"
          element={<Member />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/member/addMember"
          element={<AddMember />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/report"
          element={<ActivityReport />}
        ></Route>
        <Route
          path="/training-scl-activity-mgt/summarysheet"
          element={<SummarySheet />}
        ></Route>
        {/* Training School Activity Management Routes ====================================== */}

        {/* ATTENDANCE TRACKER ROUTES - SANDUN ====================================== */}
        {/* ATTENDANCE TRACKER ROUTES - SANDUN */}

        {/* EMPLOYEE Login*/}
        <Route path="/attendance-tracker" element={<EmployeeLogin />} />

        {/* Admin Login*/}
        <Route path="/attendance-tracker/adlogin" element={<ATAdminLogin />} />

        {/* Manager Login for Scanner*/}
        <Route
          path="/attendance-tracker/scannerlogin"
          element={<ATManagerLogin />}
        />

        <Route
          path="/attendance-tracker/adminDashboard"
          element={<AdminAttendanceDashboard />}
        />

        {/* EMPLOYEE ATTENDANCE VIEW Record */}
        <Route path="/attendance-tracker/view/:id" element={<ViewRecord />} />

        {/* EMPLOYEE ATTENDANCE HOME */}
        <Route
          path="/attendance-tracker/employeeDashboard"
          element={<EmployeeDashboard />}
        />

        {/* QR Create WINDOW */}
        <Route path="/attendance-tracker/newQR" element={<CreateQR />} />

        {/* QR SCANNER WINDOW */}
        <Route path="/attendance-tracker/scanner" element={<QRCodeScanner />} />

        {/* QR REQUEST FORM */}
        <Route
          path="/attendance-tracker/employeeDashboard/qrRequest"
          element={<RequestQR />}
        />

        {/* PAYMENT MANAGER */}

        {/* PAYMENT DASHBOARD */}
        <Route
          path="/payment-manager/dashboard"
          element={<FinancialDashboard />}
        />

        {/* VIEW PAYMENT PROFILES */}
        <Route
          path="/payment-manager/profiles"
          element={<PaymentProfileDashboard />}
        />

        {/* VIEW PAYMENT PROFILE */}
        <Route
          path="/payment-manager/profiles/view/:id"
          element={<ViewProfile />}
        />

        {/* CREATE PAYMENT PROFILE */}
        <Route
          path="/payment-manager/profiles/create"
          element={<CreateProfile />}
        />

        {/* UPDATE PAYMENT PROFILE */}
        <Route
          path="/payment-manager/profiles/update/:id"
          element={<UpdateProfile />}
        />

        {/* ATTENDANCE TRACKER ROUTES END - SANDUN */}

        {/* PROFILE MANAGEMENT ROUTES START - HANSAKA */}

        <Route
          path="/profile-mgt/HRmanager/dashboard"
          element={<HRManagerDashboard />}
        ></Route>

        <Route
          path="/profile-mgt/ViewTrainees/view"
          element={<ViewTrainees />}
        ></Route>

        <Route
          path="/profile-mgt/CreateTrainee/create/:id"
          element={<CreateTrainee />}
        ></Route>

        <Route
          path="/profile-mgt/SendInquries/Inquiries"
          element={<SendInquiries />}
        ></Route>

        <Route
          path="/profile-mgt/SignaturePad/signature"
          element={<SignaturePad />}
        ></Route>

        <Route
          path="/profile-mgt/AddTrainees/add"
          element={<AddTrainees />}
        ></Route>

        <Route
          path="/profile-mgt/ViewEmpProfile/profile/:id"
          element={<ViewEmpProfile />}
        ></Route>

        <Route
          path="/profile-mgt/UpdateTrainee/update/:id"
          element={<UpdateTrainee />}
        ></Route>

        {/* PROFILE MANAGEMENT ROUTES END - HANSAKA */}
        {/* Intern end */}

        {/* Leave Management */}
        {/* Admin */}
        <Route
          path="/leave-manager/adminDashboard"
          element={<AdminLeaveDashboard />}
        />
        <Route
          path="/leave-manager/adminUpdate/:id"
          element={<UpdateLeaveStatus />}
        />
        <Route
          path="/leave-manager/adminView/:id"
          element={<ViewLeaveAdmin />}
        />

        {/* Employee */}
        <Route path="/leave-manager/empDashboard" element={<ViewLeavesEMP />} />
        <Route
          path="/leave-manager/empUpdate/:id"
          element={<UpdateLeaveEMP />}
        />
        <Route path="/leave-manager/empView/:id" element={<ViewLeaveEmp />} />
        <Route path="/leave-manager/create" element={<CreateLeave />} />

        {/* ATTENDANCE TRACKER ROUTES END - SANDUN ====================================== */}

        {/* Trainee Diary System Routes - RAVIDI ====================================== */}
        <Route
          path="/trainee-diary/login"
          element={<TraineeDiaryInternLogin />}
        />
        <Route
          path="/trainee-diary/dashboard"
          element={<TraineeDiaryDashboard />}
        />
        <Route path="/trainee-diary/create" element={<TraineeCreateDiary />} />
        <Route path="/trainee-diary/edit/:id" element={<EditDiary />} />
        <Route path="/trainee-diary/view/:id" element={<ViewDiary />} />
        {/* Trainee Diary System Routes END - RAVIDI ====================================== */}

        {/* LOGOUT */}
        <Route path="/logout" element={<Home />} />

        {/* Skill Matrix System Routes */}
        <Route
          path="/skill-matrix/Intern/dashboard"
          element={<SkillMatrixInternDashboard />}
        ></Route>
        <Route
          path="/skill-matrix/Manager/dashboard"
          element={<SkillMatrixManagerDashboard />}
        ></Route>
        <Route
          path="/skill-matrix/Intern/survey"
          element={<SkillMatrixInternSurvey />}
        ></Route>
        <Route
          path="/skill-matrix/survey/Manager/received"
          element={<SkillMatrixManagerReceivedSurvey />}
        ></Route>

        <Route
          path="/skill-matrix/survey/Manager/evaluate/:id"
          element={<SkillMatrixManagerEvaluateSurvey />}
        ></Route>
        <Route
          path="/skill-matrix/Intern/login"
          element={<SkillMatrixInternLogin />}
        ></Route>
        <Route
          path="/skill-matrix/Manager/login"
          element={<SkillMatrixManagerLogin />}
        ></Route>
        <Route
          path="/skill-matrix/Intern/project"
          element={<SkillMatrixInternProject />}
        ></Route>
        <Route
          path="/skill-matrix/Manager/project"
          element={<SkillMatrixManagerProject />}
        ></Route>
        <Route
          path="/skill-matrix/Intern/feedback"
          element={<SkillMatrixInternFeedback />}
        ></Route>
        <Route
          path="/skill-matrix/Manager/ReportSubmission"
          element={<SkillMatrixReportSubmission />}
        ></Route>
        {/* Skill Matrix System Routes */}

        {/* 404 Page Not Found */}
        <Route path="*" element={<>404 Page Not Found</>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
