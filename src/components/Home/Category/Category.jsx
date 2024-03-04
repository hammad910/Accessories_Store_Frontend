import {useNavigate } from "react-router-dom";
import "./Category.scss";

const Category = ({ categories }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className="shop-by-category">
                <div className="sec-heading">Category</div>
                    <div className="categories">
                        {categories?.data?.map((item) => (
                                <div className="category" key={item.id} onClick={() => navigate(`/category/${item.id}`)}>
                                    <video autoPlay muted loop >
                                        <source src={process.env.REACT_APP_DEV_URL + item.attributes.img.data.attributes.url} type="video/mp4" />
                                    </video>
                                    <h3 style={{ textAlign: 'center', marginTop: '7px' }}>{item.attributes.title}</h3>
                                </div>
                        ))}
                     
                    </div>
            </div>
        </>
    );
};

export default Category;
