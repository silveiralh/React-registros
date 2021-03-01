const INITIAL_STATE = {
    usuarioEmail: '',
    usuarioLogado: 0,
    semAcesso: 0,
};

function usuarioReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, usuarioLogado: 1, usuarioEmail: action.usuarioEmail, semAcesso: null }
        case 'LOGOUT':
            return { ...state, usuarioLogado: 0, usuarioEmail: null, semAcesso: null }
        case 'SEMACESSO':
            return { ...state, usuarioLogado: 0, usuarioEmail: null, semAcesso: 1 }
        default:
            return state;
    }
}
export default usuarioReducer;