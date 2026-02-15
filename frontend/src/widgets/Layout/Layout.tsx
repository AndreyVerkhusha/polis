import { NavLink, Outlet } from 'react-router-dom'

import styles from './Layout.module.scss'

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link
}

export function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={navClass}>
            Статьи
          </NavLink>
          <NavLink to="/new" className={navClass}>
            Новая статья
          </NavLink>
        </nav>

        <a className={styles.swagger} href="http://localhost:8080/swagger" target="_blank" rel="noreferrer">
          Swagger
        </a>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
