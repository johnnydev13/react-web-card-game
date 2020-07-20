import React from "react";
import UserProfile from "./user/UserProfile";
import PropTypes from 'prop-types';

export default class User extends React.PureComponent {
    cancelProfileEditHandler = () => {
        this.props.history.push('/')
    };

    saveProfileHandler = (login, name) => {
        this.props.editProfile(login, name);
    };

    render () {
        let { name, login, profileSaved, errors} = this.props;

        return (
            <div>
                <UserProfile
                    login={login}
                    name={name}
                    profileSaved={profileSaved}
                    onCancel={this.cancelProfileEditHandler}
                    onSave={this.saveProfileHandler}
                    errors={errors}
                />
            </div>
        );
    }
}

User.propTypes = {
    profileSaved: PropTypes.bool,
    name: PropTypes.string,
    login: PropTypes.string,
    errors: PropTypes.shape({
        login: PropTypes.string,
        name: PropTypes.string,
    }),
};
