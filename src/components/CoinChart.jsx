import {Line} from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import {
    Chart as Chartjs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
} from 'chart.js'

import 'chartjs-adapter-date-fns'

Chartjs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale
)

const API_URL = import.meta.env.VITE_DETAIL_API_URL
const CoinChart = ({coinID}) => {
    const [chartData, setChartData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPrices = async () => {
            const response = await fetch(`${API_URL}/${coinID}/market_chart?vs_currency=usd&days=7`)
            const data = await response.json()
            console.log(data)
            const prices = data.prices.map((price) => ({
                x: price[0],
                y: price[1]
            }))

            setChartData({
                datasets: [
                    {
                        label: "Prices (USD)",
                        data: prices,
                        fill:true,
                        borderColor: '#007bff',
                        backgroundColor:'rgba(0, 123, 255, 0.1)',
                        pointRadius: 0,
                        tension: 0.3

                    }
                ]
            })
            setLoading(false)
        }

        fetchPrices();
    }, [coinID])
    return (
        
        <div style={{marginTop: '30px'}}>
            {!loading && 
            
            <Line 

            data={chartData}
            options={{
                responsive: true,
                plugins: {
                    legend: {display: false},
                    tooltip: {mode: 'index', intersect: false}
                },
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        ticks:{
                            autoSkip: true,
                            maxTicksLimit: 7,

                        }
                    },
                    y: {
                        ticks: {
                            callback: (value) => `$${value.toLocaleString()}`
                        }
                    }
                }

            }}
            
            />
            }
        </div>
         );
}
 
export default CoinChart;