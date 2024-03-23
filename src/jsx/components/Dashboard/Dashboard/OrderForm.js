import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ReactSlider from 'react-slider'
import Nouislider from "nouislider-react";
import QRCodeComponent from '../../QRCodeComponent';
//import noUiSlider from "nouislider";
//import "nouislider/distribute/nouislider.css";
//import 'nouislider/dist/nouislider.css';

//let slider;

// function destroyExistingSlider(){
//   if(slider && slider.noUiSlider){
//     slider.noUiSlider.destroy();
//   }
// }

const OrderForm = ({balance}) =>{
	// useEffect(()=>{
	// 	//destroyExistingSlider();
	// 	var slider = document.getElementById('slider');
	// 	noUiSlider.create(slider, {
	// 		start: [20, 80],
	// 		connect: true,
	// 		range: {
	// 			'min': 0,
	// 			'max': 100
	// 		}
	// 	});
	//});
	const [showQr, setShowQr] = useState(false);

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
	return(
		<>
			{showQr && (<QRCodeComponent address="0x71544528c2e3dfb51dfce92fa393c3b192042b04" toggleQR={toggleQR}/>)}
			<form>
				<div className="sell-blance">
					<label className="form-label text-primary">IMO AMOUNT</label>
					<div className="form-label blance"><span>BALANCE:</span><p>£{balance}</p></div>
					<div className="input-group">
						<input type="text" className="form-control" disabled placeholder="10,000.00" />
						<span className="input-group-text">USDT</span>
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