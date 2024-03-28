import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ReactSlider from 'react-slider'
import Nouislider from "nouislider-react";
import QRCodeComponent from '../../QRCodeComponent';
import axios from 'axios';


const OrderForm = ({balance, investments}) =>{

	const [showQr, setShowQr] = useState(false);
	const [placeholderValue, setPlaceholderValue] = useState(""); // Initialize placeholderValue state with an empty string
	const [pounds, setPounds] = useState(0)
	function toggleQR(){
		setShowQr(!showQr)
	}

	useEffect(()=>{
		// Disable scroll on x-axis
		if(showQr){
			document.body.style.overflowY = 'hidden';
			document.documentElement.style.overflowY = 'hidden';
		}else{
			document.body.style.overflowY = 'auto';
			document.documentElement.style.overflowY = 'auto';
		}
	}, [showQr])

	const fetchAndUpdatePlaceholder = async () => {
		try {
			let convertedPlaceholder = placeholderValue; // Default to the original placeholder value
			for (let i = investments.length - 1; i >= 0; i--) {
				if (investments[i].imo_deposit_amount > 0) {
					const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/investments/poundsToUsdt`);
					const exchangeRate = response.data.usdtToPoundsRate; // Assuming the response data structure
					// Ensure that exchangeRate and investment amount are numeric
					const convertedAmount = parseFloat(investments[i].imo_deposit_amount) * parseFloat(exchangeRate);
					convertedPlaceholder = convertedAmount.toFixed(2);
					setPounds(convertedPlaceholder)
					break; // Exit the loop once a value greater than 0 is found
				}
			}
			console.log('Converted placeholder:', convertedPlaceholder);
			setPlaceholderValue(convertedPlaceholder);
		} catch (error) {
			console.error('Error converting pounds to USDT:', error);
			// Handle error gracefully, fallback to default value or previous placeholder
		}
	};
	useEffect(() => {
		// Fetch and update placeholder every 5 seconds
		const intervalId = setInterval(fetchAndUpdatePlaceholder, 20000);
	
		// Cleanup function to clear the interval when component unmounts or when dependencies change
		return () => clearInterval(intervalId);
	}, [investments, placeholderValue]); // Run whenever investments or placeholderValue change
	
	useEffect(()=> {
		fetchAndUpdatePlaceholder()
	},[])
	return(
		<>
			{showQr && (<QRCodeComponent pounds={pounds} address="0x71544528c2e3dfb51dfce92fa393c3b192042b04" toggleQR={toggleQR}/>)}
			<form>
				<div className="sell-blance">
					<label className="form-label text-primary">IMO AMOUNT</label>
					<div className="form-label blance"><span>BALANCE:</span><p>£{balance}</p></div>
					<div className="input-group">
					<input
					type="text"
					className="form-control"
					disabled
					placeholder={placeholderValue}
					/>						<span className="input-group-text">USDT</span>
					</div>
				</div>
				{/* <div className="sell-blance">
					<label className="form-label text-primary">IMO Amount</label>
					<div className="input-group">
						<input type="text" className="form-control" placeholder="Amount" />
						<span className="input-group-text">ETH</span>
					</div>
				</div> */}
				{/* <div className="sell-blance">
					<label className="form-label text-primary">Total</label>
					<div className="input-group">
						<input type="text" className="form-control" placeholder="Total" />
						<span className="input-group-text">USDT</span>
					</div>
				</div> */}
				{/* <div className="slider-wrapper">
					<div id="slider"></div>
				  <div id="employees"></div>
					<Nouislider range={{ min: 0, max: 100 }} start={[20, 80]} connect />
					<ReactSlider
						min={5}
						max={99}
						defaultValue={27}
						className="progress-slider"
						thumbClassName="example-thumb"
						trackClassName="example-track"
						renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
					/>
					
				</div> */}
				<div style={{marginTop: '10%'}} className="text-center">
					<Link className="btn btn-primary w-75" onClick={toggleQR}>DEPOSIT NOW</Link>
				</div>
					
			</form>
		</>
	)
}
export default OrderForm;