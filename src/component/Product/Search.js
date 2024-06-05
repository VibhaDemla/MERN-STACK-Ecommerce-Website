import React , { Fragment,useState }from 'react'
import "./search.css";
import { useNavigate } from 'react-router-dom';


const Search = () => {

  const [keyword,setKeyword] = useState("");
  const navigate = useNavigate();


  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder='Search a product...'
          onChange={(e)=>setKeyword(e.target.value)}
          />
          <input type="Submit" value="Search"/>
      </form>
    </Fragment>
  )
}

export default Search
