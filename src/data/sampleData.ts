export const COLLEGE_STATS = {
  totalStudents: 1000,
  totalFaculty: 100,
  departments: 8,
  placementRate: 78,
  averageCGPA: 7.9,
  skillReadinessIndex: 72,
  dropoutRisk: 12,
  academicHealthScore: 81,
  atRiskStudents: 120,
  skillGapStudents: 300,
  predictedPlacementRate: 84,
  placementForecast: 84,
}

export const DEPARTMENTS = [
  { id: 'cse', name: 'Computer Science', students: 180, faculty: 14, healthScore: 88, placementRate: 92, avgCGPA: 8.2, status: 'healthy' as const, research: 24 },
  { id: 'it', name: 'Information Technology', students: 150, faculty: 12, healthScore: 82, placementRate: 85, avgCGPA: 7.8, status: 'healthy' as const, research: 18 },
  { id: 'ece', name: 'Electronics & Comm.', students: 140, faculty: 13, healthScore: 74, placementRate: 76, avgCGPA: 7.6, status: 'warning' as const, research: 15 },
  { id: 'mech', name: 'Mechanical Engineering', students: 130, faculty: 11, healthScore: 68, placementRate: 72, avgCGPA: 7.4, status: 'warning' as const, research: 12 },
  { id: 'civil', name: 'Civil Engineering', students: 120, faculty: 10, healthScore: 62, placementRate: 65, avgCGPA: 7.2, status: 'warning' as const, research: 8 },
  { id: 'eee', name: 'Electrical Engineering', students: 110, faculty: 11, healthScore: 55, placementRate: 58, avgCGPA: 7.0, status: 'critical' as const, research: 6 },
  { id: 'aiml', name: 'AI & Machine Learning', students: 90, faculty: 8, healthScore: 91, placementRate: 94, avgCGPA: 8.4, status: 'healthy' as const, research: 32 },
  { id: 'ds', name: 'Data Science', students: 80, faculty: 7, healthScore: 86, placementRate: 89, avgCGPA: 8.1, status: 'healthy' as const, research: 28 },
]

export const PLACEMENT_TRENDS = [
  { year: '2021', rate: 62, salary: 4.2 },
  { year: '2022', rate: 68, salary: 4.8 },
  { year: '2023', rate: 72, salary: 5.5 },
  { year: '2024', rate: 75, salary: 6.2 },
  { year: '2025', rate: 78, salary: 6.8 },
  { year: '2026', rate: 84, salary: 7.5 },
]

export const DEPARTMENT_PERFORMANCE = DEPARTMENTS.map((d) => ({
  name: d.name.split(' ')[0],
  placement: d.placementRate,
  academic: d.avgCGPA * 10,
  health: d.healthScore,
}))

export const ATTENDANCE_ANALYTICS = [
  { month: 'Aug', avg: 88, target: 85 },
  { month: 'Sep', avg: 86, target: 85 },
  { month: 'Oct', avg: 84, target: 85 },
  { month: 'Nov', avg: 82, target: 85 },
  { month: 'Dec', avg: 79, target: 85 },
  { month: 'Jan', avg: 83, target: 85 },
  { month: 'Feb', avg: 85, target: 85 },
]

export const RISK_DISTRIBUTION = [
  { name: 'Low Risk', value: 580, color: '#10b981' },
  { name: 'Moderate', value: 300, color: '#f59e0b' },
  { name: 'High Risk', value: 120, color: '#ef4444' },
]

export const STUDENTS = Array.from({ length: 20 }, (_, i) => ({
  id: `STU${1001 + i}`,
  name: ['Arjun Sharma', 'Priya Patel', 'Rahul Kumar', 'Sneha Reddy', 'Vikram Singh', 'Ananya Iyer', 'Karan Mehta', 'Divya Nair', 'Rohan Das', 'Meera Joshi', 'Aditya Rao', 'Kavya Menon', 'Nikhil Gupta', 'Ishita Shah', 'Varun Malhotra', 'Pooja Agarwal', 'Amit Verma', 'Neha Kapoor', 'Siddharth Jain', 'Tanvi Desai'][i],
  department: DEPARTMENTS[i % 8].name,
  deptId: DEPARTMENTS[i % 8].id,
  cgpa: +(6.5 + Math.random() * 2).toFixed(1),
  attendance: Math.floor(65 + Math.random() * 35),
  placementReady: Math.random() > 0.3,
  riskLevel: i < 3 ? 'high' : i < 8 ? 'moderate' : 'low',
}))

