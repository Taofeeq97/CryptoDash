import { useState, useEffect } from "react";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/not-found";
import COinDetailPage from "./pages/coni-details";

import Header from "./components/Header";
import { Routes,Route } from "react-router";

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


  return ( 
    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage 
      coins={coins}
      filter={filter}
      setFilter={setFilter}
      limit={limit}
      setLimit={setLimit}
      isloading={isloading}
      setLoading={setLoading}
      sortBy={sortBy}
      setSortBy={setSortby}
      errors={errors}
      setErrors={setErrors}
      
      />} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path='coin/:id' element={<COinDetailPage />} />
      <Route  path="*" element={<NotFoundPage />}/>
    </Routes>
    </>
   );
}
 
export default App;