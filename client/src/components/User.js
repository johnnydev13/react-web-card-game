import React from "react";
import UserProfile from "./user/UserProfile";

export default class User extends React.PureComponent {
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
                    profileSaved={this.props.profileSaved}
                    onCancel={this.cancelProfileEditHandler}
                    onSave={this.saveProfileHandler}
                    errors={this.props.errors}
                />
            </div>
        );
    }
}
