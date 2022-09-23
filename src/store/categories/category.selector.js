//* This is the first example with reselect library, this is useful
//* because use memorized to evit run again every selectors in root
//* reducer
import { createSelector } from 'reselect'

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category
            acc[title.toLowerCase()] = items
            return acc
        }, {})
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
