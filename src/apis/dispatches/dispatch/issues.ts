'use server'

import { IssueRequest } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_API_PATH } from '@/apis/path'

const issues = async (dispatchId: number, issueRequest: IssueRequest) => {
  const response = await axios.post(DISPATCH_API_PATH.dispatch + "/" + dispatchId + "/issues", issueRequest)
  return response.data
}

export default issues;