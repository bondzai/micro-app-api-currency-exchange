import '../App.css'
const Currency = (props) => {
    const {currencyChoice, selectedCurrency, changeCurrency, inputAmount, onChangeAmount} = props      
    return (
        <div className = "currency">
            <select value = {selectedCurrency} onChange = {changeCurrency}>
                {currencyChoice.map((choice)=>
                    <option key = {choice} value = {choice}> {choice} </option>
                )}
            </select>
            <input 
                type = "number"
                value = {inputAmount}
                onChange = {onChangeAmount}
            />
        </div>
    )
}

export default Currency;