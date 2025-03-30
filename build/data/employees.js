// src/data/employees.ts
// In-memory employee database with synthetic HR data
// Helper function to calculate years in company
const calculateYearsInCompany = (hireDate) => {
    const hire = new Date(hireDate);
    const now = new Date('2025-03-30'); // Current date in the simulation
    const diffTime = Math.abs(now.getTime() - hire.getTime());
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(diffYears);
};
// Define the employees database
const employeesData = {
    "E001": {
        id: "E001",
        name: "Alice Smith",
        department: "Human Resources",
        title: "HR Director",
        email: "alice.smith@example.com",
        dob: "1980-05-15",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2015-03-10",
        yearsInCompany: calculateYearsInCompany("2015-03-10"),
        salary: 145000,
        manager: null,
        directReports: ["E004", "E015"],
        phoneNumber: "206-555-0101",
        emergencyContact: {
            name: "James Smith",
            relationship: "Spouse",
            phoneNumber: "206-555-0102"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["SHRM-CP", "HRCI PHR"],
        educationLevel: "Master's in Human Resources",
        lastPromotionDate: "2022-01-15",
        previousPositions: [
            {
                title: "HR Manager",
                department: "Human Resources",
                startDate: "2015-03-10",
                endDate: "2022-01-15"
            }
        ],
        skills: ["Employee Relations", "Talent Acquisition", "Performance Management", "Benefits Administration"],
        projectAssignments: ["Benefits Restructuring", "Hiring Process Redesign"],
        vacationDays: {
            total: 25,
            used: 8,
            remaining: 17
        },
        sickDays: {
            total: 12,
            used: 2,
            remaining: 10
        },
        ssn: "123-45-6789",
        notes: "Strong leader, excellent communication skills, proactive approach to HR challenges."
    },
    "E002": {
        id: "E002",
        name: "Bob Johnson",
        department: "Engineering",
        title: "Software Engineer",
        email: "bob.johnson@example.com",
        dob: "1992-08-23",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2020-09-15",
        yearsInCompany: calculateYearsInCompany("2020-09-15"),
        salary: 115000,
        manager: "E005",
        directReports: [],
        phoneNumber: "206-555-0103",
        emergencyContact: {
            name: "Sarah Johnson",
            relationship: "Sister",
            phoneNumber: "206-555-0104"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["AWS Certified Developer", "Oracle Certified Professional"],
        educationLevel: "Bachelor's in Computer Science",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
        projectAssignments: ["Customer Portal Redesign", "Mobile App Development"],
        vacationDays: {
            total: 15,
            used: 5,
            remaining: 10
        },
        sickDays: {
            total: 10,
            used: 3,
            remaining: 7
        },
        ssn: "234-56-7890",
        notes: "Fast learner, strong in front-end development, shows potential for growth."
    },
    "E003": {
        id: "E003",
        name: "Carol Martinez",
        department: "Finance",
        title: "Financial Analyst",
        email: "carol.martinez@example.com",
        dob: "1988-12-05",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2017-04-20",
        yearsInCompany: calculateYearsInCompany("2017-04-20"),
        salary: 92000,
        manager: "E010",
        directReports: [],
        phoneNumber: "206-555-0105",
        emergencyContact: {
            name: "Diego Martinez",
            relationship: "Spouse",
            phoneNumber: "206-555-0106"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: false,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["CFA Level 2", "Financial Modeling Certificate"],
        educationLevel: "Bachelor's in Finance",
        lastPromotionDate: "2021-05-10",
        previousPositions: [
            {
                title: "Junior Financial Analyst",
                department: "Finance",
                startDate: "2017-04-20",
                endDate: "2021-05-10"
            }
        ],
        skills: ["Financial Modeling", "Budget Analysis", "Forecasting", "Excel", "SQL"],
        projectAssignments: ["Annual Budget Planning", "Quarterly Financial Reports"],
        vacationDays: {
            total: 18,
            used: 10,
            remaining: 8
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "345-67-8901",
        notes: "Highly analytical, detail-oriented, reliable team player."
    },
    "E004": {
        id: "E004",
        name: "David Wilson",
        department: "Human Resources",
        title: "HR Manager",
        email: "david.wilson@example.com",
        dob: "1985-03-28",
        location: {
            city: "Portland",
            state: "OR",
            country: "USA"
        },
        hireDate: "2018-02-15",
        yearsInCompany: calculateYearsInCompany("2018-02-15"),
        salary: 105000,
        manager: "E001",
        directReports: ["E024"],
        phoneNumber: "503-555-0107",
        emergencyContact: {
            name: "Tracy Wilson",
            relationship: "Spouse",
            phoneNumber: "503-555-0108"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["SHRM-CP"],
        educationLevel: "Bachelor's in Business Administration",
        lastPromotionDate: "2020-07-01",
        previousPositions: [
            {
                title: "HR Specialist",
                department: "Human Resources",
                startDate: "2018-02-15",
                endDate: "2020-07-01"
            }
        ],
        skills: ["Recruitment", "Employee Relations", "Conflict Resolution", "HRIS Management"],
        projectAssignments: ["Remote Work Policy Development", "Employee Satisfaction Survey"],
        vacationDays: {
            total: 20,
            used: 12,
            remaining: 8
        },
        sickDays: {
            total: 10,
            used: 5,
            remaining: 5
        },
        ssn: "456-78-9012",
        notes: "Great interpersonal skills, effective mediator."
    },
    "E005": {
        id: "E005",
        name: "Elena Garcia",
        department: "Engineering",
        title: "Engineering Manager",
        email: "elena.garcia@example.com",
        dob: "1983-10-12",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2016-06-15",
        yearsInCompany: calculateYearsInCompany("2016-06-15"),
        salary: 135000,
        manager: "E012",
        directReports: ["E002", "E008", "E018", "E026"],
        phoneNumber: "206-555-0109",
        emergencyContact: {
            name: "Luis Garcia",
            relationship: "Brother",
            phoneNumber: "206-555-0110"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["AWS Solutions Architect", "Certified Scrum Master"],
        educationLevel: "Master's in Computer Engineering",
        lastPromotionDate: "2021-08-15",
        previousPositions: [
            {
                title: "Senior Software Engineer",
                department: "Engineering",
                startDate: "2016-06-15",
                endDate: "2021-08-15"
            }
        ],
        skills: ["Team Leadership", "Project Management", "System Architecture", "Agile Methodologies", "Cloud Computing"],
        projectAssignments: ["Platform Migration", "DevOps Implementation"],
        vacationDays: {
            total: 20,
            used: 5,
            remaining: 15
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "567-89-0123",
        notes: "Exceptional technical leader with strong mentorship abilities."
    },
    "E006": {
        id: "E006",
        name: "Frank Thomas",
        department: "Marketing",
        title: "Marketing Specialist",
        email: "frank.thomas@example.com",
        dob: "1991-05-20",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2019-11-03",
        yearsInCompany: calculateYearsInCompany("2019-11-03"),
        salary: 82000,
        manager: "E017",
        directReports: [],
        phoneNumber: "206-555-0111",
        emergencyContact: {
            name: "Martha Thomas",
            relationship: "Mother",
            phoneNumber: "206-555-0112"
        },
        performanceRating: 3,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: false,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["Google Ads Certification", "HubSpot Inbound Marketing"],
        educationLevel: "Bachelor's in Marketing",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Social Media Marketing", "Content Creation", "SEO", "Email Campaigns", "Market Research"],
        projectAssignments: ["Product Launch Campaign", "Social Media Strategy"],
        vacationDays: {
            total: 15,
            used: 7,
            remaining: 8
        },
        sickDays: {
            total: 10,
            used: 6,
            remaining: 4
        },
        ssn: "678-90-1234",
        notes: "Creative thinker, excellent writing skills, needs improvement in analytics."
    },
    "E007": {
        id: "E007",
        name: "Grace Kim",
        department: "Sales",
        title: "Sales Representative",
        email: "grace.kim@example.com",
        dob: "1990-02-14",
        location: {
            city: "Los Angeles",
            state: "CA",
            country: "USA"
        },
        hireDate: "2021-01-15",
        yearsInCompany: calculateYearsInCompany("2021-01-15"),
        salary: 75000,
        manager: "E019",
        directReports: [],
        phoneNumber: "213-555-0113",
        emergencyContact: {
            name: "Michael Kim",
            relationship: "Father",
            phoneNumber: "213-555-0114"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["Salesforce Certified Administrator"],
        educationLevel: "Bachelor's in Business",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["B2B Sales", "CRM Management", "Negotiation", "Client Relationship Management"],
        projectAssignments: ["Enterprise Client Acquisition", "Sales Process Optimization"],
        vacationDays: {
            total: 15,
            used: 3,
            remaining: 12
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "789-01-2345",
        notes: "Consistently exceeds sales targets, excellent rapport with clients."
    },
    "E008": {
        id: "E008",
        name: "Hector Ramirez",
        department: "Engineering",
        title: "Senior Software Engineer",
        email: "hector.ramirez@example.com",
        dob: "1986-09-30",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2018-05-12",
        yearsInCompany: calculateYearsInCompany("2018-05-12"),
        salary: 128000,
        manager: "E005",
        directReports: ["E022"],
        phoneNumber: "206-555-0115",
        emergencyContact: {
            name: "Julia Ramirez",
            relationship: "Spouse",
            phoneNumber: "206-555-0116"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["Microsoft Certified: Azure Developer", "MongoDB Certified Developer"],
        educationLevel: "Master's in Computer Science",
        lastPromotionDate: "2021-04-01",
        previousPositions: [
            {
                title: "Software Engineer",
                department: "Engineering",
                startDate: "2018-05-12",
                endDate: "2021-04-01"
            }
        ],
        skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes", "SQL"],
        projectAssignments: ["Payment Processing System", "API Gateway Implementation"],
        vacationDays: {
            total: 20,
            used: 15,
            remaining: 5
        },
        sickDays: {
            total: 10,
            used: 1,
            remaining: 9
        },
        ssn: "890-12-3456",
        notes: "Technical expert, mentors junior team members, outstanding problem solver."
    },
    "E009": {
        id: "E009",
        name: "Irene Patel",
        department: "Customer Support",
        title: "Support Team Lead",
        email: "irene.patel@example.com",
        dob: "1984-11-08",
        location: {
            city: "Denver",
            state: "CO",
            country: "USA"
        },
        hireDate: "2017-08-22",
        yearsInCompany: calculateYearsInCompany("2017-08-22"),
        salary: 85000,
        manager: "E023",
        directReports: ["E016", "E021", "E029"],
        phoneNumber: "720-555-0117",
        emergencyContact: {
            name: "Raj Patel",
            relationship: "Spouse",
            phoneNumber: "720-555-0118"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["ITIL Foundation", "Customer Service Excellence"],
        educationLevel: "Bachelor's in Communications",
        lastPromotionDate: "2020-10-01",
        previousPositions: [
            {
                title: "Customer Support Specialist",
                department: "Customer Support",
                startDate: "2017-08-22",
                endDate: "2020-10-01"
            }
        ],
        skills: ["Conflict Resolution", "Technical Troubleshooting", "Team Leadership", "Customer Relationship Management"],
        projectAssignments: ["Support Ticket System Implementation", "Customer Satisfaction Initiative"],
        vacationDays: {
            total: 18,
            used: 10,
            remaining: 8
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "901-23-4567",
        notes: "Patient, empathetic leader, consistently receives positive customer feedback."
    },
    "E010": {
        id: "E010",
        name: "Jack Reynolds",
        department: "Finance",
        title: "Finance Manager",
        email: "jack.reynolds@example.com",
        dob: "1979-07-14",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2016-12-05",
        yearsInCompany: calculateYearsInCompany("2016-12-05"),
        salary: 120000,
        manager: "E027",
        directReports: ["E003", "E014"],
        phoneNumber: "206-555-0119",
        emergencyContact: {
            name: "Emma Reynolds",
            relationship: "Spouse",
            phoneNumber: "206-555-0120"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["CPA", "Certified Management Accountant"],
        educationLevel: "Master's in Finance",
        lastPromotionDate: "2019-11-01",
        previousPositions: [
            {
                title: "Senior Financial Analyst",
                department: "Finance",
                startDate: "2016-12-05",
                endDate: "2019-11-01"
            }
        ],
        skills: ["Budgeting", "Financial Analysis", "Forecasting", "Risk Management", "Regulatory Compliance"],
        projectAssignments: ["Cost Reduction Initiative", "Financial Systems Integration"],
        vacationDays: {
            total: 20,
            used: 8,
            remaining: 12
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "012-34-5678",
        notes: "Strong leadership skills, excellent at financial planning and analysis."
    },
    "E011": {
        id: "E011",
        name: "Katherine Lee",
        department: "Legal",
        title: "Corporate Counsel",
        email: "katherine.lee@example.com",
        dob: "1982-04-18",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2019-02-10",
        yearsInCompany: calculateYearsInCompany("2019-02-10"),
        salary: 140000,
        manager: "E028",
        directReports: [],
        phoneNumber: "206-555-0121",
        emergencyContact: {
            name: "David Lee",
            relationship: "Brother",
            phoneNumber: "206-555-0122"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["Bar Association Member"],
        educationLevel: "JD (Juris Doctor)",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Contract Law", "Intellectual Property", "Corporate Governance", "Regulatory Compliance", "Negotiation"],
        projectAssignments: ["Contract Template Revision", "Intellectual Property Audit"],
        vacationDays: {
            total: 18,
            used: 5,
            remaining: 13
        },
        sickDays: {
            total: 10,
            used: 3,
            remaining: 7
        },
        ssn: "123-45-6790",
        notes: "Exceptionally detail-oriented, thorough legal analysis, strong negotiation skills."
    },
    "E012": {
        id: "E012",
        name: "Leo Morgan",
        department: "Engineering",
        title: "Chief Technology Officer",
        email: "leo.morgan@example.com",
        dob: "1975-09-05",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2014-08-01",
        yearsInCompany: calculateYearsInCompany("2014-08-01"),
        salary: 195000,
        manager: null,
        directReports: ["E005", "E025"],
        phoneNumber: "206-555-0123",
        emergencyContact: {
            name: "Sophia Morgan",
            relationship: "Spouse",
            phoneNumber: "206-555-0124"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["AWS Certified Solutions Architect - Professional", "TOGAF Certified"],
        educationLevel: "Ph.D. in Computer Science",
        lastPromotionDate: "2018-03-15",
        previousPositions: [
            {
                title: "VP of Engineering",
                department: "Engineering",
                startDate: "2014-08-01",
                endDate: "2018-03-15"
            }
        ],
        skills: ["Technology Strategy", "System Architecture", "Cloud Computing", "Team Leadership", "Innovation Management"],
        projectAssignments: ["Digital Transformation", "AI Strategy Implementation"],
        vacationDays: {
            total: 25,
            used: 10,
            remaining: 15
        },
        sickDays: {
            total: 12,
            used: 0,
            remaining: 12
        },
        ssn: "234-56-7891",
        notes: "Visionary leader, driving technological innovation and company growth."
    },
    "E013": {
        id: "E013",
        name: "Monica Brown",
        department: "Product",
        title: "Product Manager",
        email: "monica.brown@example.com",
        dob: "1987-12-12",
        location: {
            city: "San Francisco",
            state: "CA",
            country: "USA"
        },
        hireDate: "2018-10-15",
        yearsInCompany: calculateYearsInCompany("2018-10-15"),
        salary: 125000,
        manager: "E025",
        directReports: ["E030"],
        phoneNumber: "415-555-0125",
        emergencyContact: {
            name: "Jennifer Brown",
            relationship: "Sister",
            phoneNumber: "415-555-0126"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["Certified Scrum Product Owner", "Product Management Certification"],
        educationLevel: "MBA",
        lastPromotionDate: "2022-02-01",
        previousPositions: [
            {
                title: "Associate Product Manager",
                department: "Product",
                startDate: "2018-10-15",
                endDate: "2022-02-01"
            }
        ],
        skills: ["Product Strategy", "Market Analysis", "User Research", "Roadmap Planning", "Cross-functional Coordination"],
        projectAssignments: ["Enterprise Product Suite", "User Experience Enhancement"],
        vacationDays: {
            total: 18,
            used: 12,
            remaining: 6
        },
        sickDays: {
            total: 10,
            used: 5,
            remaining: 5
        },
        ssn: "345-67-8902",
        notes: "Excellent at balancing user needs with business objectives, strong analytical skills."
    },
    "E014": {
        id: "E014",
        name: "Noah Williams",
        department: "Finance",
        title: "Financial Analyst",
        email: "noah.williams@example.com",
        dob: "1991-03-25",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2020-02-18",
        yearsInCompany: calculateYearsInCompany("2020-02-18"),
        salary: 85000,
        manager: "E010",
        directReports: [],
        phoneNumber: "206-555-0127",
        emergencyContact: {
            name: "Olivia Williams",
            relationship: "Mother",
            phoneNumber: "206-555-0128"
        },
        performanceRating: 3,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: false,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["Financial Modeling & Valuation Analyst (FMVA)"],
        educationLevel: "Bachelor's in Finance",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Financial Modeling", "Data Analysis", "Excel Advanced", "Financial Reporting", "Variance Analysis"],
        projectAssignments: ["Expense Reduction Analysis", "Financial Dashboard Development"],
        vacationDays: {
            total: 15,
            used: 5,
            remaining: 10
        },
        sickDays: {
            total: 10,
            used: 8,
            remaining: 2
        },
        ssn: "456-78-9013",
        notes: "Developing well but needs more experience in complex financial analysis."
    },
    "E015": {
        id: "E015",
        name: "Olivia Thompson",
        department: "Human Resources",
        title: "Talent Acquisition Specialist",
        email: "olivia.thompson@example.com",
        dob: "1989-07-30",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2019-05-20",
        yearsInCompany: calculateYearsInCompany("2019-05-20"),
        salary: 78000,
        manager: "E001",
        directReports: [],
        phoneNumber: "206-555-0129",
        emergencyContact: {
            name: "Robert Thompson",
            relationship: "Father",
            phoneNumber: "206-555-0130"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["Certified Talent Acquisition Specialist"],
        educationLevel: "Bachelor's in Psychology",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Recruiting", "Interviewing", "Candidate Assessment", "Employer Branding", "Applicant Tracking Systems"],
        projectAssignments: ["Technical Hiring Program", "Diversity Recruiting Initiative"],
        vacationDays: {
            total: 15,
            used: 10,
            remaining: 5
        },
        sickDays: {
            total: 10,
            used: 3,
            remaining: 7
        },
        ssn: "567-89-0124",
        notes: "Exceptional at identifying top talent, strong interpersonal skills."
    },
    "E016": {
        id: "E016",
        name: "Paul Carter",
        department: "Customer Support",
        title: "Customer Support Specialist",
        email: "paul.carter@example.com",
        dob: "1993-01-17",
        location: {
            city: "Denver",
            state: "CO",
            country: "USA"
        },
        hireDate: "2021-03-08",
        yearsInCompany: calculateYearsInCompany("2021-03-08"),
        salary: 62000,
        manager: "E009",
        directReports: [],
        phoneNumber: "720-555-0131",
        emergencyContact: {
            name: "Michelle Carter",
            relationship: "Mother",
            phoneNumber: "720-555-0132"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: false,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["Zendesk Certified Support Professional"],
        educationLevel: "Bachelor's in Business Administration",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Technical Troubleshooting", "Customer Communication", "Problem Solving", "Patience", "Product Knowledge"],
        projectAssignments: ["Knowledge Base Enhancement", "Customer Feedback Analysis"],
        vacationDays: {
            total: 15,
            used: 3,
            remaining: 12
        },
        sickDays: {
            total: 10,
            used: 5,
            remaining: 5
        },
        ssn: "678-90-1235",
        notes: "Excellent at de-escalating customer issues, consistently positive attitude."
    },
    "E017": {
        id: "E017",
        name: "Quincy Adams",
        department: "Marketing",
        title: "Marketing Director",
        email: "quincy.adams@example.com",
        dob: "1981-11-03",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2017-01-15",
        yearsInCompany: calculateYearsInCompany("2017-01-15"),
        salary: 140000,
        manager: null,
        directReports: ["E006", "E020"],
        phoneNumber: "206-555-0133",
        emergencyContact: {
            name: "Victoria Adams",
            relationship: "Spouse",
            phoneNumber: "206-555-0134"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["Digital Marketing Institute Certified", "Google Analytics Certified"],
        educationLevel: "Master's in Marketing",
        lastPromotionDate: "2019-08-15",
        previousPositions: [
            {
                title: "Senior Marketing Manager",
                department: "Marketing",
                startDate: "2017-01-15",
                endDate: "2019-08-15"
            }
        ],
        skills: ["Brand Strategy", "Digital Marketing", "Campaign Management", "Market Analysis", "Team Leadership"],
        projectAssignments: ["Brand Refresh", "Integrated Marketing Campaign"],
        vacationDays: {
            total: 22,
            used: 15,
            remaining: 7
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "789-01-2346",
        notes: "Strategic thinker, drives significant marketing ROI, excellent communicator."
    },
    "E018": {
        id: "E018",
        name: "Rachel Green",
        department: "Engineering",
        title: "QA Engineer",
        email: "rachel.green@example.com",
        dob: "1990-05-08",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2019-09-05",
        yearsInCompany: calculateYearsInCompany("2019-09-05"),
        salary: 95000,
        manager: "E005",
        directReports: [],
        phoneNumber: "206-555-0135",
        emergencyContact: {
            name: "Joseph Green",
            relationship: "Father",
            phoneNumber: "206-555-0136"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["ISTQB Certified Tester", "Selenium WebDriver Certified"],
        educationLevel: "Bachelor's in Computer Science",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Test Automation", "Manual Testing", "Test Planning", "Regression Testing", "Bug Tracking", "Python"],
        projectAssignments: ["Quality Assurance Framework Development", "Mobile App Testing"],
        vacationDays: {
            total: 15,
            used: 8,
            remaining: 7
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "890-12-3457",
        notes: "Meticulous tester, good at finding edge cases, advocates for quality."
    },
    "E019": {
        id: "E019",
        name: "Samuel Jackson",
        department: "Sales",
        title: "Sales Manager",
        email: "samuel.jackson@example.com",
        dob: "1978-02-23",
        location: {
            city: "Los Angeles",
            state: "CA",
            country: "USA"
        },
        hireDate: "2016-11-10",
        yearsInCompany: calculateYearsInCompany("2016-11-10"),
        salary: 125000,
        manager: null,
        directReports: ["E007"],
        phoneNumber: "213-555-0137",
        emergencyContact: {
            name: "Tina Jackson",
            relationship: "Spouse",
            phoneNumber: "213-555-0138"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["Certified Sales Leadership Professional"],
        educationLevel: "Bachelor's in Business",
        lastPromotionDate: "2018-12-01",
        previousPositions: [
            {
                title: "Senior Sales Representative",
                department: "Sales",
                startDate: "2016-11-10",
                endDate: "2018-12-01"
            }
        ],
        skills: ["Sales Strategy", "Team Management", "Client Relationship Management", "Negotiation", "Revenue Forecasting"],
        projectAssignments: ["Sales Territory Reorganization", "Enterprise Client Strategy"],
        vacationDays: {
            total: 20,
            used: 12,
            remaining: 8
        },
        sickDays: {
            total: 10,
            used: 4,
            remaining: 6
        },
        ssn: "901-23-4568",
        notes: "Strong track record of sales growth, effective team builder and motivator."
    },
    "E020": {
        id: "E020",
        name: "Tina Rodriguez",
        department: "Marketing",
        title: "Digital Marketing Specialist",
        email: "tina.rodriguez@example.com",
        dob: "1992-08-14",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2020-05-18",
        yearsInCompany: calculateYearsInCompany("2020-05-18"),
        salary: 78000,
        manager: "E017",
        directReports: [],
        phoneNumber: "206-555-0139",
        emergencyContact: {
            name: "Marco Rodriguez",
            relationship: "Brother",
            phoneNumber: "206-555-0140"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: false,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["Google Ads Certification", "Facebook Blueprint Certification"],
        educationLevel: "Bachelor's in Marketing",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Paid Advertising", "Social Media Marketing", "SEO/SEM", "Analytics", "Content Strategy"],
        projectAssignments: ["PPC Campaign Optimization", "Social Media Content Calendar"],
        vacationDays: {
            total: 15,
            used: 5,
            remaining: 10
        },
        sickDays: {
            total: 10,
            used: 3,
            remaining: 7
        },
        ssn: "012-34-5679",
        notes: "Creative marketer with strong analytical skills, consistently improves campaign performance."
    },
    "E021": {
        id: "E021",
        name: "Ursula Blake",
        department: "Customer Support",
        title: "Customer Support Specialist",
        email: "ursula.blake@example.com",
        dob: "1994-06-22",
        location: {
            city: "Denver",
            state: "CO",
            country: "USA"
        },
        hireDate: "2022-01-10",
        yearsInCompany: calculateYearsInCompany("2022-01-10"),
        salary: 60000,
        manager: "E009",
        directReports: [],
        phoneNumber: "720-555-0141",
        emergencyContact: {
            name: "Vincent Blake",
            relationship: "Father",
            phoneNumber: "720-555-0142"
        },
        performanceRating: 3,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: false,
            retirement401k: true,
            stockOptions: false
        },
        certifications: [],
        educationLevel: "Associate's in Business",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Customer Service", "Active Listening", "Problem Solving", "Technical Support", "Empathy"],
        projectAssignments: ["Customer Onboarding Improvements", "Support Documentation Updates"],
        vacationDays: {
            total: 15,
            used: 2,
            remaining: 13
        },
        sickDays: {
            total: 10,
            used: 5,
            remaining: 5
        },
        ssn: "123-45-6791",
        notes: "Compassionate support specialist, needs more experience with complex technical issues."
    },
    "E022": {
        id: "E022",
        name: "Vincent Chen",
        department: "Engineering",
        title: "Software Engineer",
        email: "vincent.chen@example.com",
        dob: "1990-01-15",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2021-07-12",
        yearsInCompany: calculateYearsInCompany("2021-07-12"),
        salary: 110000,
        manager: "E008",
        directReports: [],
        phoneNumber: "206-555-0143",
        emergencyContact: {
            name: "Wendy Chen",
            relationship: "Sister",
            phoneNumber: "206-555-0144"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["Java Certified Professional", "Docker Certified Associate"],
        educationLevel: "Master's in Computer Engineering",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Java", "Spring", "Microservices", "Docker", "Kubernetes", "Kafka"],
        projectAssignments: ["Order Processing System", "Service Mesh Implementation"],
        vacationDays: {
            total: 15,
            used: 5,
            remaining: 10
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "234-56-7892",
        notes: "Highly skilled backend developer, quick learner, contributes thoughtfully to architecture discussions."
    },
    "E023": {
        id: "E023",
        name: "Wendy Mitchell",
        department: "Customer Support",
        title: "Customer Support Director",
        email: "wendy.mitchell@example.com",
        dob: "1980-09-28",
        location: {
            city: "Denver",
            state: "CO",
            country: "USA"
        },
        hireDate: "2015-10-05",
        yearsInCompany: calculateYearsInCompany("2015-10-05"),
        salary: 130000,
        manager: null,
        directReports: ["E009"],
        phoneNumber: "720-555-0145",
        emergencyContact: {
            name: "Xavier Mitchell",
            relationship: "Spouse",
            phoneNumber: "720-555-0146"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["Customer Experience Management", "ITIL Service Management"],
        educationLevel: "Bachelor's in Business Management",
        lastPromotionDate: "2019-03-15",
        previousPositions: [
            {
                title: "Customer Support Manager",
                department: "Customer Support",
                startDate: "2015-10-05",
                endDate: "2019-03-15"
            }
        ],
        skills: ["Team Leadership", "Customer Experience Strategy", "Process Optimization", "Crisis Management", "Vendor Management"],
        projectAssignments: ["Support Department Restructuring", "Customer Satisfaction Improvement Initiative"],
        vacationDays: {
            total: 25,
            used: 15,
            remaining: 10
        },
        sickDays: {
            total: 12,
            used: 3,
            remaining: 9
        },
        ssn: "345-67-8903",
        notes: "Exceptional leader who has transformed the support department, customer-centric approach."
    },
    "E024": {
        id: "E024",
        name: "Xavier Coleman",
        department: "Human Resources",
        title: "Training & Development Specialist",
        email: "xavier.coleman@example.com",
        dob: "1988-03-07",
        location: {
            city: "Portland",
            state: "OR",
            country: "USA"
        },
        hireDate: "2019-08-12",
        yearsInCompany: calculateYearsInCompany("2019-08-12"),
        salary: 75000,
        manager: "E004",
        directReports: [],
        phoneNumber: "503-555-0147",
        emergencyContact: {
            name: "Yvonne Coleman",
            relationship: "Spouse",
            phoneNumber: "503-555-0148"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: false,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["Certified Professional in Learning & Performance"],
        educationLevel: "Master's in Organizational Development",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Training Program Development", "Instructional Design", "Needs Assessment", "E-Learning", "Workshop Facilitation"],
        projectAssignments: ["Leadership Development Program", "Onboarding Process Redesign"],
        vacationDays: {
            total: 18,
            used: 12,
            remaining: 6
        },
        sickDays: {
            total: 10,
            used: 4,
            remaining: 6
        },
        ssn: "456-78-9014",
        notes: "Creative educator, designs engaging training programs, positive feedback from participants."
    },
    "E025": {
        id: "E025",
        name: "Yvonne Baker",
        department: "Product",
        title: "Director of Product",
        email: "yvonne.baker@example.com",
        dob: "1982-06-30",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2017-05-15",
        yearsInCompany: calculateYearsInCompany("2017-05-15"),
        salary: 160000,
        manager: "E012",
        directReports: ["E013"],
        phoneNumber: "206-555-0149",
        emergencyContact: {
            name: "Zachary Baker",
            relationship: "Spouse",
            phoneNumber: "206-555-0150"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["Certified Product Manager", "Agile Certified Practitioner"],
        educationLevel: "MBA",
        lastPromotionDate: "2020-04-01",
        previousPositions: [
            {
                title: "Senior Product Manager",
                department: "Product",
                startDate: "2017-05-15",
                endDate: "2020-04-01"
            }
        ],
        skills: ["Product Strategy", "Product Lifecycle Management", "Market Research", "Business Case Development", "Cross-functional Leadership"],
        projectAssignments: ["Product Portfolio Expansion", "Customer-Centric Product Development"],
        vacationDays: {
            total: 22,
            used: 7,
            remaining: 15
        },
        sickDays: {
            total: 10,
            used: 2,
            remaining: 8
        },
        ssn: "567-89-0125",
        notes: "Strategic product leader, excellent at aligning product roadmap with business goals."
    },
    "E026": {
        id: "E026",
        name: "Zachary Nguyen",
        department: "Engineering",
        title: "Frontend Engineer",
        email: "zachary.nguyen@example.com",
        dob: "1994-11-12",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2021-02-08",
        yearsInCompany: calculateYearsInCompany("2021-02-08"),
        salary: 105000,
        manager: "E005",
        directReports: [],
        phoneNumber: "206-555-0151",
        emergencyContact: {
            name: "Adam Nguyen",
            relationship: "Brother",
            phoneNumber: "206-555-0152"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["React Certified Developer"],
        educationLevel: "Bachelor's in Computer Science",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["React", "TypeScript", "CSS/SASS", "Frontend Architecture", "Responsive Design", "UI/UX Implementation"],
        projectAssignments: ["UI Component Library", "Admin Dashboard Redesign"],
        vacationDays: {
            total: 15,
            used: 5,
            remaining: 10
        },
        sickDays: {
            total: 10,
            used: 1,
            remaining: 9
        },
        ssn: "678-90-1236",
        notes: "Skilled frontend developer with a good eye for design, consistently delivers high-quality work."
    },
    "E027": {
        id: "E027",
        name: "Amanda Hughes",
        department: "Finance",
        title: "Chief Financial Officer",
        email: "amanda.hughes@example.com",
        dob: "1976-04-03",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2014-11-01",
        yearsInCompany: calculateYearsInCompany("2014-11-01"),
        salary: 190000,
        manager: null,
        directReports: ["E010"],
        phoneNumber: "206-555-0153",
        emergencyContact: {
            name: "Brian Hughes",
            relationship: "Spouse",
            phoneNumber: "206-555-0154"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["CPA", "Chartered Financial Analyst (CFA)"],
        educationLevel: "MBA in Finance",
        lastPromotionDate: "2018-01-15",
        previousPositions: [
            {
                title: "VP of Finance",
                department: "Finance",
                startDate: "2014-11-01",
                endDate: "2018-01-15"
            }
        ],
        skills: ["Financial Strategy", "M&A", "Capital Structure", "Financial Reporting", "Investor Relations", "Risk Management"],
        projectAssignments: ["Financial Transformation", "ERP Implementation"],
        vacationDays: {
            total: 25,
            used: 10,
            remaining: 15
        },
        sickDays: {
            total: 12,
            used: 1,
            remaining: 11
        },
        ssn: "789-01-2347",
        notes: "Strategic financial leader, instrumental in company's growth and profitability improvements."
    },
    "E028": {
        id: "E028",
        name: "Benjamin Wright",
        department: "Legal",
        title: "General Counsel",
        email: "benjamin.wright@example.com",
        dob: "1975-10-18",
        location: {
            city: "Seattle",
            state: "WA",
            country: "USA"
        },
        hireDate: "2016-03-01",
        yearsInCompany: calculateYearsInCompany("2016-03-01"),
        salary: 175000,
        manager: null,
        directReports: ["E011"],
        phoneNumber: "206-555-0155",
        emergencyContact: {
            name: "Catherine Wright",
            relationship: "Spouse",
            phoneNumber: "206-555-0156"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["American Bar Association Member"],
        educationLevel: "JD (Juris Doctor)",
        lastPromotionDate: "2019-05-01",
        previousPositions: [
            {
                title: "Associate General Counsel",
                department: "Legal",
                startDate: "2016-03-01",
                endDate: "2019-05-01"
            }
        ],
        skills: ["Corporate Law", "Contract Negotiation", "Regulatory Compliance", "Intellectual Property", "Employment Law", "Litigation Management"],
        projectAssignments: ["Legal Risk Assessment", "Privacy Policy Overhaul"],
        vacationDays: {
            total: 25,
            used: 12,
            remaining: 13
        },
        sickDays: {
            total: 12,
            used: 3,
            remaining: 9
        },
        ssn: "890-12-3458",
        notes: "Strategic legal advisor, proactively identifies and mitigates legal risks."
    },
    "E029": {
        id: "E029",
        name: "Catherine Ross",
        department: "Customer Support",
        title: "Technical Support Specialist",
        email: "catherine.ross@example.com",
        dob: "1992-12-05",
        location: {
            city: "Denver",
            state: "CO",
            country: "USA"
        },
        hireDate: "2020-08-17",
        yearsInCompany: calculateYearsInCompany("2020-08-17"),
        salary: 68000,
        manager: "E009",
        directReports: [],
        phoneNumber: "720-555-0157",
        emergencyContact: {
            name: "Daniel Ross",
            relationship: "Brother",
            phoneNumber: "720-555-0158"
        },
        performanceRating: 4,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: false,
            retirement401k: true,
            stockOptions: false
        },
        certifications: ["CompTIA A+", "Microsoft Certified: Azure Fundamentals"],
        educationLevel: "Bachelor's in Information Technology",
        lastPromotionDate: null,
        previousPositions: [],
        skills: ["Technical Troubleshooting", "Systems Diagnosis", "Customer Communication", "Problem Documentation", "Knowledge Base Management"],
        projectAssignments: ["Support Chat Implementation", "Technical Documentation Update"],
        vacationDays: {
            total: 15,
            used: 8,
            remaining: 7
        },
        sickDays: {
            total: 10,
            used: 4,
            remaining: 6
        },
        ssn: "901-23-4569",
        notes: "Strong technical skills, effective at resolving complex technical issues, communicates clearly with non-technical customers."
    },
    "E030": {
        id: "E030",
        name: "Daniel Foster",
        department: "Product",
        title: "Product Designer",
        email: "daniel.foster@example.com",
        dob: "1990-07-22",
        location: {
            city: "San Francisco",
            state: "CA",
            country: "USA"
        },
        hireDate: "2019-11-15",
        yearsInCompany: calculateYearsInCompany("2019-11-15"),
        salary: 115000,
        manager: "E013",
        directReports: [],
        phoneNumber: "415-555-0159",
        emergencyContact: {
            name: "Emily Foster",
            relationship: "Sister",
            phoneNumber: "415-555-0160"
        },
        performanceRating: 5,
        benefits: {
            healthInsurance: true,
            dentalInsurance: true,
            visionInsurance: true,
            retirement401k: true,
            stockOptions: true
        },
        certifications: ["Certified User Experience Professional"],
        educationLevel: "Bachelor's in Design",
        lastPromotionDate: "2022-03-01",
        previousPositions: [
            {
                title: "UI/UX Designer",
                department: "Product",
                startDate: "2019-11-15",
                endDate: "2022-03-01"
            }
        ],
        skills: ["User Experience Design", "User Research", "Prototyping", "Wireframing", "Visual Design", "Design Systems"],
        projectAssignments: ["Mobile App Redesign", "Design System Creation"],
        vacationDays: {
            total: 18,
            used: 12,
            remaining: 6
        },
        sickDays: {
            total: 10,
            used: 3,
            remaining: 7
        },
        ssn: "012-34-5680",
        notes: "Exceptional designer, blends aesthetics with usability, collaborates well with engineering team."
    }
};
export default employeesData;
