import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { getArticles } from '../../shared/api/article'
import { truncateText } from '../../shared/helpers'
import styles from './ArticlesListPage.module.scss'

export function ArticlesListPage() {
  const articlesQuery = useQuery({
    queryKey: ['articles'],
    queryFn: async () => (await getArticles()).data,
  })

  if (articlesQuery.isLoading) return <div>Загрузка…</div>
  if (articlesQuery.isError) return <div>Ошибка: {articlesQuery.error.message}</div>

  const articles = articlesQuery.data

  return (
    <div>
      <h1 className={styles.title}>Статьи</h1>

      {articles && articles.length > 0 ? (
        <div className={styles.list}>
          {articles.map((article) => (
            <Link key={article.id} className={styles.cardLinkWrapper} to={`/articles/${article.id}`}>
              <div className={styles.card}>
                <div className={styles.date}>{article.created_at}</div>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <div className={styles.preview}>{truncateText(article.content, 180)}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>Нет статей</div>
      )}
    </div>
  )
}
