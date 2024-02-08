import { MdClose } from "react-icons/md";
import prod from '../../../assets/products/earbuds-prod-1.webp'
import useFetch from '../../../hooks/useFetch'
import "./Search.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Search = ({ setShowSearch }) => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const onChange = (e) => {
        setQuery(e.target.value)
    }
    let { data } = useFetch(`/api/products?populate=*&filters[name][$contains]=${query}`)
    let { id } = useParams()

    if (!query.length) {
        data = null
    }

    return (
        <div className="search-modal">
            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search products"
                    value={query}
                    onChange={onChange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setShowSearch(false)}
                />
            </div>
            <div className="search-result-content">
                <div className="search-results" >
                    {data?.data?.map(item => (
                        <div key={item.id} className="search-result-item" onClick={() => {
                            navigate('/product/' + item.id)
                            setShowSearch(false)
                        }}>
                            <div className="image-container">
                                <img src={process.env.REACT_APP_DEV_URL + item.attributes.images.data[0].attributes.url} />
                            </div>
                            <div className="prod-details">
                                <span className="name"> {item.attributes.name} </span>
                                <span className="desc"> {item.attributes.description} </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
};

export default Search;

{/* <div className="start-msg">
        Start typing to see products you are looking for.
    </div> */}