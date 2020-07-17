import React from "react";
import UserProfile from "./UserProfile";

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
                    onCancel={this.cancelProfileEditHandler}
                    onSave={this.saveProfileHandler}
                    errors={this.props.errors}
                />
            </div>
        );
    }
}
