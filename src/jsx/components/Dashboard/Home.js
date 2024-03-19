import React,{useContext, useEffect, useReducer,  useState} from 'react';
import {Link} from 'react-router-dom';
//import {NavLink} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import {Dropdown, Nav, Tab} from 'react-bootstrap';

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import BalanceCardSlider from './Dashboard/BalanceCardSlider';
//import MorrisDonught from './Dashboard/MorrisDonught';
import OrderForm from './Dashboard/OrderForm';
//import ServerStatusBar from './Dashboard/ServerStatusBar';
import {LtcIcon, BtcIcon, XtzIcon, EthIcon} from './SvgIcon';

//images
import coin from './../../../images/coin.png';
import metaverse from './../../../images/metaverse.png';


const DashboardComboChart = loadable(() =>
	pMinDelay(import("./Dashboard/DashboardComboChart"), 1000)
);
const AssetsChart = loadable(() =>
	pMinDelay(import("./Dashboard/AssetsChart"), 1000)
);

const ServerStatusBar = loadable(() =>
	pMinDelay(import("./Dashboard/ServerStatusBar"), 1000)
);


const pickerData = [
	// {fillcolor: 'var(--primary)', datatitle:'XTZ(40%)', price:'763'},
	// {fillcolor: '#2A353A', datatitle:'BTC(20%)', price:'321'},
	{fillcolor: '#C0E192', datatitle:'USDT(100%)', price:'2,478.90'},
	// {fillcolor: '#E085E4', datatitle:'ETH(10%)', price:'154'},
];


const marketBlog = [
	// {icon: LtcIcon, classBg: 'bg-success', Name:'LTC', },
	// {icon: BtcIcon, classBg: 'bg-warning', Name:'BTC', },
	// {icon: XtzIcon, classBg: 'bg-primary', Name:'XTZ', },
	{icon: EthIcon, classBg: 'bg-pink', Name:'HGC', },
	// {icon: XtzIcon, classBg: 'bg-primary', Name:'XTZ', },
];

const listData = [
	{}, {}, {},
	{}, {}, {},
	{}, {},{},
	{},{},
];

