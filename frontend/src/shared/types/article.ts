import type { Comment } from './comment'

export type Article = {
  id: number
  title: string
  content: string
  created_at: string
  updated_at: string
  comments?: Comment[]
}
