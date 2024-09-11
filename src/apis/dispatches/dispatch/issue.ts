'use server'

import { IssueRequest } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_API_PATH } from '@/apis/path'
import toAxios from '@/utils/toAxios'

const issue = async (dispatchId: number, issueRequest: IssueRequest) => {
  const response = await toAxios(
    axios.patch(
      `${DISPATCH_API_PATH.dispatch}/${dispatchId}/issue`,
      issueRequest
    )
  );
  return response;
};

export default issue;