export const SAMPLE_STUDENT = {
  id: 'STU1001',
  name: 'Arjun Sharma',
  email: 'arjun.sharma@college.edu',
  department: 'Computer Science',
  year: 'Final Year',
  rollNo: 'CS2022-1047',
  avatar: 'AS',
  profile: {
    attendance: 87,
    cgpa: 8.2,
    projects: 5,
    hackathons: 3,
    certifications: 4,
    codingActivity: 78,
    communicationScore: 82,
  },
  aiScores: {
    academic: 85,
    technical: 88,
    softSkill: 82,
    placementReadiness: 82,
    backlogRisk: 8,
    dropoutRisk: 12,
  },
  prediction: {
    placementProbability: 82,
    expectedSalary: 7.5,
    recommendedCompanies: ['TCS', 'Infosys', 'Accenture', 'Microsoft'],
  },
  skillGaps: {
    missing: ['Cloud Computing', 'System Design', 'Advanced DSA'],
    recommendations: [
      'Complete AWS Certification',
      'Solve 150 DSA Problems',
      'Build 2 Full Stack Projects',
    ],
  },
  projects: [
    { name: 'Smart Campus IoT Platform', tech: 'React, Node.js, MQTT', score: 92 },
    { name: 'AI Resume Analyzer', tech: 'Python, TensorFlow', score: 88 },
    { name: 'E-Learning Portal', tech: 'MERN Stack', score: 85 },
  ],
  hackathons: [
    { name: 'Smart India Hackathon 2025', rank: 'Top 10', prize: '₹50,000' },
    { name: 'CodeFest IIT Delhi', rank: '2nd Place', prize: '₹25,000' },
  ],
  certifications: ['AWS Cloud Practitioner', 'Google Data Analytics', 'Meta Frontend Developer', 'Oracle Java SE'],
}

export const SAMPLE_FACULTY = {
  id: 'FAC001',
  name: 'Dr. Rajesh Verma',
  department: 'Computer Science',
  designation: 'Professor & HOD',
  avatar: 'RV',
  coursesTaught: ['Data Structures', 'Database Management', 'Machine Learning', 'Cloud Computing'],
  studentFeedback: 4.6,
  passPercentage: 92,
  courseCompletionRate: 88,
  aiMetrics: {
    teachingEffectiveness: 91,
    studentImprovement: 85,
    facultyImpact: 88,
    placementContribution: 79,
  },
  analytics: {
    passRateTrend: [88, 89, 90, 91, 92],
    feedbackTrend: [4.2, 4.3, 4.4, 4.5, 4.6],
    studentGrowth: [72, 75, 78, 82, 85],
  },
}

export const FACULTY_LIST = Array.from({ length: 12 }, (_, i) => ({
  id: `FAC${String(i + 1).padStart(3, '0')}`,
  name: ['Dr. Rajesh Verma', 'Prof. Sunita Rao', 'Dr. Amit Khanna', 'Prof. Lakshmi Nair', 'Dr. Sanjay Mehta', 'Prof. Deepa Singh', 'Dr. Vikram Joshi', 'Prof. Meera Kapoor', 'Dr. Anil Desai', 'Prof. Kavita Shah', 'Dr. Ravi Pandey', 'Prof. Nisha Gupta'][i],
  department: DEPARTMENTS[i % 8].name,
  designation: i < 3 ? 'Professor' : i < 8 ? 'Associate Professor' : 'Assistant Professor',
  effectiveness: Math.floor(75 + Math.random() * 20),
  students: Math.floor(80 + Math.random() * 60),
}))

export const PLACEMENT_DATA = {
  readyStudents: 780,
  totalEligible: 920,
  companiesParticipating: 145,
  offersMade: 780,
  avgSalary: 6.8,
  highestSalary: 42,
  topRecruiters: [
    { name: 'TCS', offers: 120, avgPackage: 3.6 },
    { name: 'Infosys', offers: 95, avgPackage: 4.2 },
    { name: 'Wipro', offers: 80, avgPackage: 3.8 },
    { name: 'Accenture', offers: 65, avgPackage: 5.5 },
    { name: 'Microsoft', offers: 12, avgPackage: 18.5 },
    { name: 'Amazon', offers: 8, avgPackage: 22.0 },
  ],
  salaryTrends: [
    { year: '2022', avg: 4.8, median: 4.2 },
    { year: '2023', avg: 5.5, median: 4.8 },
    { year: '2024', avg: 6.2, median: 5.5 },
    { year: '2025', avg: 6.8, median: 6.0 },
    { year: '2026', avg: 7.5, median: 6.8 },
  ],
}

export const COMPANY_MATCHES = [
  { company: 'TCS', matchScore: 94, salary: '3.6-4.5 LPA', fit: 'Excellent' },
  { company: 'Infosys', matchScore: 91, salary: '4.0-5.0 LPA', fit: 'Excellent' },
  { company: 'Accenture', matchScore: 87, salary: '5.0-6.5 LPA', fit: 'Strong' },
  { company: 'Microsoft', matchScore: 72, salary: '15-22 LPA', fit: 'Moderate' },
  { company: 'Amazon', matchScore: 68, salary: '18-28 LPA', fit: 'Moderate' },
]

