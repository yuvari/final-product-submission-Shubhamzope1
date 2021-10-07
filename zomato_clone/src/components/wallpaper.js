import React from 'react';
import '../Styles/home.css';
import axios from 'axios';
import{withRouter} from 'react-router-dom'

class Wallpaper extends React.Component {
    constructor(){
        super();
        this.state={
            restaurants:[],
            searchField: undefined,
            suggestions: []
        }
    }
    handleLocationChange = (event) => {
        const locId = event.target.value;
        sessionStorage.setItem('locationId', locId);
        axios({
            url: `http://localhost:2020/restaurants/${locId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(respone => {
                this.setState({ restaurants: respone.data.restaurants })
            })
            .catch()

    }
    handleInput=(event) =>{
        const{restaurants}= this.state;
        const  searchField = event.target.value;
        let searchrest =[];

        searchrest = restaurants.filter((item)=>item.name.toLowerCase().includes(searchField.toLowerCase()));

        this.setState({suggestions:searchrest ,searchField});

    }
    selectedText =(resitem)=>{
        this.props.history.push(`/details?restaurant=${resitem._id}`);
    }
    renderSuggestions =() =>{
        const{suggestions} = this.state;

        if (suggestions.length === 0){
            return null;
        }
        return(
            <ul  className="list-lab" style={{backgroundColor: 'white',marginTop: '4px',listStyleType:'none'}}>
                {
                    suggestions.map((item,index)=>(
                        
                    <li style={{ color: '#192f60'}} key={index}onClick={()=>this.selectedText(item)}>
                         <img style={{borderRadius:'50px',padding:'3px',marginRight:'11px'}} src={`./${item.image}`} alt="Sorry for the Inconvinience" height="40px" width="40px" />
                        {`${item.name} - ${item.locality} , ${item.city}`}
                        </li>))
                
                }
            </ul>
        )
    }
    render() {
        const{ locationsData} = this.props;
        return (
            <div>
                <div className="container-fluid Hbackground">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-sm-12 text-center mt-5">
                            <b className="Hlogo">e!</b>
                        </div>
                        <div className="col-xl-12 col-md-12 col-sm-12 mt-4 mb-3">
                            <p className="container Hheading g-0 text-center">Find the best restaurants, cafés, and bars</p>
                        </div>
                        <div className="col-xl-3 col-md-3 col-sm-3"></div>
                        <div className="col-xl-2 col-md-2 col-sm-2 mt-3 ">
                            <div className="Hsearch">
                                <select className="Hloc-search pt-2 pb-2 ps-2 pe-2" onChange={this.handleLocationChange}>
                                <option value="0" className="Hdrop">Please type a location</option>
                            {locationsData.map((item) => {
                                return <option key={item.location_id} value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                            })}
                                    
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-4 col-sm-4 mt-3">
                            <i className="fas fa-search Hicon-search"></i>
                            <input type="text-area" className="Hresturunt text-start" placeholder="Search for restaurants" onChange={this.handleInput}/>
                            {this.renderSuggestions()}
                        </div>
                        <div className="col-xl-3 col-md-3 col-sm-3"></div>
                    </div>
                </div>
            </div>
                )
    }
}
 export default withRouter(Wallpaper);