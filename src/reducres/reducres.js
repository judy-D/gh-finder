
let initialState = {
    searchKeyword: '',
    searchOption:'',
    userprofile: {},
    repos: [],
    error: null,
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_KEYWORD':
            return {
                ...state,
                searchKeyword: action.searchKeyword,
                isLoading: false,
                error: null
            }
        case 'UPDATE_OPTION':
            return {
                ...state,
                searchOption: action.searchOption,
                isLoading: false,
                error: null
            }
        case 'UPDATE_USERPROFILE':
            return {
                ...state,
                userprofile: action.userprofile,
                isLoading: false,
                error: null
            }
        case 'UPDATE_REPOS':
            return {
                ...state,
                repos: action.repos,
                isLoading: false,
                error: null
            }
        case 'CLEAR_RESULT':
            return {
                ...state,
                userprofile: [],
                repos: [],
                isLoading: false,
                error: null
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;