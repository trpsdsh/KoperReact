import React from 'react';

type CategoriesType = {
  value: number;
  onClickCategory: (value:number) => void;
};

const Categories: React.FC<CategoriesType> = ({ value, onClickCategory }) => {
  const categories = ['Все', 'Frontend', 'Backend', 'Libs', 'Сборщики', 'ДевОпс'];

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;