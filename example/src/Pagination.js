import { getPagination } from '@kaliber/pagination'
import styles from './Pagination.css'

export function Pagination({ currentPage, maxPages, onPageChange, deriveUrl }) {

  // Semantics: https://www.a11ymatters.com/pattern/pagination/
  return (
    <nav className={styles.component} aria-label='Pagination'>
      <Arrow
        page={currentPage + 1}
        onClick={() => handleClick(currentPage + 1)}
        layoutClassName={styles.next}
        label={`Next page (page ${currentPage + 1})`}
        disabled={currentPage >= maxPages}
        dataX='goto-next-page'
        {...{ maxPages, deriveUrl }}
      >
        →
      </Arrow>

      <Arrow
        page={currentPage - 1}
        onClick={() => handleClick(currentPage - 1)}
        layoutClassName={styles.previous}
        label={`Previous page (page ${currentPage - 1})`}
        disabled={currentPage <= 1}
        dataX='goto-previous-page'
        {...{ maxPages, deriveUrl }}
      >
        ←
      </Arrow>

      <Bullets onBulletClick={handleClick} {...{ currentPage, maxPages, deriveUrl }} />
    </nav>
  )

  function handleClick(x) {
    if (x !== currentPage) onPageChange(x)
  }
}

function Bullets({ current, max, deriveUrl, onBulletClick }) {
  const pagination = getPagination({ current, max, padding: 1 })

  return (
    <ul className={styles.componentBullets}>
      {pagination.map((x, i) => x
        ? (
          <li key={i}>
            <Bullet
              page={x}
              url={deriveUrl(x)}
              active={current === x}
              onClick={() => onBulletClick(x)}
              dataX={`goto-page-${x}`}
            />
          </li>
        )
        : <li key={i} role="presentation" className={styles.gap}>…</li>
      )}
    </ul>
  )
}

function Bullet({ page, url, active, onClick, dataX }) {
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
        onClick={handleClick}
        aria-label={`Page ${page}`}
        data-x={dataX}
      >
        {page}
      </a>
    )

  function handleClick(e) {
    e.preventDefault()
    onClick(page)
  }
}

function Arrow({ page, max, deriveUrl, onClick, disabled, layoutClassName, label, dataX, children }) {
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
        href={deriveUrl(page)}
        className={cx(styles.componentArrow, layoutClassName)}
        onClick={handleClick}
        aria-label={label}
        data-x={dataX}
      >
        {children}
      </a>
    )

  function handleClick(e) {
    e.preventDefault()
    onClick(page)
  }
}
