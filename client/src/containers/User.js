import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import { editProfile } from '../actions/user';

class User extends React.PureComponent {
    cancelProfileEditHandler = () => {
        this.props.history.push('/')
    };

    saveProfileHandler = (login, name) => {
        this.props.editProfile(login, name);
    };

    render () {
        return (
            <div>
                <UserProfile
                    login={this.props.login}
                    name={this.props.name}
                    onCancel={this.cancelProfileEditHandler}
                    onSave={this.saveProfileHandler}
                    errors={this.props.errors}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.user.errors,
    login:  state.user.login,
    name:   state.user.name,
});
/*const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});*/

export default withRouter(connect(mapStateToProps, {
    editProfile
})(User));
