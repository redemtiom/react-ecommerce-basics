import { createContext, useState, useEffect } from 'react'

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

//* Used this method to upload data to firebase
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js'

//* Data that we used to build categories
// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
    categoriesMap: {}
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setcategoriesMap] = useState({})

    //* Example to upload data with batch to firestore
    // useEffect(()=> {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    useEffect(()=> {
        const getCategoriesMap = async () =>{
            const categoryMap = await getCategoriesAndDocuments()
            setcategoriesMap(categoryMap)
        }

        getCategoriesMap()
    }, [])

    const value = {categoriesMap}

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}
