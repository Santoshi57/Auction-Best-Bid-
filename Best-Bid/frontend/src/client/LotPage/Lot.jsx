import React, { useEffect, useState } from 'react';
import RadioButton from "../Inputs/RadioButton";
import "./lotstyle.scss";
import Search from './Search';
import {useSelector , useDispatch} from "react-redux";
import {clearErrors , getProduct} from "../../actions/productAction";
import Loader from '../Loader/Loader';
import Product from "../HomePage/Product";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from 'react-alert';
import MetaData from '../MetaData/MetaData';


const Lot = ({match}) => {


const dispatch = useDispatch();

const alert = useAlert();
const [currentPage , setCurrentPage] =  useState(1);
const [price, setPrice] = useState([0 , 2500000]);
const [category, setCategory] = useState("");
  
const {loading , error , products , productCount , resultPerPage} = useSelector(
  (state) => state.products
    );


    const keyword = match.params.keyword; 

    const setCurrentPageNo = (e) => {

setCurrentPage(e);
    };


const priceHandler = (event , newPrice) => {
  setPrice(newPrice);
}

  
useEffect(() => {
  
  if(error){
     alert.error(error);
dispatch(clearErrors());
  }
 
dispatch(getProduct(keyword , currentPage , price , category));
  
}, [dispatch , keyword , currentPage , price , category , alert , error]);





  return (
     <>{loading ? (<Loader/>) :(
  <>
      {/* <h1> Lot Page</h1> */}
      <MetaData title="Active Auctions"></MetaData>


      <div className=" lotcls" data-aos="fade-up" data-aos-delay="400">
        <div className='row'>
          <div className='col-10 mx-auto'>
          
{/* Heading Section */}

<div className="section-title" data-aos="fade-up">
          <h2>Auctions</h2>
          <p>Start Bidding Now!</p>
        </div>



      <section className="lots-section">
        <div className="lots-list-content lots-container">
          <section className="filters">
            <div className="filters-container displayFilters">
              <h2>
                Filters
              </h2>

      

              <div className="filter-container">
               <div className="filter-title">Category</div>
                <div className="filter-list">
                  <select name="category" id="category" value={category} onChange={(e) => {
                    const selectedCategory = e.target.value;
                    setCategory(selectedCategory);
                  }} >
                    <option value="">All</option>

                    <option value="Drawing">Drawing</option>
                    <option value="Painting">Painting</option>
                    <option value="Jewelry">Photographic Images</option>
                    <option value="Sculptures">Sculptures</option>
                    <option value=" Carvings"> Carvings</option>
                    <option value="Other">Other</option>


                    
                  </select>
                </div>
                {/* {category} */}
              </div>


              <div className="filter-container">
                <div className="filter-title">Price</div>
                {/* <h1>Price Filter</h1> */}
<div className='price-filter-box'>
        <Slider
          value={price} 
          onChange={priceHandler}
          valueLabelDisplay="on"
          aria-labelledby = "range-slider"
          min={0}
          max={2500000}/>

</div>

              </div>
              <div className="filter-container">
                <div className="filter-title">Name</div>
                <div className="filter-list">
                  <div>
                    <RadioButton id="nameAZ" value="nameAZ" name="sort" label="From A to Z" />
                  </div>
                  <div>
                    <RadioButton id="nameZA" value="nameZA" name="sort" label="From Z to A" />
                  </div>
                </div>
                <div className="price-range name-contains">
                  <div>
                    <input type="text" placeholder="Match" id="name-contains" name="name-contains" />
                  </div>
                </div>
              </div>

              <div className="filter-container">
                <div className="filter-title">Date</div>
                <div className="filter-list">
                  <div>
                    <RadioButton id="dateAZ" value="dateAZ" name="sort" label="From Oldest to Newest" />
                  </div>
                  <div>
                    <RadioButton id="dateZA" value="dateZA" name="sort" label="From Newest to Oldest" />
                  </div>
                </div>
              </div>
                
            </div>
          </section>
          <section className="product-lots">

          <div className="row">
                        <div className="col-12">
                            <div className="product-topbar d-flex align-items-center justify-content-between">
                                {/* <!-- Total Products --> */}
                                <div className="total-products">
                                {(keyword) ? (
  <p>Results of <span>{keyword}</span></p>
) : (
                                    <p><span>{productCount}</span> Auctions found</p>
                                    )}
                                </div>
                                {/* <!-- Sorting --> */}
                                <div className="product-searching ">
                                <div className="container">
    <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8 ctrlwidth">
            <div className="search"> 
    <Search/>
             </div>
        </div>
    </div>
</div>
                                </div>
                            </div>
                        </div>
                    </div>            
                    <div className="lots-grid">
              

            {products && products.map(product => (
  <Product product = {product} />
))}

              
            </div>
           
{/* <h1>Pagination</h1> */}

{resultPerPage < productCount && 
(<Pagination
  activePage= {currentPage}
  itemsCountPerPage = {resultPerPage}
  totalItemsCount = {productCount}
  onChange = {setCurrentPageNo}
  nextPageText = "Next"
  prevPageText = "Prev"
  firstPageText = "1st"
  lastPageText = "Last"
  itemClass="page-item"
  linkClass = "page-link"
  activeClass = "pageItemActive"
  activeLinkClass = "pageLinkActive"
/>)}

          </section>
        </div>
      </section>




</div>
          </div>
          </div>


  </>
  ) }</>
  
  );
};

export default Lot;
