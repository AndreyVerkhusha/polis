import { useMutation, useQuery } from '@tanstack/react-query'
import { type SubmitEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getArticle } from '../../shared/api/article'
import { postComment } from '../../shared/api/comment'
import type { Comment } from '../../shared/types/comment'
import { SubmitButton } from '../../shared/ui/SubmitButton/SubmitButton'
import { TextArea } from '../../shared/ui/TextArea'
import { TextInput } from '../../shared/ui/TextInput'
import styles from './ArticleDetailPage.module.scss'

export function ArticleDetailPage() {
  const params = useParams()
  const articleId = Number(params.id)

  const [comments, setComments] = useState<Comment[]>([])
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')

  const articleQuery = useQuery({
    queryKey: ['articles', articleId],
    queryFn: async () => (await getArticle(articleId)).data,
    enabled: articleId > 0,
  })

  const article = articleQuery.data

  const createCommentMutation = useMutation({
    mutationFn: async () => postComment(articleId, { author_name: authorName, content }),
  })

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await createCommentMutation.mutateAsync()

    setAuthorName('')
    setContent('')
    setComments((prevComments) => [...prevComments, response.data])
  }

  useEffect(() => {
    setComments(article?.comments ?? [])
  }, [article])

  if (articleQuery.isLoading) return <div>Загрузка…</div>
  if (articleQuery.isError) return <div>Ошибка: {articleQuery.error.message}</div>

  return (
    <div>
      <h1 className={styles.title}>{article?.title}</h1>
      <div className={styles.date}>{article?.created_at}</div>
      <div className={styles.content}>{article?.content}</div>
      <h2 className={styles.sectionTitle}>Комментарии</h2>

      {comments.length === 0 ? (
        <div>Комментариев нет</div>
      ) : (
        <div className={styles.comments}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.commentCard}>
              <div className={styles.commentHeader}>
                <strong>{comment.author_name}</strong>
                <span className={styles.commentDate}>{comment.created_at}</span>
              </div>
              <div className={styles.commentText}>{comment.content}</div>
            </div>
          ))}
        </div>
      )}

      <h3 className={styles.sectionTitle}>Добавить комментарий</h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput value={authorName} onChange={setAuthorName} placeholder="Имя" required maxLength={255} />
        <TextArea value={content} onChange={setContent} placeholder="Текст комментария" required rows={4} />

        {createCommentMutation.isError && (
          <div className={styles.error}>Ошибка: {createCommentMutation.error.message}</div>
        )}

        <SubmitButton isPending={createCommentMutation.isPending} text="Сохранить" pendingText="Сохранение…" />
      </form>
    </div>
  )
}
