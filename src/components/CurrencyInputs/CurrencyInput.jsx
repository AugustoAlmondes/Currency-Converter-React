import './CurrencyInput.css';

export default function CurrencyInput({
    amount, currency, onAmountChange, onCurrencyChange, currencies
}) {
    return (
        <div className="currency-input">
            <input
                type="number"
                value={amount}
                onChange={(e) => onAmountChange(e.target.value)}
                min="0"
                step="0.01"
            />
            <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value)}
                className="currency-select"
            >
                {currencies.map((curr) => (
                    <option key={curr} value={curr}>
                        {curr}
                    </option>
                ))}
            </select>
        </div>
    );
}