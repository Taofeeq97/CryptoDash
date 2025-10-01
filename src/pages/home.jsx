
import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/Filterinput";
import SortSelector from "../components/sortSelector";
import Spinner from "../components/Spinner";


const HomePage = ({
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    isloading,
    errors,
    setErrors,
}) => {

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
     {isloading && <Spinner  color="white"/>}
     {errors && <div className="error">{errors}</div>}
     <div className="top-controls">
     <FilterInput filter={filter} onFilterChange={setFilter} />
     <LimitSelector limit={limit} onLimitChange={setLimit} />
     <SortSelector sortBy={sortBy} onChangeSort={setSortBy} />
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
 
export default HomePage;