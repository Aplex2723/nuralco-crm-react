// authurl
export const SERVER = 'http://127.0.0.1:8000/api/' 
// export const SERVER = process.env.REACT_APP_BASE_URL
export const LoginUrl = 'auth/login'
export const RegisterUrl = 'auth/register'
export const ForgotPasswordUrl = 'auth/forgot-password'
export const ResetActivationLinkUrl = "auth/resend-activation-link"
// org
export const OrgUrl = 'auth/create-org'
// company
export const CompanyUrl = 'auth/companies-list'
// Lead
export const LeadUrl = 'leads'
// Contact
export const ContactUrl = 'contacts'
// Opportunity
export const OpportunitiesUrl = 'opportunities'
// ACCOUNTS
export const accountUrl = 'accounts'
// CASES
export const CasesUrl = 'cases'
// USERS
export const UserUrl = 'users'

export const SubscriptionUrl = 'users/subscription'
  
export const headersAuthOrg = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `jwt ${localStorage.getItem('Token')}`,
    org: localStorage.getItem('org')
  }