export const AI_INSIGHTS = [
  { type: 'risk', title: '120 Students at Risk', description: 'Immediate intervention recommended for attendance & academic performance', severity: 'critical' },
  { type: 'forecast', title: 'Placement Forecast 84%', description: 'AI predicts 6% improvement in placement rate for next academic year', severity: 'success' },
  { type: 'skill', title: 'AI Skill Gap Alert', description: '300 students missing cloud & system design skills for top recruiters', severity: 'warning' },
  { type: 'trend', title: 'Department Performance Trends', description: 'AI/ML and CSE departments showing 15% YoY improvement', severity: 'info' },
]

export const SIMULATION_PARAMS = [
  { id: 'attendance', label: 'Increase Attendance', default: 0, max: 20, unit: '%' },
  { id: 'courses', label: 'Add New Courses', default: 0, max: 10, unit: '' },
  { id: 'faculty', label: 'Recruit Faculty', default: 0, max: 20, unit: '' },
  { id: 'partnerships', label: 'Industry Partnerships', default: 0, max: 15, unit: '' },
  { id: 'certifications', label: 'Certification Programs', default: 0, max: 10, unit: '' },
]

export const AI_ASSISTANT_RESPONSES: Record<string, string> = {
  'show students likely to fail dbms': 'Based on current attendance (below 75%), assignment scores, and mid-term performance, **47 students** are at high risk of failing DBMS this semester.\n\nTop at-risk students:\n• Rahul Kumar (CS) — 62% attendance, failed 2 quizzes\n• Sneha Reddy (IT) — 58% attendance, backlog in prerequisites\n• Vikram Singh (CSE) — 71% attendance, weak in normalization concepts\n\n**Recommendation:** Schedule remedial sessions and assign peer mentors within 2 weeks.',
  'predict placement rate for 2028': '**Placement Rate Prediction for 2028: 89.2%** (±2.1%)\n\nKey drivers:\n• Current trajectory: +2.3% YoY\n• AI/Cloud curriculum adoption: +4.2% impact\n• Industry partnerships growth: +1.8% impact\n• Skill gap reduction programs: +2.5% impact\n\nExpected average package: **₹8.4 LPA**\nTop hiring sectors: IT Services (42%), Product Companies (28%), Startups (18%)',
  'which department has highest risk?': '**Electrical Engineering (EEE)** has the highest composite risk score of **78/100**.\n\nContributing factors:\n• Placement rate: 58% (lowest among departments)\n• Dropout risk: 18% of students\n• Faculty-student ratio: 1:10 (below optimal)\n• Industry partnership score: 42/100\n\n**Immediate actions:** Increase industry collaborations, launch skill bootcamps, and assign dedicated placement cell support.',
  'what skills are missing for top recruiters?': 'Analysis of top 50 recruiters\' requirements vs. current student skills:\n\n**Critical Gaps:**\n1. Cloud Computing (AWS/Azure) — 68% students lacking\n2. System Design — 72% students lacking\n3. Advanced DSA — 55% students lacking\n4. DevOps/CI-CD — 61% students lacking\n5. Machine Learning — 48% students lacking\n\n**Priority learning paths generated for 300 affected students.**',
  'how can placement readiness be improved?': '**AI-Generated Improvement Plan:**\n\n1. **Certification Sprint** — Launch AWS & Azure certification drives (+12% readiness)\n2. **Mock Interview Program** — Weekly sessions with industry experts (+8% readiness)\n3. **Project Portfolio** — Require 2 industry-relevant capstone projects (+15% readiness)\n4. **DSA Bootcamp** — 8-week intensive for final-year students (+10% readiness)\n5. **Soft Skills Workshop** — Communication & group discussion training (+6% readiness)\n\n**Combined impact: +51% placement readiness improvement within 6 months.**',
}

export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/students', label: 'Students', icon: 'GraduationCap' },
  { path: '/faculty', label: 'Faculty', icon: 'Users' },
  { path: '/departments', label: 'Departments', icon: 'Building2' },
  { path: '/placements', label: 'Placements', icon: 'Briefcase' },
  { path: '/predictions', label: 'Predictions', icon: 'Brain' },
  { path: '/simulation', label: 'Simulation Lab', icon: 'FlaskConical' },
  { path: '/assistant', label: 'AI Assistant', icon: 'MessageSquare' },
  { path: '/analytics', label: 'Analytics', icon: 'BarChart3' },
  { path: '/digital-twin', label: 'Digital Twin', icon: 'Network' },
  { path: '/settings', label: 'Settings', icon: 'Settings' },
  { path: '/super-admin', label: 'Super Admin', icon: 'Shield' },
]

export const SKILL_HEATMAP = [
  { skill: 'Python', demand: 95, supply: 78 },
  { skill: 'Java', demand: 88, supply: 82 },
  { skill: 'React', demand: 85, supply: 65 },
  { skill: 'AWS', demand: 92, supply: 32 },
  { skill: 'DSA', demand: 90, supply: 55 },
  { skill: 'ML/AI', demand: 88, supply: 48 },
  { skill: 'DevOps', demand: 82, supply: 28 },
  { skill: 'System Design', demand: 95, supply: 25 },
]
