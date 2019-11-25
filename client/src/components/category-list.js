import React from 'react';

const CategoryList = ({categories,category}) => {
  return (
    <ul className="li-items">
      {
        categories[category].map((item,index)=>
        <li key={item}>
          {item}
        </li>
        )
      }
    </ul>
  )
}
export default CategoryList;