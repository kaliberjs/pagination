import { Pagination }  from './Pagination'

export default function App() {
  const [page, setPage] = React.useState(1)
  const [max, setMax] = React.useState('10')

  return (
    <div>
      <Pagination max={Number(max)} onChange={setPage} current={page} deriveUrl={p => `?page=${p}`} />
      <input
        type='range'
        step={1}
        min={1}
        max={25}
        value={max}
        onInput={e => setMax(e.currentTarget.value)}
      />
    </div>
  )
}

