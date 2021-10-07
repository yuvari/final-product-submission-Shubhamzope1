import React from 'react';
import '../Styles/header.css';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import alert from 'alert';
import{withRouter} from 'react-router-dom'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'solid 1px brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: '',
            AccModalIsOpen: false,
            ANOTHERModalIsOpen: false,
            email:'',
            password:'',
            firstname:'',
            lastname:'',
            phNumber:'',
            address:'',
            user:[],
        
        }
    }
   


   handleaccountDetail =(email) =>{
    this.props.history.push(`/account?email=${email}`);
    }


    handleCloseModal = (state, value) => {
        this.setState({ [state]: value });
    }

 


    handleInputChange = (event,state)=>{
        this.setState({[state] : event.target.value});
    }
    handleSignUp = ()=>{
        const {  email, password, firstname, lastname,phNumber,address, } = this.state;
        const signUpObj = {
            email:email,
            password:password, 
            firstname:firstname,
            lastname:lastname,
            phNumber:phNumber,
            address:address,
        };
           axios({
            url:'http://localhost:2020/signup',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: signUpObj
            
        })
        .then(response => {
            if (response) {
                this.setState({
                    
                    email: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    phNumber:'',
                    address:'',
                    });
                    alert(response.data.message)
                  
            }
           
        })
        .catch(err => console.log(err))
  
        this.setState({  AccModalIsOpen: false,
            ANOTHERModalIsOpen:true})
            
    }
    responseGoogle = (response) => {
      
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, email: response.profileObj.email, user:response.profileObj, loginModalIsOpen: false })

        console.log(response)

    }
    
    responseFacebook(response) {
        this.setState({ loggedInUser: response.name, isLoggedIn: true, loginModalIsOpen: false });
        console.log(response)
      }

      handleANOTHER = () => {
        this.setState({ ANOTHERModalIsOpen: true, loginModalIsOpen: false, AccModalIsOpen: false });
    }

    handleAcc = () => {
        this.setState({ AccModalIsOpen: true });
    }

    userLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: '' });
        this.props.history.push('/');
    }

    handleLogedin = (event) => {
       
        const { email, password,obj} = this.state;
        const loginObj = {
            email: email,
            password: password,

        
        };
        axios({
            method: 'POST',
            url: 'http://localhost:2020/login',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj
        })
            .then(response => {
                this.setState({
                    isLoggedIn: response.data.isauthenticateduser,
                    email: '',
                    password: '',
                    loggedInUser: email,
                    ANOTHERModalIsOpen: false,
                    email:email,
                    
                  
                });
               
                alert(response.data.message);
                
              
            })
            .catch(err => console.log(err))
            
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    }


  
    render() {
        const { loginModalIsOpen, isLoggedIn, loggedInUser, AccModalIsOpen,ANOTHERModalIsOpen,user,email } = this.state;
        return (
            <div>
                <div >
                    {isLoggedIn ? <div className="user-button-gp">
                   
                         <div className="user-head">
                        
                         <div className="user-signup" onClick={()=>this.handleaccountDetail(email)} key={email}>{loggedInUser}</div>
                    
                            <div className="user-login " onClick={this.userLogout}>Logout</div>

                        </div>

                       
                    </div> :
                        <div className="user-button-gp">
                            <div className="user-head">
                                <div className="user-login" onClick={this.handleLogin}>Login</div>
                                <div className="user-signup" onClick={this.handleAcc}>Create an account</div>
                            </div>

                        </div>}
                </div>
                
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div >
                    
                        <div className="loginModal">Login</div>
                        <div className="fas fa-times close-btnH"  onClick={() => this.handleCloseModal('loginModalIsOpen', false)}></div>
                       <br/>
                        <div style={{ textAlign:'center',padding:' 5px 29px 5px 2px', color:'white'}}>
                        <GoogleLogin
                            clientId="520257244585-cjd4n8nrh5skl02a2j39qcq38jrmtns8.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="googlebtn"
                        />
                         <br/>
                        <div>
                        <FacebookLogin
                            appId="237252288338754"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                    
                        />
                        </div>
                        </div>
                       
                        <div className="Path"></div>
                        <div>
                            <span className="haveaccountL">Already have an account?<span style={{color:'orange'}}  onClick={this.handleANOTHER}>Login</span></span>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={AccModalIsOpen}
                    style={customStyles}
                >
                    <div >
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleCloseModal('AccModalIsOpen', false)}></div>
                        <div style={{ padding: '5px' }}  >
                            <h3 className="Acc-name">Create An Account</h3>
                            <span className="NameHa"> <label className="NameH">firstname</label>
                            <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'firstname')} /></span>
                          <span className="NameHa">  <label className="NameH">lastname</label>
                            <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'lastname')} /></span>
                            <label className="NameH">E-mail</label>
                            <input type="email" placeholder="enter your name" className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                            <label className="NameH">password</label>
                            <input type="password" placeholder="enter your password" className="form-control" required onChange={(event) => this.handleInputChange(event, 'password')} />
                            <label className="NameH">Ph.number</label>
                            <input type="tel" placeholder="enter your number" className="form-control" onChange={(event) => this.handleInputChange(event, 'phNumber')} />
                            <label className="NameH">Address</label>
                            <textarea type="text" placeholder="enter your address" className="form-control text-areaH" onChange={(event) => this.handleInputChange(event, 'address')} />
                            <button className="btn btn-danger PROCEED" onClick={this.handleSignUp}>Register </button>
                            
                        </div>
                        <div className="Path"></div>
                        <div>
                            <span className="haveaccount">Already have an account?<span style={{color:'orange'}}  onClick={this.handleANOTHER}>Login</span></span>
                        </div>

                    </div>
                </Modal>
                <Modal
                    isOpen={ANOTHERModalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div>
                    <div className="loginModal">Login</div>
                    <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleCloseModal('ANOTHERModalIsOpen', false)}></div>
                    <div>
                    <label className="NameH">E-mail</label>
                            <input type="email" placeholder="enter your name" className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                            <label className="NameH">password</label>
                            <input type="password" placeholder="enter your password" className="form-control" required onChange={(event) => this.handleInputChange(event, 'password')} />
                            <button className="btn btn-danger PROCEED" onClick={this.handleLogedin}>Login </button>
                    </div>
                    </div>
                    </Modal>
                
            </div>)}
}
export default withRouter(Header);