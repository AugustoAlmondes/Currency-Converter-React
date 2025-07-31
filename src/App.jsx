import { useState, useEffect, useCallback } from 'react';
import './App.css';
import CurrencyInput from './components/CurrencyInputs/CurrencyInput';
import axios from 'axios';
import Background from './components/Background/Background';

export default function App() {
    const [amount1, setAmount1] = useState(1);
    const [amount2, setAmount2] = useState(1);
    const [currency1, setCurrency1] = useState("USD");
    const [currency2, setCurrency2] = useState("EUR");
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                // API alternativa mais confiável (você precisará de uma chave API)
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency1}`);
                setRates(response.data.rates);
                setError(null);
            } catch (err) {
                console.error("Error fetching rates:", err);
                setError("Não foi possível carregar as taxas de câmbio. Tente novamente mais tarde.");
                // Valores padrão para demonstração
                setRates({
                    USD: 1,
                    EUR: 0.93,
                    BRL: 5.05,
                    GBP: 0.79,
                    JPY: 151.62
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [currency1]);

    const convert = useCallback((amount, from, to) => {
        if (!rates) return 0;
        return (amount * rates[to]) / rates[from];
    }, [rates]);

    const handleAmount1Change = (value) => {
        setAmount1(value);
        setAmount2(convert(value, currency1, currency2).toFixed(2));
    };

    const handleCurrency1Change = (currency) => {
        setCurrency1(currency);
        setAmount2(convert(amount1, currency, currency2).toFixed(2));
    };

    const handleAmount2Change = (value) => {
        setAmount2(value);
        setAmount1(convert(value, currency2, currency1).toFixed(2));
    };

    const handleCurrency2Change = (currency) => {
        setCurrency2(currency);
        setAmount1(convert(amount2, currency, currency1).toFixed(2));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando taxas de câmbio...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <p>Usando valores demonstrativos</p>
            </div>
        );
    }

    return (
        <div className="app">
            <Background />
            <div className="container">
                <h1>Conversor de Moedas</h1>
                <div className="content">
                    <div className="instructions">
                        <p>Digite o valor e selecione as moedas para conversão</p>
                    </div>
                    <div className="inputs">
                        <CurrencyInput
                            onAmountChange={handleAmount1Change}
                            onCurrencyChange={handleCurrency1Change}
                            currencies={Object.keys(rates)}
                            amount={amount1}
                            currency={currency1}
                        />
                        <div className="swap-icon">⇄</div>
                        <CurrencyInput
                            onAmountChange={handleAmount2Change}
                            onCurrencyChange={handleCurrency2Change}
                            currencies={Object.keys(rates)}
                            amount={amount2}
                            currency={currency2}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}