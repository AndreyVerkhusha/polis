import type { DataResponse } from '../types/api'
import type { Comment } from '../types/comment'
import { apiRequest } from './api'

export function postComment(
  articleId: number,
  payload: { author_name: string; content: string },
): Promise<DataResponse<Comment>> {
  return apiRequest(`/articles/${articleId}/comments`, { method: 'POST', body: payload })
}
