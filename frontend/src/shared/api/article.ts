import type { DataResponse } from '../types/api'
import type { Article } from '../types/article'
import { apiRequest } from './api'

export function getArticles(): Promise<DataResponse<Article[]>> {
  return apiRequest('/articles')
}

export function getArticle(articleId: number): Promise<DataResponse<Article>> {
  return apiRequest(`/articles/${articleId}`)
}

export function postArticle(payload: { title: string; content: string }): Promise<DataResponse<Article>> {
  return apiRequest('/articles', { method: 'POST', body: payload })
}
