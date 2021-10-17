import React from 'react';
import queryString from 'query-string';
import axios from 'axios';
import '../Styles/details.css';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';


const customStyles = {
    content: {

        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
       borderRadius:'6px',
        padding: '0px'
    },
};


class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: {},
            itemsModalIsOpen: false,
            formModalIsOpen: false,
            galleryModalIsOpen: false,
            paymentmodalisopen: false,
            restaurantId: undefined,
            menuItems: [],
            subTotal: 0,
            firstname: '',
            lastname: '',
            email: '',
            phNumber: '',
            address: '',
            resname:''
           

        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { restaurant } = qs;
        axios({
            url: `http://localhost:2020/restaurant/${restaurant}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(respone => {
                this.setState({ restaurants: respone.data.restaurants, restaurantId: restaurant, resname: respone.data.restaurants.name })
            })
            .catch()

    }
    handleOrder = () => {
        const { restaurantId, menuItems } = this.state;
        axios({
            url: `http://localhost:2020/menuitems/${restaurantId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(respone => {
                this.setState({ menuItems: respone.data.items })
            })
            .catch()

        this.setState({ itemsModalIsOpen: true, menuItems  })
    }
    handlePay = () => {
        this.setState({ formModalIsOpen: true })
    }


    handleModalState = () => {
        this.setState({ galleryModalIsOpen: true })
    }


    handleCloseModal = (state, value) => {
        this.setState({ [state]: value });
    }
    addItems = (index, operationType) => {
        let total = 0;
        const items = [...this.state.menuItems];
        const item = items[index];

        if (operationType == 'add') {
            item.qty += 1;
        }
        else {
            item.qty -= 1;
        }
        items[index] = item;
        items.map((item) => {
            total += item.qty * item.price;
        })
        this.setState({ menuItems: items, subTotal: total });
        console.log(items);
    }
    handleInputChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }
    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }
    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = async (data) => {
        try {
            const response = await fetch(`http://localhost:2020/payment`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (err) {
            return console.log(err);
        }
    }

    Payment = () => {
        const { subTotal, email } = this.state;

        const paymentObj = {
            amount: subTotal,
            email
        };

        this.getData(paymentObj).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            this.post(information)
        })
    }
    handleorders = () => {
        const { email, password, firstname, lastname, phNumber, address, menuItems, subTotal, restaurantId,resname } = this.state;
        const orderObj = {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            phNumber: phNumber,
            address: address,
            menuItems: menuItems,
            subTotal: subTotal,
            restaurantId: restaurantId,
            resname:resname
        };
        axios({
            url: 'http://localhost:2020/orders',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: orderObj

        })
            .then(response => {
                if (!email || !firstname || !lastname || !address || !phNumber) {
                    alert(response.data.message);
                 }
               else{ 
                this.setState({
                    email:email,
                    password: password,
                    firstname:firstname,
                    lastname: lastname,
                    phNumber: phNumber,
                    address: address,
                    menuItems: [],
                    menuItems:menuItems,
                    subTotal:subTotal,
                    restaurantId: restaurantId,
                    resname:resname,
                    paymentmodalisopen: true 
                });
            }
               
            })
            .catch(err => console.log(err))


    }

    render() {
        const { restaurants, itemsModalIsOpen, formModalIsOpen, menuItems, subTotal, galleryModalIsOpen, paymentmodalisopen } = this.state;
        return (
            <div style={{ height: '20px' }}>
                <div className="container-fluid header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-6 g-0 text-start ms-sm-2">
                            <span className="logo-span ">
                                <NavLink to="/" className="logoAcc" > e! </NavLink>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={`./${restaurants.image}`} alt="Sorry for the Inconvinience" className="de_img" height="350px" />

                    <button className="button" onClick={() => this.handleModalState('galleryModalIsOpen', true)} >Click to see Gallery</button>
                </div>
                <div className="heading">{restaurants.name}</div>
                <button className="btn btn-order" onClick={this.handleOrder}>Place Online Order</button>
                <div className="tabs">
                    <div className="tab">
                        <input type="radio" className="btn-check " id="tab-1" name="tab-group-1" checked />
                        <label className="btn btn-outline-danger" for="tab-1"  >Overview</label>
                        <div className="content">
                            <div className="about">About this place</div>
                            <div className="head">Cuisine</div>
                            <div className="value">{restaurants && restaurants.cuisine && restaurants.cuisine.map(item => `${item.name}, `)}</div>
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377; {restaurants.min_price} for two people(approx)</div>
                        </div>
                    </div>
                    <div className="tab">
                        <input type="radio" className="btn-check" id="tab-2" name="tab-group-1" />
                        <label for="tab-2" className="btn btn-outline-danger">Contact</label>
                        <div className="content">
                            <div className="head">Phone Number</div>
                            <div className="value">{restaurants.contact_number}</div>
                            <div className="head">{restaurants.name}</div>
                            <div className="value">{`${restaurants.locality}, ${restaurants.city}`}</div>
                        </div>
                    </div>
                </div>
                <div className="modal-div">
                    <Modal
                        isOpen={itemsModalIsOpen}
                        style={customStyles}

                    >
                        <div>
                            <div style={{ padding: '20px' }} >
                                <div className="fas fa-times close-btnP" onClick={() => this.handleCloseModal('itemsModalIsOpen', false)}></div>
                                <div >
                                    <h3 className="restaurant-name">{restaurants.name}</h3>
                                    <h3 className="item-total">SubTotal :{subTotal}</h3>
                                    <button className="btn btn-danger order-button" onClick={this.handlePay}> Pay Now</button>
                                    {menuItems.map((item, index) => {
                                        return <div className="card">
                                            <div className="card-body" style={{ padding: '15px 20px 5px 20px' }} >
                                                <div className="row">
                                                    <div className="col-xs-6 col-sm-6 col-md-9 col-lg-9 ">
                                                        <span className="D-body">
                                                            <h5 className="item-name" >{item.name}</h5>
                                                            <h5 className="item-price">&#8377;{item.price}</h5>
                                                            <p className="item-descp">{item.description}</p>
                                                        </span>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3"> <img className="card-img-center title-img" src={`../${item.image}`} />
                                                        {item.qty == 0 ? <div><button className="btn add-button" onClick={() => this.addItems(index, 'add')}>Add</button></div> :
                                                            <div className=" add-number"><button className="btn btn-sub p-0" style={{ width: '20px', height: '29px', color: '#61b246' }} onClick={() => this.addItems(index, 'subtract')}>-</button><span style={{ backgroundColor: 'white', width: '20px', marginLeft: '3px' }}>{item.qty}</span><button className="btn btn-add p-0" style={{ width: '29px', height: '29px', border: "none", marginLeft: '5px', color: '#61b246' }} onClick={() => this.addItems(index, 'add')}>+</button></div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                    <div className="card">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        isOpen={formModalIsOpen}
                        style={customStyles}

                    >
                        <div className="fas fa-times close-btnF" onClick={() => this.handleCloseModal('formModalIsOpen', false)}></div>
                        <div style={{ padding: '20px' }} >
                            <h3 className="restaurant-name">{restaurants.name}</h3>
                            <span> <label className="NameH">firstname</label>
                                <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'firstname')} /></span>
                            <span>  <label className="NameH">lastname</label>
                                <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'lastname')} /></span>
                            <label className="Name">E-mail</label>
                            <input type="email" placeholder="enter your name" className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                            <label className="Name">Ph.number</label>
                            <input type="tel" placeholder="enter your number" className="form-control" required onChange={(event) => this.handleInputChange(event, 'phNumber')} />
                            <label className="Name">Address</label>
                            <textarea type="text" placeholder="enter your address" className="form-control text-area" onChange={(event) => this.handleInputChange(event, 'address')} />
                            <button className="btn btn-danger PROCEED" onClick={this.handleorders}>PROCEED </button>
                        </div>
                    </Modal>

                    <Modal
                        isOpen={paymentmodalisopen}
                        style={customStyles}

                    >
                        <div className="fas fa-times close-btnF" onClick={() => this.handleCloseModal('paymentmodalisopen', false)}></div>
                        <div className="PAYMENT-DIV">
                        <div className="payheading">{restaurants.name}</div>
                        <h3 className="payitem-total">SubTotal: {subTotal}</h3>
                        <div>
                    {menuItems.length >1 ?menuItems.filter((filt )=> filt == filt.qty=== filt.qty<1).map((item, index) => {
                        
                        return <div key={index}>
                                            <div>
                                            <img style={{borderRadius:'50px',padding:'3px',marginLeft:'11px'}} src={`./${item.image}`} alt="Sorry" height="50px" width="50px" />
                                                <span className="payitem-name">{item.name}Quantity:-{item.qty}</span>
                                            </div>
                                        </div>
                                    }): null }


                                </div>
                           
                    <button className="btn btn-danger PROCEED" onClick={this.Payment}> pay </button>
                      
                    </div>

                    </Modal>






                    <div style={{ backgroundColor: 'black' }}>
                        <Modal
                            isOpen={galleryModalIsOpen}
                            style={customStyles}

                        >
                            <div className="fas fa-times close-btn" onClick={() => this.handleCloseModal('galleryModalIsOpen', false)}></div>
                            <div className="carl">
                                <Carousel
                                    infiniteLoop={false}
                                    showThumbs={false}
                                    autoPlay={false}

                                >
                                    {restaurants && restaurants.thumb && restaurants.thumb.map((image) => {
                                        return <div className="car_img">
                                            <img src={image} className="carl_img" alt="Sorry for the Inconvinience" />
                                        </div>
                                    })}

                                </Carousel>
                            </div>

                        </Modal>
                    </div>
                </div>
            </div>

        )


    }
}

export default Details;