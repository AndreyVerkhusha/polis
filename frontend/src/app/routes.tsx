import { createBrowserRouter } from 'react-router-dom'

import { ArticleDetailPage } from '../pages/ArticleDetailPage'
import { ArticlesListPage } from '../pages/ArticlesListPage'
import { NewArticlePage } from '../pages/NewArticlePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { Layout } from '../widgets/Layout'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <ArticlesListPage /> },
      { path: '/articles/:id', element: <ArticleDetailPage /> },
      { path: '/new', element: <NewArticlePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
