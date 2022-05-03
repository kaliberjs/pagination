import { getPagination } from '@kaliber/pagination'
import styles from './Pagination.css'

export function Pagination({ currentPage, maxPages, deriveUrl }) {

  // Semantics: https://www.a11ymatters.com/pattern/pagination/
  return (
    <nav className={styles.component} aria-label='Pagination'>
      <Arrow
        page={currentPage + 1}
        url={deriveUrl(currentPage + 1)}
        layoutClassName={styles.next}
        label={`Next page (page ${currentPage + 1})`}
        disabled={currentPage >= maxPages}
        dataX='goto-next-page'
      >
        →
      </Arrow>

      <Arrow
        page={currentPage - 1}
        url={deriveUrl(currentPage - 1)}
        layoutClassName={styles.previous}
        label={`Previous page (page ${currentPage - 1})`}
        disabled={currentPage <= 1}
        dataX='goto-previous-page'
      >
        ←
      </Arrow>

      <Bullets {...{ currentPage, maxPages, deriveUrl }} />
    </nav>
  )
}

function Bullets({ currentPage, maxPages, deriveUrl }) {
  const pagination = getPagination({ current: currentPage, max: maxPages, padding: 1 })

  return (
    <ul className={styles.componentBullets}>
      {pagination.map((x, i) => x
        ? (
          <li key={i}>
            <Bullet
              page={x}
              url={deriveUrl(x)}
              active={currentPage === x}
              dataX={`goto-page-${x}`}
            />
          </li>
        )
        : <li key={i} role="presentation" className={styles.gap}>…</li>
      )}
    </ul>
  )
}

function Bullet({ page, url, active, dataX }) {
  return active
    ? (
      <strong
        className={cx(styles.componentBullet, styles.isActive)}
        aria-current='true'
        aria-label={`Page ${page} (current page)`}
      >
        {page}
      </strong>
    )
    : (
      <a
        className={styles.componentBullet}
        href={url}
        aria-label={`Page ${page}`}
        data-x={dataX}
      >
        {page}
      </a>
    )
}

function Arrow({ url, onClick, disabled, layoutClassName, label, dataX, children }) {
  return disabled
    ? (
      <span
        className={cx(styles.componentArrow, styles.disabled, layoutClassName)}
        aria-hidden='true'
      >
        {children}
      </span>
    )
    : (
      <a
        href={url}
        className={cx(styles.componentArrow, layoutClassName)}
        aria-label={label}
        data-x={dataX}
      >
        {children}
      </a>
    )
}
