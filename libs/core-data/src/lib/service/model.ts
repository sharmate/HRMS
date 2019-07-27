export interface Employee {
  sno?: number
  firstName?: string
  middleName?: string
  lastName?: string
  contact?: number
  department?: string
  designation?: string
  email?: string
  password?: string
}

export interface Interview {
  candidateName?: string
  candidateGender?: string
  candidateContact?: string
  candidateEmail?: string
  departmentName?: string
  approvalStatus?: string
}

export interface DesignationQuestion {
  designation_id?: number
  designation_code?: string
  designation_name?: string
}

export interface Question {
  company_id?: number
  interview_question_id?: number
  interview_question?: string
  designation?: DesignationQuestion[]
}

export interface QuestionDetails {
  question_id?: number
  question_name?: string
}

export interface RoundDetails {
  seq?: number
  round_id?: number
  round_name?: string
  question_details?: QuestionDetails[]
}

export interface DesignationQuestionMapping {
  company_id?: number
  id?: number
  costcenter_id?: number
  costcenter_name?: string
  designation_id?: number
  designation_code?: string
  designation_name?: string
  department_id?: string
  department_code?: string
  department_name?: string
  no_of_round?: number
  round_details?: RoundDetails[]
}
