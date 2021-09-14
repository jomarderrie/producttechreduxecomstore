import React, {useState, useEffect, useCallback} from "react";
import {Link, useHistory} from "react-router-dom";
import {getCategories} from "../../functions/category";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories().then((c) => {
            setCategories(c.data);
            setLoading(false);
        });
    }, []);

    const history = useHistory()
    const onCategoryClick = (c) => {
        // console.log(c)
        history.push(`/category/${c}`)
    }

    const showCategories = () =>
        categories.map((c) => (
            // <Link to={`/category/${c.slug}`}>
            <div
                key={c._id}
                className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
                onClick={() => onCategoryClick(c.slug)}
            >
                {c.slug}
            </div>
        ));

    return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <h4 className="text-center">Loading...</h4>
                ) : (
                    showCategories()
                )}
            </div>
        </div>
    );
};

export default CategoryList;
