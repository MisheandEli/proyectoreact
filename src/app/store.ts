// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import personReducer from '../features/person/personSlice'

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: false
// })

// const store = configureStore({
//   reducer: {
//     person: personReducer,
//   },
//   middleware: customizedMiddleware, 
// })

// export default store
import { configureStore } from '@reduxjs/toolkit'
import personReducer from '../features/person/personSlice'

// Disable the serializableCheck middleware by customizing the middleware setup
const store = configureStore({
  reducer: {
    person: personReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
