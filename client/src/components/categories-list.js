import React from 'react';
import CategoryList from './category-list';

const CategortiesList = ({categories}) => {
  return (
    <React.Fragment>
    {
      Object.keys(categories).map((category) =>
          categories[category].length > 0 ?
        (<div className="card" key={category}>
          <h3 className="li-categories">{category}</h3>
          <CategoryList categories={categories} category={category}/>
        </div>)
        :
        null
      )
    }
    </React.Fragment>
  )
}

export default CategortiesList;