import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/categoryType`)
      .then((response) => {
        
        setCategories(response.data.category);
        console.log('response.data.category ','response.data.category');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

//get  the name of the categories
useEffect(()=>{
    if(selectedCategory){
        axios.get(`http://127.0.0.1:8000/api/viewItems?category_id=${selectedCategory}`)
        .then((response) => {setProducts(response.data.products)
        console.log('response.data.products',response.data.products);
    })
        .catch(error => console.log(error));
    }
    },[selectedCategory])

    const handleCategoryChange=(e)=>{
        setSelectedCategory(e.target.value);
    }
    return (
        <>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" disabled>Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.id}-{category.name}</option>
          ))}
        </select>
    
        </>
      );
};
export default Category;
