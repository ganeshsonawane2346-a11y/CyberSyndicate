import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import { Students } from './pages/Students'
import { StudentProfile } from './pages/StudentProfile'
import { Faculty } from './pages/Faculty'
import { FacultyProfile } from './pages/FacultyProfile'
import { Departments } from './pages/Departments'
import { DepartmentDetail } from './pages/DepartmentDetail'
import { Placements } from './pages/Placements'
import { Predictions } from './pages/Predictions'
import { SimulationLab } from './pages/SimulationLab'
import { AIAssistant } from './pages/AIAssistant'
import { Analytics } from './pages/Analytics'
import { DigitalTwin } from './pages/DigitalTwin'
import { Settings } from './pages/Settings'
import { SuperAdmin } from './pages/SuperAdmin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentProfile />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/faculty/:id" element={<FacultyProfile />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/simulation" element={<SimulationLab />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/digital-twin" element={<DigitalTwin />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/super-admin" element={<SuperAdmin />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
