import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/Filterinput";
import SortSelector from "./components/sortSelector";

const API_URL = import.meta.env.VITE_API_URL
const App = () => {

  const [coins, setCoins] = useState([])
  const [isloading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('')
  const [sortBy, setSortby] = useState('market_cap_desc')




  useEffect(() => {

      const fetchCoins = async () => {
        try{
          const res =await fetch(`${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`)
          if (!res.ok) throw new Error('Error fetching data')
          const data = await res.json()
          console.log(data)
          setCoins(data)
        }
        catch(error) {
          setErrors(error.message)
        } finally {
          setLoading(false)
        }

      }

      fetchCoins();

  }, [limit])

    const filteredCoins = coins.filter((coin) => {
      return coin.name.toLowerCase().includes(filter.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(filter.toLowerCase()
    )
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap
        case 'market_cap_asc':
          return a.market_cap - b.market_cap
        case 'price_desc':
          return b.current_price - a.current_price
        case 'price_asc':
          return a.current_price - b.current_price
        case 'change_desc':
          return b.price_change_percetage_24h - a.price_change_percetage_24h
        case 'change_asc':
          return a.price_change_percetage_24h - b.price_change_percetage_24h
      }
    })

  return ( 
    <div>
    <h1>🚀 Crypto Dash</h1>
     {isloading && <p>Loading....</p>}
     {errors && <div className="error">{errors}</div>}
     <div className="top-controls">
     <FilterInput filter={filter} onFilterChange={setFilter} />
     <LimitSelector limit={limit} setLimit={setLimit} />
     <SortSelector sortBy={sortBy} onChangeSort={setSortby} />
     </div>
      {!isloading && !errors && (
        <main className="grid">
          { filteredCoins.length > 0 ? filteredCoins.map((coin) => (
            <CoinCard key={coin.id} coin={coin}/>
          )) : <p>`No coin match the filtered word ${filter}` </p>
          }
        </main>
      )}
     </div>
   );
}
 
export default App;