import CategoryItem from '../category-item/category-item.component'

import './directory.styles.scss'

const Categories = ({categories}) => {
    return (
		<div className='directory-container'>
			{categories.map((category) => (
        <CategoryItem category={category} key={category.id}/>
			))}
		</div>
	);
}

export default Categories