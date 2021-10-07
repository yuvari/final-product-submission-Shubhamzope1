import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';
import { NavLink } from "react-router-dom";
class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            locations: [],
            location: undefined,
            mealtype: undefined,
            cuisine: [],
            lcost: undefined,
            hcost: undefined,
            sort: undefined,
            lrating:undefined,
            hrating:undefined,
            pageCount:[]

        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location } = qs;
        const filterobj = {
            mealtype: mealtype,
            location: location
        };
        axios({
            url: 'http://localhost:2020/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterobj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants,mealtype,location,pageCount: response.data.pageCount})
            })
            .catch()
            axios({
                url: 'http://localhost:2020/locations',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(respone => {
                    this.setState({ locations: respone.data.locations })
                })
                .catch()

    }
    handleLocationChange = (event) => {
        const location= event.target.value;

        const { mealtype, cuisine, lcost, hcost, sort, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length === 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
           
        };

        axios({
            url: 'http://localhost:2020/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants,location,pageCount: response.data.pageCount })
            })
            .catch()

        this.props.history.push(`/filter?mealtype=${mealtype}&location=${location}`);
    }
    handleSortChange = (sort) =>{
        const { location, mealtype, cuisine, lcost, hcost, page } = this.state;
        const filterObj ={
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length === 0 ? undefined : cuisine,
            lcost,
            hcost,
            page,
            sort:sort
        };
        axios({
            url: 'http://localhost:2020/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants,sort,pageCount: response.data.pageCount})
            })
            .catch()
    }
    handleCostChange = (lcost, hcost) => {

        const { location, mealtype, cuisine, sort, page } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length === 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url: 'http://localhost:2020/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, lcost, hcost,pageCount: response.data.pageCount })
            })
            .catch()
    }
    handleCuisineChange = (cuisineId) => {

        const { location, mealtype, cuisine, sort, lcost, hcost, page } = this.state;

        const index = cuisine.indexOf(cuisineId);
        if (index >= 0) {
            cuisine.splice(index, 1);
        }
        else {
            cuisine.push(cuisineId);
        }

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length === 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
        };
        axios({
            url: 'http://localhost:2020/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants,cuisine,pageCount: response.data.pageCount})
            })
            .catch()
    }
    handleRating = ( lrating,hrating) => {
        const { location, mealtype, cuisine, sort, lcost, hcost, page } = this.state;
        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length === 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            lrating,
            hrating,
            page
        };
        axios({
            url: 'http://localhost:2020/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, lrating, hrating,pagecount: response.data.pagecount })
            })
            .catch()
    }



    handleNavigate = (resId) => {
        this.props.history.push(`/details?restaurant=${resId}`);
    }
    handlePageChange = (page) => {
        const { location, mealtype, cuisine, sort, lcost, hcost } = this.state;

        const filterObj = {
            mealtype: mealtype,
            location: location,
            cuisine: cuisine.length === 0 ? undefined : cuisine,
            lcost,
            hcost,
            sort,
            page
        };

        axios({
            url: 'http://localhost:2020/filter',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ restaurants: response.data.restaurants, page, pageCount: response.data.pageCount })
            })
            .catch()
    }

    render() {
        const { restaurants, locations,pageCount } = this.state;
        return (
            <div style={{height:'20px'}}>
                <div className="container-fluid header">
                    <div className="row">
                        <div className="col-lg-7 col-md-6 col-sm-6 g-0 text-start ms-sm-2">
                            <span className="logo-span ">
                            <NavLink to="/" className="logoAcc" > e! </NavLink>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="container t-text">Breakfast Places in Mumbai</div>
                <div className="container">
                    <div className="row text-start">
                        <div className="col-lg-4 col-md-6 col-sm-6 ">
                            <div className="collaps-div">
                                <span className="collaps-span ">Filters / Sort</span>
                                <span className="fas fa-chevron-down me-3 mt-3 float-end " id="hide" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#filter"></span>
                            </div>
                            <div id="filter" className="collaps show">
                                <p className="filter-div mt-4">filter</p>
                                <div className="loc">Select Location</div>
                                <select className="select" onChange={this.handleLocationChange}>
                                    <option value="0">Select</option>
                                    {locations.map((item) => {
                                return <option key={item.location_id} value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                            })}
                                   
                                </select>
                                <b className="Cuisine">Cuisine</b>
                                <div className="checkbox-div">
                                    <div> <input type="checkbox" className="check-box" onChange={() => this.handleCuisineChange(1)} />
                                        <label className="check">North Indian </label>
                                    </div>
                                    <div> <input type="checkbox" className="check-box" onChange={() => this.handleCuisineChange(2)}/>
                                        <label className="check">South Indian</label>
                                    </div>
                                    <div> <input type="checkbox" className="check-box" onChange={() => this.handleCuisineChange(3)} />
                                        <label className="check">Chinese </label>
                                    </div>
                                    <div> <input type="checkbox" className="check-box" onChange={() => this.handleCuisineChange(4)}/>
                                        <label className="check">Fast Food </label>
                                    </div>
                                    <div> <input type="checkbox" className="check-box" onChange={() => this.handleCuisineChange(5)}/>
                                        <label className="check">Street Food </label>
                                    </div>
                                </div>
                                <div className="cost">Cost For Two
                                    <div> <input type="radio" className="cost-two " value="1" name="Ccost"  onChange={() => this.handleCostChange(1, 500)}/>
                                        <label className="c-leb ">Less than &#8377;500
                                        </label>
                                    </div>
                                    <div> <input type="radio" className="cost-two pt-1" value="2" name="Ccost" onChange={() => this.handleCostChange(500, 1000)} />
                                        <label className="c-leb pt-1">&#8377; 500 to &#8377;1000
                                        </label>
                                    </div>
                                    <div> <input type="radio" className="cost-two pt-1" value="3" name="Ccost"  onChange={() => this.handleCostChange(1000, 1500)}/>
                                        <label className="c-leb pt-1"> &#8377; 1000 to &#8377;1500
                                        </label>
                                    </div>
                                    <div> <input type="radio" className="cost-two pt-1" value="4" name="Ccost" onChange={() => this.handleCostChange(1500, 2000)} />
                                        <label className="c-leb pt-1">&#8377;1500 to &#8377;2000
                                        </label>
                                    </div>
                                    <div> <input type="radio" className="cost-two pt-1" value="5" name="Ccost" onChange={() => this.handleCostChange(2000, 50000)} />
                                        <label className="c-leb pt-1"> &#8377; 2000+
                                        </label>
                                    </div>
                                </div>
                                <div className="Sort">Sort
                                    <div> <input type="radio" className="Sort-r" value="4" name="cost" onChange={() => this.handleSortChange(1)} />
                                        <label className="s-leb">Price low to high
                                        </label>
                                    </div>
                                    <div> <input type="radio" className="Sort-r" value="5" name="cost" onChange={() => this.handleSortChange(-1)} />
                                        <label className="s-leb"> Price high to low
                                        </label>
                                    </div>
                                </div>
                                    <br/>
                                <div className="ratediv">
                                <div className="rate">Rating
                                    <div> <input type="radio" className="rate-r" value="4" name="Rate" onChange={() => this.handleRating(1 ,2)} />
                                        <label className="r-leb">Ratings 1 - 2 
                                        </label>
                                    </div>
                                    <div> <input type="radio" className="rate-r" value="5" name="Rate" onChange={() => this.handleRating(2 , 3)} />
                                        <label className="r-leb"> Ratings 2 - 3
                                        </label>
                                    </div>
                                    <div> <input type="radio" className="rate-r" value="4" name="Rate" onChange={() => this.handleRating(3,4)} />
                                        <label className="r-leb">Ratings 3 - 4 
                                        </label>
                                    </div>
                                    <div> <input type="radio" className="rate-r" value="5" name="Rate" onChange={() => this.handleRating(4,5)} />
                                        <label className="r-leb"> Ratings 4 - 5
                                        </label>
                                    </div>
                                </div>
                                </div>



                                <button type="button" className="btn btn-outline-danger apply-btn">Apply </button>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-6 col-sm-6 mt-1 g-0 ">
                            {restaurants.length > 0 ? restaurants.map((item, index) => {
                                return <div className="col-lg-12 col-md-6 col-sm-6 g-0 shadow " key={index} onClick={() => this.handleNavigate(item._id)}>
                                    <div className="col-lg-5 col-md-6 col-sm-6 img-box g-0 ">
                                        <img src={`./${item.image}`} alt="No Image, Sorry for the Inconvinience" className="top-image" />
                                    </div>

                                    <div className=" headdiv col-lg-7 col-md-6 col-sm-6  ">
                                        <h1 className="TheBig">{item.name}</h1>
                                        <div className="FORT">{item.locality}</div>
                                        <div className="Shop1">{item.city}</div>
                                        <div className="Shop1">Rateings:{item.aggregate_rating}</div>
                                        <hr className="line" />
                                        <div className="t-Cuisine">Cuisine
                                            <span className="Bakery "> {item.cuisine.map((val) => `${val.name}, `)}</span>
                                            <br /> Cost For Two
                                            <span className="Bakery2"> {item.min_price}</span>




                                        </div>

                                    </div>
                                </div>
                            }) :<div className="col-lg-12 col-md-6 col-sm-6 g-0 shadow ">
                                <div class="no-records">Sorry. No result found</div></div>}


                        </div>
                    </div>
                    <div>
                       { restaurants.length > 0 ? <div className="pagination">
                            <div className="page-link" href="#">&laquo;</div>
                            { pageCount.map((page)=>{
                                return<div onClick={() => this.handlePageChange(page)} className="page-item">{page}</div>
                            })}
                            <div className="page-link" href="#">&raquo;</div>
                        </div>:null }
                    </div>
                  

                </div>
            </div>


        )
    }
}
export default Filter;