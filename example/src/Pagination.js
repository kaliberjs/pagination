import { getPagination } from '@kaliber/pagination'
import styles from './Pagination.css'

export function Pagination({ current, max, deriveUrl, onChange }) {

  // Semantics: https://www.a11ymatters.com/pattern/pagination/
  return (
    <nav className={styles.component} aria-label='Pagination'>
      <Arrow
        page={current + 1}
        onClick={() => handleClick(current + 1)}
        layoutClassName={styles.next}
        label={`Next page (page ${current + 1})`}
        dataX='goto-next-page'
        {...{ max, deriveUrl }}
      >
        →
      </Arrow>

      <Arrow
        page={current - 1}
        onClick={() => handleClick(current - 1)}
        layoutClassName={styles.previous}
        label={`Previous page (page ${current - 1})`}
        dataX='goto-previous-page'
        {...{ max, deriveUrl }}
      >
        ←
      </Arrow>

      <Bullets onBulletClick={handleClick} {...{ current, max, deriveUrl }} />
    </nav>
  )

  function handleClick(x) {
    if (x !== current) onChange(x)
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

function Arrow({ page, max, deriveUrl, onClick, layoutClassName, label, dataX, children }) {
  const hasPage = page >= 1 && page <= max

  return hasPage
    ? (
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
    : (
      <span
        className={cx(styles.componentArrow, styles.disabled, layoutClassName)}
        aria-hidden='true'
      >
        {children}
      </span>
    )

  function handleClick(e) {
    e.preventDefault()
    onClick(page)
  }
}
