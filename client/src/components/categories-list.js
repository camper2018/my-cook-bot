import React from 'react';
import CategoryList from './category-list';
import {changeCategoriesFormat} from '../../../server/helpers'
const CategortiesList = ({categories}) => {
  return (
    <React.Fragment>
    {
      Object.keys(categories).map((category) =>
          categories[category].length > 0 ?
        (<div className="card" key={category}>
          <h3 className="li-categories">{changeCategoriesFormat(category)}</h3>
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