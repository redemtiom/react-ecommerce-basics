//* This is the first example with reselect library, this is useful
//* because use memorized to evit run again every selectors in root
//* reducer
import { createSelector } from 'reselect'

import { CategoriesState } from './category.reducer'
import { CategoryMap } from './category.types'

const selectCategoryReducer = (state): CategoriesState => state.categories

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap =>
        categories.reduce((acc, category) => {
            const { title, items } = category
            acc[title.toLowerCase()] = items
            return acc
        }, {} as CategoryMap)
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)

//* Original redux selector without memorized
// export const selectCategoriesMap = (state) => {
//     console.log('selector fired')
//     return state.categories.categories.reduce((acc, category) => {
//         const { title, items } = category
//         acc[title.toLowerCase()] = items
//         return acc
//     }, {})
// }
