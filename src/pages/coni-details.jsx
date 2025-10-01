import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import CoinChart from "../components/CoinChart";


const API_URL = import.meta.env.VITE_DETAIL_API_URL

const COinDetailPage = () => {
    const {id} = useParams();

    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoin = async() => {
            try {
                const resp = await fetch(`${API_URL}/${id}`)
                if (!resp.ok) throw new Error ('Failed to fetch data')
                const data = await resp.json()
                setCoin(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
            
        }
        fetchCoin();
    }, [id])
    return ( 
        <div className="coin-details-container">
            <Link  to='/'> Home Page </Link>
            <h1 className="coni-details-title">
                {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
            </h1>
            {loading && <Spinner />}
            {error && <div className="error"> {error}</div>}
            {!loading && !error && (
                <>
                <img src={coin.image.large} alt={coin.name} className="coin-details-image" />
                <p>{coin.description.en.split('.')[0] + '.'}</p>

                <div className="coin-details-info">
                    <h3>Rank: #{coin.market_cap_rank}</h3>
                    <h3>Current Price: {coin.market_data.current_price.usd.toLocaleString()} USD</h3>
                    <h4>Market Cap: {coin.market_data.market_cap.usd.toLocaleString()} USD</h4>
                </div>

                 < CoinChart coinID={coin.id} />

                <div className="coin-details-links">
                    {coin.links.homepage[0]  && (
                        <p>
                            🌐{' '}
                            <a 
                                href={coin.links.homepage[0]}
                                target="_blank"
                                rel='noopener noreferrer'
                            >
                                Website
                            </a>
                        </p>
                    )}
                    {coin.categories.length > 0 && (
                        <p> Categories: {coin.categories.join(', ')}</p>
                    )}
                    </div>

                
                </>
            )}
            {!loading && !error && !coin && (
                <p>No Data Found</p>
            )}
        </div>
     );
}
 
export default COinDetailPage;