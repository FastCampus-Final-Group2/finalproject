'use server'

import { IssueRequest } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_API_PATH } from '@/apis/path'
import toAxios from '@/utils/toAxios'

const issues = async (issueRequest: IssueRequest) => {
  return toAxios(axios.post(DISPATCH_API_PATH.dispatchIdIssue, issueRequest))
}

export default issues;