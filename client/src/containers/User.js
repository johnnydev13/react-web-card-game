import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { editProfile } from '../actions/user';
import User from '../components/User';

const mapStateToProps = state => ({
    errors:       state.user.errors,
    login:        state.user.login,
    name:         state.user.name,
    profileSaved: state.user.profileSaved,
});
/*const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});*/

export default withRouter(connect(mapStateToProps, {
    editProfile
})(User));
