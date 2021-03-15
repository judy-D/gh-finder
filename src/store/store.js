import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducres/reducres";

function configureStore(initialState = {}) {
    // const reducer = combineReducers({
    //   form: persistReducer(
    //     {
    //       key: "form", // key for localStorage key, will be: "persist:form"
    //       storage,
    //       debug: true,
    //       blacklist: ['SET_LOADING','SET_ERROR'],
    //     },
    //     rootReducer
    //   ),
    // });


const store = createStore(persistReducer({
    key: "root",
    debug: true,
    storage,
  }, rootReducer));

console.log("initialState", store.getState());

const persistor = persistStore(store, null, () => {
    // if you want to get restoredState
    console.log("restoredState", store.getState());
  });

  return { store, persistor };
}

export default configureStore;

// export const store = createStore(pReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
