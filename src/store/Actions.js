export const Actions = {
    mapStateToProps: (
        function mapStateToProps(state) {
            return {
                ...state
            }
        }
    ),
    mapDispatchToProps: (
        function mapDispatchToProps(dispatch) {
            return {
                login: (payload) => dispatch({
                    type: "LOGIN",
                    payload: payload,
                }),
                setStories: (payload) => dispatch({
                    type: "SET_STORIES",
                    payload: payload,
                }),
                editStoryComponents: (payload) => dispatch({
                    type: "EDIT_COMPONENTS",
                    payload: payload,
                }),
                setTags: (payload) => dispatch({
                    type: "SET_TAGS",
                    payload: payload,
                }),
                logout: () => dispatch({type: "LOGOUT"}),
                showAlert: (payload) => dispatch({
                    type: "SHOW_ALERT",
                    payload: payload,
                }),
                closeAlert: () => dispatch({type: "CLOSE_ALERT"})
            }
        }
    )
}