import React from 'react';
import axios from 'axios';
import '../Styles/account.css';
import { NavLink } from "react-router-dom";
import queryString from 'query-string';


class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            user: [],
            email: '',
            orders: [],
            restaurants:[],
            resid:[],

        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { email } = qs;
        axios({
            url: `http://localhost:2020/login/${email}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ user: response.data.user })
            })
            .catch()

        axios({
            url: `http://localhost:2020/orders/${email}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ orders: response.data.orders, resid:response.data.restaurantId })
            })
            .catch()
           

    }

   
    handleNavigate = (restaurantId) => {
        this.props.history.push(`/details?restaurant=${restaurantId}`);
    }
    

    render() {
        const { user, orders } = this.state;
      

        return (
            <header>

                <span className="Alogo-span ">
                    <NavLink to="/" className="logoAcc" > e! </NavLink>
                </span>
                < div className="g-0">
                    <div className="container-fluid header"></div>
                    <div className="container-fluid Abackground"></div>
                    <div className="col-xl-12 col-md-12 col-sm-12 mt-4 mb-3">
                      <div>
                         
                      </div>
                      
                      
                      
                        <div>
                            { user.map((item) => {
                                return <div>
                                    <div className="Acclogo">{item.firstname.charAt(0)}{item.lastname.charAt(0)}
                                        <p className="container Aheading g-0 text-centerAcc">{`${item.firstname}${item.lastname}`}</p>
                                        <div className="email-div">{item.email}</div>
                                        <div className="container Aheading pt-2 email-div ">{item.address}</div>
                                    </div>
                                </div>

                            }) 

                            }

                        </div>

                    </div>
                    <div className=" Yord"  >Your-Orders</div>
                    <hr/>
                        <div>
                      {orders.map((item) => {
                                    return <div className="container shadowA ">
                                        
                                        <div className="resName">{item.resname}</div>
                                        
                                        <div>
                                           
                                            {item.menuItems ? item.menuItems.filter((filt )=> filt == filt.qty=== filt.qty<1).map((item) => {
                                                return <div className="ord-div">
                                                    <img style={{ borderRadius: '50px', padding: '3px', marginLeft: '11px' }} src={`./${item.image}`} alt="Sorry" height="50px" width="50px" />
                                                    <span className="itemName">{item.name}</span>
                                                        <div  className="headA"> Quantity: {item.qty}, <span>price of one:{item.price}</span></div>
                                                        <hr className="lineA"></hr>

                                                </div>

                                            }) : null}
                                            
                                            <div className="subt">{`subTotal: ${item.subTotal}`}  <div className="btn btn-outline-danger navibtn" onClick={() => this.handleNavigate(item.restaurantId)}>Order Again</div></div>
                                          
                                        </div>
                                    </div>
                                })}
                      </div>
            
                     
                    </div>
                  

                
            </header>


        )
    }
}
export default Account;