import React, {useState, useEffect} from 'react';
import {useFormState} from 'react-use-form-state';
import {set, get, clear} from 'idb-keyval';
import money from 'money';

import Input from './input';
import Select from './select';
import Button from './convert-button';
import Reset from './reset-button';

const Converter = () => {
	const [formState, {number, select}] = useFormState();
	const [result, setResult] = useState('');

	useEffect(() => {
		get('exchangeRates').then(async val => {
			const cacheTimestamp = await get('cc-timestamp');
			const currentTimestamp = await Math.floor(Date.now() / 1000);

			// Check whether cached data exists and if it does, whether it's older than one week
			if (val === undefined || cacheTimestamp === undefined || (cacheTimestamp - currentTimestamp) < -604800) {
				clear();

				const request = await fetch('https://api.exchangeratesapi.io/latest');
				const response = await request.json();

				set('exchangeRates', response);
				set('cc-timestamp', currentTimestamp);
			} else {
				console.log('Using cached data');
			}
		});
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

		const {values} = formState;

		get('exchangeRates').then(async val => {
			money.base = values.from;
			money.rates = val.rates;

			const result = money.convert(values.amount, {from: values.from, to: values.to}).toFixed(3);

			setResult(`${values.amount} ${values.from} => ${result} ${values.to}`);
		}).catch(error => {
			setResult(`Something went wrong: ${error}`);
		});
	};

	const resetState = () => {
		formState.clear();
		setResult('');
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
        Amount
					<br/>
					<Input required {...number('amount')} type="number" min="1" step="any" pattern="[0-9]*" name="amount" placeholder="Amount"/>
				</label>
				<br/>
				<label>
        From
					<br/>
					<Select required {...select('from')}>
						<option value="">Select</option>
						<option value="AUD">🇦🇺 Australian dollar</option>
						<option value="BRL">🇧🇷 Brazilian real</option>
						<option value="BGN">🇧🇬 Bulgarian lev</option>
						<option value="CAD">🇨🇦 Canadian dollar</option>
						<option value="CNY">🇨🇳 Chinese yuan</option>
						<option value="HRK">🇭🇷 Croatian kuna</option>
						<option value="CZK">🇨🇿 Czech koruna</option>
						<option value="DKK">🇩🇰 Danish krone</option>
						<option value="EUR">🇪🇺 Euro</option>
						<option value="USD">🇺🇸 US dollar</option>
						<option value="HKD">🇭🇰 Hong Kong dollar</option>
						<option value="HUF">🇭🇺 Hungarian forint</option>
						<option value="ISK">🇮🇸 Icelandic krona</option>
						<option value="INR">🇮🇳 Indian rupee</option>
						<option value="IDR">🇮🇩 Indonesian rupiah</option>
						<option value="ILS">🇮🇱 Israeli shekel</option>
						<option value="JPY">🇯🇵 Japanese yen</option>
						<option value="NOK">🇳🇴 Norwegian krone</option>
						<option value="PLN">🇵🇱 Polish zloty</option>
						<option value="GBP">🇬🇧 Pound sterling</option>
						<option value="RON">🇷🇴 Romanian leu</option>
						<option value="RUB">🇷🇺 Russian rouble</option>
						<option value="KRW">🇰🇷 South Korean won</option>
						<option value="MXN">🇲🇽 Mexican peso</option>
						<option value="MYR">🇲🇾 Malaysian ringgit</option>
						<option value="NZD">🇳🇿 New Zealand dollar</option>
						<option value="PHP">🇵🇭 Philippine peso</option>
						<option value="SGD">🇸🇬 Singapore dollar</option>
						<option value="THB">🇹🇭 Thai baht</option>
						<option value="ZAR">🇿🇦 South African rand</option>
						<option value="SEK">🇸🇪 Swedish krona</option>
						<option value="CHF">🇨🇭 Swiss franc</option>
						<option value="TRY">🇹🇷 Turkish lira</option>
					</Select>
				</label>
				<br/>
				<label>
        To
					<br/>
					<Select required {...select('to')}>
						<option value="">Select</option>
						<option value="AUD">🇦🇺 Australian dollar</option>
						<option value="BRL">🇧🇷 Brazilian real</option>
						<option value="BGN">🇧🇬 Bulgarian lev</option>
						<option value="CAD">🇨🇦 Canadian dollar</option>
						<option value="CNY">🇨🇳 Chinese yuan</option>
						<option value="HRK">🇭🇷 Croatian kuna</option>
						<option value="CZK">🇨🇿 Czech koruna</option>
						<option value="DKK">🇩🇰 Danish krone</option>
						<option value="EUR">🇪🇺 Euro</option>
						<option value="USD">🇺🇸 US dollar</option>
						<option value="HKD">🇭🇰 Hong Kong dollar</option>
						<option value="HUF">🇭🇺 Hungarian forint</option>
						<option value="ISK">🇮🇸 Icelandic krona</option>
						<option value="INR">🇮🇳 Indian rupee</option>
						<option value="IDR">🇮🇩 Indonesian rupiah</option>
						<option value="ILS">🇮🇱 Israeli shekel</option>
						<option value="JPY">🇯🇵 Japanese yen</option>
						<option value="NOK">🇳🇴 Norwegian krone</option>
						<option value="PLN">🇵🇱 Polish zloty</option>
						<option value="GBP">🇬🇧 Pound sterling</option>
						<option value="RON">🇷🇴 Romanian leu</option>
						<option value="RUB">🇷🇺 Russian rouble</option>
						<option value="KRW">🇰🇷 South Korean won</option>
						<option value="MXN">🇲🇽 Mexican peso</option>
						<option value="MYR">🇲🇾 Malaysian ringgit</option>
						<option value="NZD">🇳🇿 New Zealand dollar</option>
						<option value="PHP">🇵🇭 Philippine peso</option>
						<option value="SGD">🇸🇬 Singapore dollar</option>
						<option value="THB">🇹🇭 Thai baht</option>
						<option value="ZAR">🇿🇦 South African rand</option>
						<option value="SEK">🇸🇪 Swedish krona</option>
						<option value="CHF">🇨🇭 Swiss franc</option>
						<option value="TRY">🇹🇷 Turkish lira</option>
					</Select>
				</label>
				<br/>
				<Button type="submit">
							Convert
				</Button>
				<Reset type="reset" onClick={() => {
					resetState();
				}}
				>
							X
				</Reset>
				<br/>
				<br/>
				{result}
			</form>
		</>
	);
};

export default Converter;
