import {useEffect, useState} from "react"
import './App.css';
import Currency from './components/Currency';
import money from "./img/money.png"

function App() {
  const [currencyChoice,setCurrencyChoice] = useState([])
  const [source,setSource] = useState("USD")
  const [destination,setDestination] = useState("THB")
  const [inputAmount,setInputAmount] = useState(1)
  const [exchangeRate,setExchangeRate] = useState(0)
  const [checkSource,setCheckSource] = useState(true)

  let sourceAmount,destinationAmount
  if (checkSource) {
    sourceAmount = inputAmount
    destinationAmount = (inputAmount * exchangeRate).toFixed(2)
  } else {
    destinationAmount = inputAmount
    sourceAmount = (inputAmount / exchangeRate).toFixed(2)
  }

  useEffect(()=> {
    const url = `https://api.exchangerate-api.com/v4/latest/${source}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      setCurrencyChoice([...Object.keys(data.rates)])
      setExchangeRate(data.rates[destination])
    })
  },[source, destination])

  const onChangeSource = (e) => {
    setInputAmount(e.target.value)
    setCheckSource(true)
  }
  const onChangeDestination = (e) => {
    setInputAmount(e.target.value)
    setCheckSource(false)
  }

  return (
    <div>
      <img src = {money} alt = "logo" className = "img-money"/>
      <h1> API CURRENCY EXCHANGE </h1>
        <div className = "container">
          <Currency 
            currencyChoice = {currencyChoice} 
            selectedCurrency = {source}
            changeCurrency = {(e)=> setSource(e.target.value)}
            inputAmount = {sourceAmount}
            onChangeAmount = {onChangeSource}
          />
          <div className = "equal"> = </div>
          <Currency 
            currencyChoice = {currencyChoice}
            selectedCurrency = {destination}
            changeCurrency = {(e)=> setDestination(e.target.value)}
            inputAmount = {destinationAmount}
            onChangeAmount = {onChangeDestination}
          />
         </div>
    </div>
  );
}

export default App;