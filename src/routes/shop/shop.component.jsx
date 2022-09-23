import { useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { setCategories } from '../../store/categories/category.action'

import CategoryPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesArray = await getCategoriesAndDocuments()
            dispatch(setCategories(categoriesArray))
        }

        getCategoriesMap()
    }, [])

    return (
        <Routes>
            <Route index element={<CategoryPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
}

export default Shop
