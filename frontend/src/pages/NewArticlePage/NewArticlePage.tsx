import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type SubmitEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { postArticle } from '../../shared/api/article'
import type { Article } from '../../shared/types/article'
import { SubmitButton } from '../../shared/ui/SubmitButton/SubmitButton'
import { TextArea } from '../../shared/ui/TextArea'
import { TextInput } from '../../shared/ui/TextInput'
import styles from './NewArticlePage.module.scss'

export function NewArticlePage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    createArticleMutation.mutate()
  }

  const createArticleMutation = useMutation({
    mutationFn: async () => postArticle({ title, content }),
    onSuccess: async (response) => {
      const createdArticle = response.data

      queryClient.setQueryData(['articles'], (oldArticles: Article[] | undefined) => {
        if (!oldArticles) return [createdArticle]

        const exists = oldArticles.some((article) => article.id === createdArticle.id)
        if (exists) return oldArticles

        return [createdArticle, ...oldArticles]
      })

      await queryClient.invalidateQueries({ queryKey: ['articles'] })

      navigate(`/articles/${createdArticle.id}`)
    },
  })

  return (
    <div>
      <h1 className={styles.title}>Новая статья</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput value={title} onChange={setTitle} placeholder="Заголовок" required />
        <TextArea value={content} onChange={setContent} placeholder="Текст статьи" required rows={10} />

        {createArticleMutation.isError ? (
          <div className={styles.error}>Ошибка: {createArticleMutation.error.message}</div>
        ) : null}

        <SubmitButton isPending={createArticleMutation.isPending} text="Создать" pendingText="Сохранение…" />
      </form>
    </div>
  )
}
