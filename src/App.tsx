import './App.css'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { useGetBitcoinDataQuery } from './services/app'
import { changeCurrency } from './features/appSlice'

function App() {
  const INTERVAL_TIME = 3000
  const {data, isLoading, error} = useGetBitcoinDataQuery(undefined, {
    pollingInterval: INTERVAL_TIME
  })
  const {currency} = useAppSelector(state => state.app)
  const dispatch = useAppDispatch()
  const handleCurrencySelection = (e: any) => dispatch(changeCurrency(e.target.value))
  

  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Что-то пошло не так</div>
  return (
      <div className='wrapper'>
        <h2>Цена Биткоина</h2>
        <select value={currency} onChange={handleCurrencySelection}>
          {data &&
            Object.keys(data).map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <div className='wrappercur'>
          <h2 className='cur'>
            {data && data[currency].symbol}
            {data && data[currency].last}
          </h2>
        </div>
      </div>
  )
}

export default App
