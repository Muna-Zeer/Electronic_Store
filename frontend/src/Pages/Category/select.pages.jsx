// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SelectCategory = ({ setSelectedCategory }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/api/categoryType`)
//       .then((response) => {
//         setCategories(response.data.category);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   return (
//     <>
//       <select onChange={handleCategoryChange}>
//         <option value="" disabled>
//           Select a category
//         </option>
//         {categories.map((category) => (
//           <option key={category.id} value={category.id}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//     </>
//   );
// };

// export default SelectCategory;
