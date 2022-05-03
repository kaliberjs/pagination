import { useQueryString } from '@kaliber/use-query-string'
import qs from 'query-string'
import { Pagination }  from './Pagination'

export default function App() {
  const [{ page = '1', max = '10', ...rest }, setQueryString] = useQueryString()

  return (
    <div>
      <Pagination currentPage={Number(page)} maxPages={Number(max)} {...{ deriveUrl }} />
      <input
        type='range'
        step={1}
        min={1}
        max={25}
        value={max}
        onChange={e => setQueryString(x => ({ ...x, max: Number(e.currentTarget.value) }))}
      />
    </div>
  )

  function deriveUrl(page) {
    const search = qs.stringify({ ...rest, max, page: page === 1 ? null : page }, { skipNull: true })
    return search && `?${search}`
  }
}