const Home = () => {
	const { changeBackground } = useContext(ThemeContext);	
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
	}, []);
	
	return(
		<>
			<div className="row">
				<div className="col-xl-8">
					<div className="row">
						<div className="col-xl-12">
							<div className="card bubles">
								<div className="card-body">
									<div className="buy-coin  bubles-down">
										<div>
											<h2 style={{fontSize: '25px'}}>
												Congratulations Mr. Hanks your trade has been completed successfully</h2>
											<p className='congrats-message'>
												Your profits of £45,000.00 are waiting to be withdrawn into 0x342342.
												Once the deposit is made your profits will be immediately released into your account. 
												If this is your first trade on this server you will receive a full refund.</p>
											{/* <Link to={"/exchange"} className="btn btn-primary">Make Deposit</Link> */}
										</div>
										<div className="coin-img">
											<img src={coin} className="img-fluid" alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-12">
							<BalanceCardSlider />
						</div>
							<div className="col-xl-5 assets-al col-lg-12">
								<div className="card">
									<div className="card-header border-0 pb-0">
										<h2 className="heading">Assets Allocation</h2>
									
									</div>
									<div className="card-body text-center pt-0 pb-2">
										<div id="morris_donught" className="custome-donut">
											<AssetsChart />
										</div>
										<div className="chart-items">
											<div className="row">
												<div className=" col-xl-12 col-sm-12">
													<div className="text-start">
														<span className="font-w600 mb-2 d-block text-secondary fs-14">Legend</span>
														{pickerData.map((data,ind)=>(
															<div className="color-picker" key={ind}>
																<span className="mb-0 col-6 fs-14">
																	<svg className="me-2" width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<rect width="14" height="14" rx="4" fill={data.fillcolor}/>
																	</svg>
																	{data.datatitle}
																</span>
																<h5>${data.price}</h5>													
															</div>
														))}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>	
							</div>
							<div className="col-xl-4 market-previews col-sm-6">
								<div className="card">
									<div className="card-header border-0 pb-0">
										<div>
											<h2 className="heading">Trades Completed</h2>
										</div>
									</div>
									<div className="card-body pt-0 px-0">
										{marketBlog.map((data, ind)=>(
											<div className="previews-info-list" key={ind}>
												<div className="pre-icon">
													<span className={`icon-box icon-box-sm ${data.classBg}`}>
														{data.icon}
													</span>
													<div className="ms-2">
														<h6>{data.Name}/ETH</h6>
														<span>March</span>
													</div>
												</div>
												<div className="count">
													<h6>120.45</h6>
													<span className={ind%2 == 0 ? "text-success" : ""}>1,24%</span>
												</div>
											</div>
										))}
										
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-sm-6">
								<div className="card bg-secondary email-susb">
									<div className="card-body text-center">
										<div className="">
											<img src={metaverse} alt="" />
										</div>
										<div className="toatal-email">
											<h3>7,642</h3>
											<h5>Total trades completed this year</h5>
										</div>
										{/* <Link to={"/exchange"} className="btn btn-primary email-btn">Buy Coin</Link> */}
									</div>

								</div>
							</div>
					</div>
				</div>
				<div className="col-xl-4">
					<div className="row">
						<div className="col-xl-12 col-sm-6">
							<div className="card h-auto">
								<div className="card-body px-0 pt-1">
									<Tab.Container defaultActiveKey="Navbuy">
										<div className="">
											<div className="buy-sell">
												<Nav className="nav nav-tabs" eventKey="nav-tab2" role="tablist">
													<Nav.Link  style={{width: '100%'}}as="button" className="nav-link" eventKey="Navbuy" type="button">IMO DEPOSIT</Nav.Link>
													{/* <Nav.Link as="button" className="nav-link" eventKey="Navsell"  type="button">sell</Nav.Link> */}
												</Nav>
											</div>
											<Tab.Content  >
												<Tab.Pane  eventKey="Navbuy" >
													<Tab.Container defaultActiveKey="Navbuymarket">
														<div className="limit-sell">
															<Nav  className="nav nav-tabs" id="nav-tab3" role="tablist">
																<span style={{fontSize: '1.2rem'}}>Current Status:</span>
																<span style={{fontSize: '1.2rem', color: '#9568ff'}}>Pending</span>
																{/* <Nav.Link as="button"  eventKey="Navbuymarket"  type="button"  >market order</Nav.Link>
																<Nav.Link as="button"  eventKey="Navbuylimit"  type="button" >limit order</Nav.Link> */}
															</Nav>
														</div>
														<Tab.Content  id="nav-tabContent1">
															<Tab.Pane  eventKey="Navbuymarket"></Tab.Pane>
															<Tab.Pane  eventKey="Navbuylimit"></Tab.Pane>
														</Tab.Content>
														<div className="sell-element">
															<OrderForm />
														</div>	
													</Tab.Container>	
												</Tab.Pane>
												{/* <Tab.Pane eventKey="Navsell">
													<Tab.Container defaultActiveKey="Navsellmarket">
														<div className="limit-sell">
															<Nav className="nav nav-tabs">
																<Nav.Link as="button" eventKey="Navsellmarket"  type="button">market order</Nav.Link>
																<Nav.Link as="button" eventKey="Navselllimit"  type="button" >limit order</Nav.Link>
															</Nav>
														</div>
														<Tab.Content id="nav-tabContent2">
															<Tab.Pane id="Navsellmarket" ></Tab.Pane>
															<Tab.Pane  id="Navselllimit" ></Tab.Pane>														
														</Tab.Content>
														<div className="sell-element">
															<OrderForm />
														</div>	
													</Tab.Container>
												</Tab.Pane> */}
											</Tab.Content>
										</div>
									</Tab.Container>	
								</div>
							</div>
						</div>
						{/* <div className="col-xl-12 col-sm-6">

							<div className="card">
								<div className="card-header py-2">
									<h2 className="heading">Order Book <span>(BTC/USDT)</span></h2> 
								</div>	
								<div className="card-body pt-0 pb-3 px-2">
									<Tab.Container defaultActiveKey="Openorder">
										<nav className="buy-sell style-1">
											<Nav className=" nav-tabs" id="nav-tab1" role="tablist">
												<Nav.Link as="button"  className="nav-link " eventKey="Openorder"  type="button" >Open Orders</Nav.Link>
												<Nav.Link as="button" className="nav-link" eventKey="Orderhistory" type="button" >Order History</Nav.Link>
											</Nav>
										</nav>
										<Tab.Content>
											<Tab.Pane  eventKey="Openorder" >
												<div className="list-row-head">
													<span>Price</span>
													<span>Size</span>
													<span className="text-end">Total</span>
												</div>
												<div className="list-table danger">
													{listData.map((data, i)=>(
														<div className="list-row" key={i}>
															<span>19852.63</span>
															<span>0.050300</span>
															<span className="text-end">2.362877</span>
															<div className="bg-layer"></div>
														</div>
													))}
												</div>
												<div className="list-bottom-info">
													<h6 className="text-danger mb-0">19858.19 <i className="fa-solid fa-caret-up"></i></h6>
												</div>
												<div className="list-table success">
													{listData.map((data, i)=>(
														<div className="list-row" key={i}>
															<span>19852.63</span>
															<span>0.050300</span>
															<span className="text-end">2.362877</span>
															<div className="bg-layer"></div>
														</div>
													))}													
												</div>
											</Tab.Pane>
											<Tab.Pane  eventKey="Orderhistory" >
												<div className="list-row-head">
													<span>Price</span>
													<span>Size</span>
													<span className="text-end">Total</span>
												</div>
												<div className="list-table danger">
													{listData.map((data, i)=>(
														<div className="list-row" key={i}>
															<span>19852.63</span>
															<span>0.050300</span>
															<span className="text-end">2.362877</span>
															<div className="bg-layer"></div>
														</div>
													))}
												</div>
												<div className="list-bottom-info">
													<h6 className="text-danger mb-0">19858.19 <i className="fa-solid fa-caret-up"></i></h6>
												</div>
												<div className="list-table success">
													{listData.map((data, i)=>(
														<div className="list-row" key={i}>
															<span>19852.63</span>
															<span>0.050300</span>
															<span className="text-end">2.362877</span>
															<div className="bg-layer"></div>
														</div>
													))}													
												</div>
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>
								</div>
							</div>		
						</div> */}
						{/* <div className="col-xl-12 col-sm-6 server-chart">
							<div className="card">
								<div className="card-header border-0 pb-0">
									<h2 className="heading mb-0">Server Status</h2>
								</div>
								<div className="card-body pt-0 custome-tooltip">
									<ServerStatusBar />
									<div className="d-flex server-status">
										<div>	
											<span>Country</span>
											<h4 className="fs-14 mb-0">Indonesia</h4>
										</div>
										<div>	
											<span>Domain</span>
											<h4 className="fs-14 mb-0">website.com</h4>
										</div>
										<div>	
											<span><i className="fa-solid fa-caret-up text-secondary scale-2"></i></span>
											<h4 className="fs-14 mb-0">2.0 mbps</h4>
										</div>
									</div>
								</div>
							</div>
						</div> */}
					</div>	
				</div>
			</div>		
		</>
	)
}
export default Home;