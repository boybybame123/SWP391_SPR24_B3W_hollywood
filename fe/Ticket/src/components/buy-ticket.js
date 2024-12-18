import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/style.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { getAllScreen } from "../api/screenApi";

const BuyTicket = () => {
    const [selectedScreen, setSelectedScreen] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([{}]);
    const [comboQuantity, setComboQuantity] = useState([]);
    const [movie, setMovie] = useState("");
    const [step, setStep] = useState("choose-screen");
    const [isSelectedDate, setIsSelectedDate] = useState(false);
    const [allScreen,setAllScreen] = useState([{}]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [selectedScreen, selectedDate, selectedSeats]);

    const fetchData = async () => {
        try {
            const response = await getAllScreen();
            setAllScreen([...response.data]);
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
    }



    useEffect(() => {
        if (location.state !== null) {
            setMovie(location.state);
        }
    }, [location.state]);

    const handleSeatClick = (seat) => {
          if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((seatSelected) => seatSelected !== seat));
          } else {
            setSelectedSeats([...selectedSeats, seat]);
          }
      };

      const handleDateClick = (date) => {
        setSelectedDate(date);
        setIsSelectedDate(true);
      }
    
      const handleClickScreen = (e) => {
        setSelectedScreen(e.target.value);
        if(sessionStorage.getItem("jwt") !== null) {
            setStep("choose-seats");
        } else { navigate("/login")}
      }

    return (
        <>
            <Header />
            <div class="main-content">
                <div class="container">
                    <div class="breadcrumb-option">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="breadcrumb__links">
                                        <a href="#"><i class="fa fa-home"></i> Home</a>
                                        <span>Booking</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col lg={8}>
                            <div class="form-ticket">
                                
                                    {step === "choose-screen" && (
                                        <>
                                        <div className="ticket_field">
                                        <Row>Ngày chiếu:</Row>
                                        <Row >
                                            {allScreen.filter((screen) => screen.movieName === movie).map((screen) => (
                                                <Col lg={2} style={{border:"1px solid white",cursor: "pointer"}} onClick={() => handleDateClick(screen.date)}>
                                                <Row style={{display: "flex", justifyContent: "center"}}>{screen.date}</Row>
                                            </Col>
                                            ))}
                                        </Row>
                                        
                                        {isSelectedDate && (
                                            <>
                                            <Row></Row>
                                            <Row>Suất chiếu: </Row>
                                        <Row>
                                        <select class="choice" value={selectedScreen} onChange={(e)=>handleClickScreen(e)}>
                                            <option value="">-----Chọn suất chiếu-----</option>
                                            {allScreen.filter((screen) => screen.date === selectedDate).map((screen) => (
                                                <option value={screen.start_time.slice(11,screen.start_time.length)}>{screen.start_time.slice(11,screen.start_time.length)}</option>
                                            ))}
                                        </select>
                                        </Row>
                                
                                            </>
                                        )}
                                    </div>
                                    
                                    
                                        </>
                                    )}
                                
                                
                                    {step === "choose-seats" && (
                                        <>
                                        <div class="row ticket_field" style={{justifyContent: "center"}}>
                                        <div class="seat-selection">
                                        <div class="legend">
                                            <div  >
                                                <span class="unavailable"></span>
                                                <p  >Đã bán</p>
                                            </div>
                                            <div  >
                                                <span class="selected"></span>
                                                <p  >Ghế bạn chọn</p>
                                            </div>
                                        </div>
                                        <span class="front">Màn hình</span>
                                        <div class="seats-wrapper-parent">
                                            <div class="seats-wrapper-row">
                                                <div class="seats seats-map">
                                                    <div class="row-wrapper">
                                                        <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`A${seatNumber + 1}`} className={`available ${selectedSeats.includes(`A${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`A${seatNumber + 1}`)}>A{seatNumber + 1}</li>
                                                                ))}
                                                                </ul>
                                                            
                                                                <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`B${seatNumber + 1}`} className={`available ${selectedSeats.includes(`B${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`B${seatNumber + 1}`)}>B{seatNumber + 1}</li>
                                                                ))}
                                                            </ul>
                                                            <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`C${seatNumber + 1}`} className={`available ${selectedSeats.includes(`C${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`C${seatNumber + 1}`)}>C{seatNumber + 1}</li>
                                                                ))}
                                                            </ul>
                                                            <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`D${seatNumber + 1}`} className={`available ${selectedSeats.includes(`D${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`D${seatNumber + 1}`)}>D{seatNumber + 1}</li>
                                                                ))}
                                                            </ul>
                                                            <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`E${seatNumber + 1}`} className={`available ${selectedSeats.includes(`E${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`E${seatNumber + 1}`)}>E{seatNumber + 1}</li>
                                                                ))}
                                                            </ul>
                                                            <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`F${seatNumber + 1}`} className={`available ${selectedSeats.includes(`F${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`F${seatNumber + 1}`)}>F{seatNumber + 1}</li>
                                                                ))}
                                                            </ul>
                                                            <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`G${seatNumber + 1}`} className={`available ${selectedSeats.includes(`G${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`G${seatNumber + 1}`)}>G{seatNumber + 1}</li>
                                                                ))}
                                                            </ul>
                                                            <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`H${seatNumber + 1}`} className={`available ${selectedSeats.includes(`H${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`H${seatNumber + 1}`)}>H{seatNumber + 1}</li>
                                                                ))}
                                                            </ul>
                                                            <ul class="seat-row">
                                                                {[...Array(20).keys()].map(seatNumber => (
                                                                    <li key={`I${seatNumber + 1}`} className={`available ${selectedSeats.includes(`I${seatNumber + 1}`) ? 'selected' : ''}`} onClick={() => handleSeatClick(`I${seatNumber + 1}`)}>I{seatNumber + 1}</li>
                                                                ))}
                                                            </ul>
                                                        
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    </div>
                                    <Row>
                                        <Col lg={6}>
                                        <div class="row" style={{justifyContent: "left",left: "15px"}}>
                                        <div class="btn-buy-ticket" onClick={() => {setStep("choose-screen");setSelectedSeats([{}])}}>
                                                <div class="buy-ticket">
                                                    <span><NavigateBeforeIcon/></span>
                                                </div>
                                        </div>
                                    </div>
                                        </Col>
                                        <Col lg={6}>
                                        <div class="row" style={{justifyContent: "right", right: "15px"}}>
                                            <div class="btn-buy-ticket" onClick={() => {selectedSeats.length > 1 ? setStep("choose-combo") : alert("Vui lòng chọn ghế")}} >
                                                <div class="buy-ticket">
                                                    <span><NavigateNextIcon/></span>
                                                </div>
                                        </div>
                                        
                                    </div>
                                        </Col>
                                    </Row>
                                        </>
                                    )}
                                

                                    {step === "choose-combo" && (
                                        <>
                                        <div class="row ticket_field">
                                    <table class="table table-nowrap card-table">
                                        <thead  >
                                            <tr  >
                                                <th  >Combo</th>
                                                <th class="text-right d-none d-sm-block">Giá tiền</th>
                                                <th class="text-right">Số lượng</th>
                                            </tr>
                                        </thead>
                                        <tbody  >
                                            <tr class="ticketing-concession-type">
                                                <td class="concession-name">
                                                    Combo 1
                                                    <span class="d-none d-md-block text-muted">1 Bắp Ngọt 60oz + 1 Coke 32oz - V </span>
                                                   
                                                </td>
                                                <td class="concession-price text-right">84.000&nbsp;₫</td>
                                                <td class="ticketing-select text-right">
                                                    <div class="quantity-toggle">
                                                        <input type="number" min="0" max="10" step="1" value={comboQuantity[0] > 10 ? 10 : comboQuantity[0]} onChange={(e) => setComboQuantity((prevQuantity) => {
                                                            const updatedQuantity = [...prevQuantity];
                                                            updatedQuantity[0] = e.target.value > 10 ? 10 : e.target.value;
                                                            return updatedQuantity;
                                                        })} class="quantity" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="ticketing-concession-type">
                                                <td class="concession-name">
                                                    Combo 3
                                                    <span class="d-none d-md-block text-muted">Chà đá </span>
                                                   
                                                </td>
                                                <td class="concession-price text-right">4.000&nbsp;₫</td>
                                                <td class="ticketing-select text-right">
                                                    <div class="quantity-toggle">
                                                        <input type="number" min="0" max="10" step="1" value={comboQuantity[2]} onChange={(e) => setComboQuantity((prevQuantity) => {
                                                            const updatedQuantity = [...prevQuantity];
                                                            updatedQuantity[2] = e.target.value;
                                                            return updatedQuantity;
                                                        })} class="quantity" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr class="ticketing-concession-type">
                                                <td class="concession-name">
                                                    Combo 2
                                                    <span class="d-none d-md-block text-muted">1 Bắp Ngọt 60oz + 2 Coke 32oz - V</span>
                                                  
                                                </td>
                                                <td class="concession-price text-right">109.000&nbsp;₫</td>
                                                <td class="ticketing-select text-right">
                                                    <div class="quantity-toggle">
                                                        <input type="number" min="0" max="10" step="1" value={comboQuantity[1] > 10 ? 10 : comboQuantity[1]} onChange={(e) => setComboQuantity((prevQuantity) => {
                                                            const updatedQuantity = [...prevQuantity];
                                                            updatedQuantity[1] = e.target.value > 10 ? 10 : e.target.value;
                                                            return updatedQuantity;
                                                        })} class="quantity" />
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <Row>
                                        <Col lg={6}>
                                        <div class="row" style={{justifyContent: "left",left: "15px"}}>
                                        <div class="btn-buy-ticket" onClick={() => setStep("choose-seats")}>
                                                <div class="buy-ticket">
                                                    <span><NavigateBeforeIcon/></span>
                                                </div>
                                        </div>
                                    </div>
                                        </Col>
                                    </Row>
                                        </>
                                    )}
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div class="form-ticket">
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row"><div class="col">
                                            <p class="text-truncate mb-0"><strong>{movie}</strong></p>
                                            <p class="text-truncate mb-0">Suất<strong> {selectedScreen}, {selectedDate} </strong></p>
                                            <table class="table table-nowrap card-table">
                                                <thead  >
                                                    <tr  >
                                                        <th  >Ghế</th>
                                                        <th class="text-right"></th>
                                                    </tr>
                                                </thead>
                                                <tbody  >
                                                                {[...Array(selectedSeats.length - 1).keys()].map(index => (
                                                                    <tr class="ticketing-concession-type">
                                                                <td class="concession-name">{selectedSeats[index + 1]}</td>
                                                                <td class="ticketing-select text-right">
                                                                    45.000&nbsp;₫
                                                                </td>
                                                            </tr>
                                                                ))}
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="row"><div class="col">
                                            <table class="table table-nowrap card-table">
                                                <thead  >
                                                    <tr  >
                                                        <th  >Combo</th>
                                                        <th class="text-right"></th>
                                                    </tr>
                                                </thead>
                                                <tbody  >
                                                    {comboQuantity[0] > 0 && (
                                                        <tr class="ticketing-concession-type">
                                                            <td class="concession-name"> Combo 1 x<strong> {comboQuantity[0]} </strong></td>
                                                            <td class="ticketing-select text-right">
                                                                {84 * comboQuantity[0]}.000&nbsp;₫
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {comboQuantity[1] > 0 && (
                                                        <tr class="ticketing-concession-type">
                                                            <td class="concession-name"> Combo 2 x<strong> {comboQuantity[1]} </strong></td>
                                                            <td class="ticketing-select text-right">
                                                                {109 * comboQuantity[1]}.000&nbsp;₫
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card d-none d-md-block">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <h6 class="card-title text-uppercase text-muted mb-2">Tổng đơn hàng:</h6>
                                                <span class="h2 mb-0">{comboQuantity[0] > 0 ? (comboQuantity[0]*84000 + (comboQuantity[1] > 0 ? comboQuantity[1]*109000 : 0) + (selectedSeats.length > 1 ? ((selectedSeats.length - 1)*45000) : 0 ) )
                                                :
                                                (0 + (comboQuantity[1] > 0 ? comboQuantity[1]*109000 : 0) + (selectedSeats.length > 1 ? ((selectedSeats.length - 1)*45000) : 0 ))}&nbsp;₫</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flow-actions sticky-footer-bars">
                                    <div class="row" style={{justifyContent: "center"}}>
                                        <div class="btn-buy-ticket">
                                            <a href="#">
                                                <div class="buy-ticket">
                                                    <span>Thanh toán</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default BuyTicket;