import React, { Fragment ,useEffect, useState} from 'react'
import "./Product.css";
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors,getProduct } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { load } from 'webfontloader';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const Products = ({match}) => {

    const dispatch = useDispatch();

    const { keyword } = useParams();  // Extract the 'id' parameter from the URL
    const [currentPage,setCurrentPage] = useState(1);
    const[price,setPrice] = useState([0,25000]);

    const {products,loading,error,productsCount,resultperpage,filteredProductsCount} = useSelector(
        state => state.products
    );

    const setCurrentPageNo =(e)=>{
      setCurrentPage(e)
    }

    const priceHandler = (event,newprice) => {
      setPrice(newprice);
    }
  

    useEffect(() => {
      console.log("Fetching products for page:", currentPage);
      if(keyword,currentPage,price){
        dispatch(getProduct(keyword,currentPage,price));
      }
     }, [dispatch,keyword,currentPage,price])

     let count= filteredProductsCount;
    
  return (
    <Fragment>
        {loading ? <Loader/> : 
        <Fragment>
              <h2 className='productsHeading'>Products</h2>

              <div className='products'>
                {products && products.map((product)=>(
                    <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* filter by price */}
              <div className="filterBox">
                  <Typography>Price</Typography>
                  <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={25000}
                  />
              </div>
              {/* pagination */}
                {resultperpage < count && (
                  <div className='paginationBox'>
                  <Pagination 
                    activePage={currentPage}
                    itemsCountPerPage={resultperpage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass='page-item'
                    linkClass='page-link'
                    activeClass='pageItemActive'
                    activeLinkClass='pageLinkActive'
                  />
                </div>
                )}
              
        </Fragment>}
    </Fragment>
  )
}

export default Products
