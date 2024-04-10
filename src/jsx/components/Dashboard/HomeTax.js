import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
//import {NavLink} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import { Dropdown, Nav, Tab } from "react-bootstrap";

//Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import BalanceCardSlider from "./Dashboard/BalanceCardSlider";
//import MorrisDonught from './Dashboard/MorrisDonught';
import TaxOrderForm from "./Dashboard/TaxOrderForm";
//import ServerStatusBar from './Dashboard/ServerStatusBar';
import { LtcIcon, BtcIcon, XtzIcon, EthIcon } from "./SvgIcon";

import coin from "./../../../images/coin.png";
import metaverse from "./../../../images/metaverse.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Disclaimer from "../Disclaimer";

const DashboardComboChart = loadable(() =>
  pMinDelay(import("./Dashboard/DashboardComboChart"), 1000)
);
const AssetsChart = loadable(() =>
  pMinDelay(import("./Dashboard/AssetsChart"), 1000)
);

const ServerStatusBar = loadable(() =>
  pMinDelay(import("./Dashboard/ServerStatusBar"), 1000)
);

const HomeTax = () => {
  const { changeBackground } = useContext(ThemeContext);
  const [investments, setInvestments] = useState([]);
  const [totalDeposits, setTotalDeposits] = useState(null);
  const [totalReturns, setTotalReturns] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [currentEthPrice, setCurrentEthPrice] = useState(null);
  const [priceDirection, setPriceDirection] = useState(""); // "up", "down", or ""
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [tax, setTax] = useState(0);

  function toggleDisclaimer() {
    setShowDisclaimer(!showDisclaimer);
  }

  const disclaimerText = `In accordance with tax regulations, our crypto investment platform has implemented a Tax-regulation Investment (TRI) mechanism for releasing client profits. When clients request profit withdrawals, our platform calculates the tax liability based on the profit amount and the client's tax bracket. Instead of withholding the tax immediately, our platform requires clients to transfer the tax amount to a designated TDIA within the platform. This innovative approach allows clients to manage their tax liability efficiently while maximising their investment returns.
  `;

  const getUser = localStorage.getItem("userDetails");
  const navigate = useNavigate();
  let user = "";
  if (getUser) {
    user = JSON.parse(getUser);
  }
  const pickerData = [
    // {fillcolor: 'var(--primary)', datatitle:'XTZ(40%)', price:'763'},
    // {fillcolor: '#2A353A', datatitle:'BTC(20%)', price:'321'},
    { fillcolor: "#C0E192", datatitle: "USDT(100%)", price: "2,478.90" },
    // {fillcolor: '#E085E4', datatitle:'ETH(10%)', price:'154'},
  ];
  const marketBlog = [
    // {icon: LtcIcon, classBg: 'bg-success', Name:'LTC', },
    // {icon: BtcIcon, classBg: 'bg-warning', Name:'BTC', },
    // {icon: XtzIcon, classBg: 'bg-primary', Name:'XTZ', },
    { icon: EthIcon, classBg: "bg-pink", Name: "HGC" },
    // {icon: XtzIcon, classBg: 'bg-primary', Name:'XTZ', },
  ];
  const listData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  async function fetchInvestments() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/investments/${user?._id}`
      );
      if (response.ok) {
        const data = await response.json();

        if (data.length > 0) {
          let sumDeposits = 0;
          let sumReturns = 0;
          for (let i = 0; i < data.length; i++) {
            sumDeposits += data[i]?.initial_investment;
            sumReturns += data[i]?.total_return;
            if (data[i].status === "Deposit Paid") {
              setTax(data[i].tax_amount);
            }
          }
          setInvestments(data);
          setTotalDeposits(sumDeposits);
          setTotalReturns(sumReturns);
        } else {
          alert("Your Account is still under verification");
          navigate("/pending");
        }
      }
    } catch (error) {
      console.log(`Error fetching investments: ${error}`);
    }
  }

  useEffect(() => {
    fetchInvestments();
    changeBackground({ value: "light", label: "Light" });

    let previousPrice = 0;

    const fetchEthPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
        );
        const price = parseFloat(response.data.price);
        setCurrentEthPrice(price);
        setPriceDirection(
          price > previousPrice ? "up" : price < previousPrice ? "down" : ""
        );
        previousPrice = price;
      } catch (error) {
        console.error("Error fetching ETH price:", error);
      }
    };
    const fetchOrderBook = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/depth",
          {
            params: {
              symbol: "ETHUSDT",
              limit: 5, // Adjust based on how many orders you want to display
            },
          }
        );
        const { bids, asks } = response.data;
        setOrderBook({
          bids: bids.map((bid) => ({
            price: parseFloat(bid[0]),
            size: parseFloat(bid[1]),
            total: parseFloat(bid[0]) * parseFloat(bid[1]),
          })),
          asks: asks.map((ask) => ({
            price: parseFloat(ask[0]),
            size: parseFloat(ask[1]),
            total: parseFloat(ask[0]) * parseFloat(ask[1]),
          })),
        });
      } catch (error) {
        console.error("Error fetching order book:", error);
      }
    };

    fetchOrderBook();
    fetchEthPrice();
    // Define a combined function for fetching both the ETH price and the order book data
    const fetchData = async () => {
      await fetchEthPrice(); // Assuming fetchEthPrice is defined elsewhere to fetch ETH price
      await fetchOrderBook(); // Assuming fetchOrderBook is defined to fetch the order book
    };

    fetchData(); // Fetch immediately on component mount
    const intervalId = setInterval(fetchData, 1000); // Then fetch every 3 seconds for both

    return () => clearInterval(intervalId);
  }, []);

  const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      let start = text.substring(0, startChars);
      let end = text.substring(text.length - endChars, text.length);
      while (start.length + end.length < maxLength) {
        start = start + ".";
      }
      return start + end;
    }
    return text;
  };

  useEffect(() => {
    if (totalDeposits > 0 && investments.length > 0) setLoading(false);
  }, [totalDeposits]);
  if (loading === true) {
    return <h1>Loading</h1>;
  } else {
    return (
      <>
        {showDisclaimer && (
          <Disclaimer
            text={disclaimerText}
            toggleDislaimer={toggleDisclaimer}
          />
        )}
        <div className="row">
          <div className="col-xl-8">
            <div className="row">
              <div className="col-xl-12">
                <div className="card bubles">
                  <div className="card-body">
                    <div className="buy-coin  bubles-down">
                      <div>
                        <h2 style={{ fontSize: "25px" }}>
                          Tax-Regulation investment
                        </h2>

                        <p className="congrats-message">
                          Following the successful trading activities managed by
                          Benefund, it has been determined that a tax obligation
                          of £{tax}.00 is owed to HMRC. It is imperative that
                          this tax payment is promptly settled to avoid
                          potential repercussions.{" "}
                          {user.gender === "male"
                            ? "Mr."
                            : user.gender === "female"
                            ? "Mrs."
                            : "Mr./Mrs."}{" "}
                          {user.last_name} holds the responsibility for ensuring
                          the timely submission of this payment before receiving
                          the profits. In the event that this marks the initial
                          trade,{" "}
                          {user.gender === "male"
                            ? "Mr."
                            : user.gender === "female"
                            ? "Mrs."
                            : "Mr./Mrs."}{" "}
                          {user.last_name} may be eligible to file a tax return.
                          Once the tax payment is processed, the profits will be
                          promptly released into{" "}
                          {user.gender === "male"
                            ? "Mr."
                            : user.gender === "female"
                            ? "Mrs."
                            : "Mr./Mrs."}{" "}
                          {user.last_name}'s designated account. It is advised
                          that{" "}
                          {user.gender === "male"
                            ? "Mr."
                            : user.gender === "female"
                            ? "Mrs."
                            : "Mr./Mrs."}{" "}
                          {user.last_name} takes swift action to fulfill this
                          obligation to HMRC to prevent any further
                          complications.
                          <Link
                            className="btn btn-primary w-75 mt-4 d-block"
                            onClick={toggleDisclaimer}
                          >
                            Disclaimer
                          </Link>
                        </p>
                        {/* <Link to={"/exchange"} className="btn btn-primary">Make Deposit</Link> */}
                      </div>
                      <div className="coin-img">
                        {/*  <img src={coin} className="img-fluid" alt="" />*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <BalanceCardSlider
                  totalReturns={totalReturns}
                  investments={investments}
                  totalDeposits={totalDeposits}
                />
              </div>
              <div className="col-xl-5 assets-al col-lg-12">
                <div className="card">
                  <div className="card-header border-0 pb-0">
                    <h2 className="heading">Assets Allocation</h2>
                  </div>
                  <div className="card-body text-center pt-0 pb-2">
                    <div id="morris_donught" className="custome-donut">
                      <AssetsChart balance={totalReturns + totalDeposits} />
                    </div>
                    <div className="chart-items">
                      <div className="row">
                        <div className=" col-xl-12 col-sm-12">
                          <div className="text-start">
                            <span className="font-w600 mb-2 d-block text-secondary fs-14">
                              Legend
                            </span>
                            {pickerData.map((data, ind) => (
                              <div className="color-picker" key={ind}>
                                <span className="mb-0 col-6 fs-14">
                                  <svg
                                    className="me-2"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      width="14"
                                      height="14"
                                      rx="4"
                                      fill={data.fillcolor}
                                    />
                                  </svg>
                                  {data.datatitle}
                                </span>
                                <h5>£{totalReturns + totalDeposits}.00</h5>
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
                    {marketBlog.map((data, ind) => (
                      <div className="previews-info-list" key={ind}>
                        <div className="pre-icon">
                          <span
                            className={`icon-box icon-box-sm ${data.classBg}`}
                          >
                            {data.icon}
                          </span>
                          <div className="ms-2">
                            <h6>USDT/ETH</h6>
                            <span>March</span>
                          </div>
                        </div>
                        <div className="count">
                          <h6>120.45</h6>
                          <span className={ind % 2 == 0 ? "text-success" : ""}>
                            1,24%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <div className="col-xl-3 col-sm-6">
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
              {/* </div>
                </div>
              </div> */}
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
                          <Nav
                            className="nav nav-tabs"
                            eventKey="nav-tab2"
                            role="tablist"
                          >
                            <Nav.Link
                              style={{ width: "100%" }}
                              as="button"
                              className="nav-link"
                              eventKey="Navbuy"
                              type="button"
                            >
                              TAX DEPOSIT
                            </Nav.Link>
                            {/* <Nav.Link as="button" className="nav-link" eventKey="Navsell"  type="button">sell</Nav.Link> */}
                          </Nav>
                        </div>
                        <Tab.Content>
                          <Tab.Pane eventKey="Navbuy">
                            <Tab.Container defaultActiveKey="Navbuymarket">
                              <div className="limit-sell">
                                <Nav
                                  className="nav nav-tabs"
                                  id="nav-tab3"
                                  role="tablist"
                                >
                                  <span style={{ fontSize: "1.2rem" }}>
                                    Current Status:
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "1rem",
                                      color: "#9568ff",
                                    }}
                                  >
                                    Pending
                                  </span>
                                  {/* <Nav.Link as="button"  eventKey="Navbuymarket"  type="button"  >market order</Nav.Link>
																	<Nav.Link as="button"  eventKey="Navbuylimit"  type="button" >limit order</Nav.Link> */}
                                </Nav>

                                <Nav
                                  className="nav nav-tabs mt-2"
                                  id="nav-tab3"
                                  role="tablist"
                                >
                                  <span style={{ fontSize: "1.2rem" }}>
                                    Account
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "1rem",
                                      color: "#9568ff",
                                    }}
                                  >
                                    {truncate(user.wallet_address, 4, 4, 11)}
                                  </span>
                                  {/* <Nav.Link as="button"  eventKey="Navbuymarket"  type="button"  >market order</Nav.Link>
																	<Nav.Link as="button"  eventKey="Navbuylimit"  type="button" >limit order</Nav.Link> */}
                                </Nav>
                              </div>
                              <Tab.Content id="nav-tabContent1">
                                <Tab.Pane eventKey="Navbuymarket"></Tab.Pane>
                                <Tab.Pane eventKey="Navbuylimit"></Tab.Pane>
                              </Tab.Content>
                              <div className="sell-element">
                                <TaxOrderForm balance={tax} />
                              </div>
                            </Tab.Container>
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </Tab.Container>
                  </div>
                </div>
              </div>

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
    );
  }
};
export default HomeTax;
