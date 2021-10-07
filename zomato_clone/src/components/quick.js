import React from 'react';
import '../Styles/home.css';
import{withRouter} from 'react-router-dom'

class Quick extends React.Component{
    handleNavigate = (mealTypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if (locationId) {
            this.props.history.push(`/filter?mealtype=${mealTypeId}&location=${locationId}`);
        }
        else {
            this.props.history.push(`/filter?mealtype=${mealTypeId}`);
        }
       
    }

    render(){
        const{ mealtypesData} = this.props;
        return(
            <div>
                <div className="container Hafter-img">
            <div className="row  mt-5">
                <div className="col-12 col-xl-12 col-md-12 col-sm-12">
                    <div className="container  Hquick">Quick Searches</div>
                </div>
                <div className="col-12 col-xl-12 col-md-12 col-sm-12">
                    <div className="container Hdiscover">Discover restaurants by type of meal</div>
                </div>
            </div>

            <div className="row g-0 mt-3 Hboxes">
                {mealtypesData.map((item)=>{
                    return <div  onClick={() => this.handleNavigate(item._id)} key={item._id} className="col-lg-4 col-md-6 col-sm-12 g-0  Hshadow-box">

                    <div name="left" className="Hitem-left">
                        <img src={`./${item.image}`} alt="Sorry for the Inconvinience" height="100%" width="100%" />
                    </div>
                    <div name="right" className="Hitem-right">
                        <div className="Hheader">{item.name}</div>
                        <div className="Hdescription">{item.content}</div>
                    </div>
                </div>
                }
                
                )}
               
               
            </div>
        </div>

            </div>
        )
    }
}
export default withRouter(Quick);