import React from 'react';
import {
    Button,
    InputGroup,
    FormControl,
} from 'react-bootstrap';
import InputError from './form/InputError';

export default class UserProfile extends React.PureComponent {
    state = {
        login: this.props.login,
        name: this.props.name
    };

    componentDidMount() {

    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value})
    };

    handleLoginChange = (event) => {
        this.setState({login: event.target.value})
    };

    saveProfile = () => {
        this.props.onSave(this.state.login, this.state.name);
    };

    renderError = key => {
        if (typeof this.props.errors[key] === 'undefined') {
            return false;
        }

        return <InputError errorText={this.props.errors[key]}/>;
    };
    render() {
        return (
            <div className='user-profile'>
                <label htmlFor="user-login">Your login</label>
                <InputGroup className="mb-3">
                    <FormControl
                        id="user-login"
                        placeholder="[a-zA-Z-_]+"
                        aria-label="You unique login"
                        aria-describedby="basic-addon1"
                        onChange={this.handleLoginChange}
                        value={this.state.login}
                    />
                </InputGroup>
                {this.renderError('login')}

                <label htmlFor="user-name">Your name</label>
                <InputGroup className="mb-3">
                    <FormControl
                        id="user-name"
                        placeholder="[a-zA-Z-_ ]+"
                        aria-label="You name"
                        aria-describedby="basic-addon1"
                        onChange={this.handleNameChange}
                        value={this.state.name}
                    />
                </InputGroup>
                {this.renderError('name')}

                <InputGroup>
                    <Button variant="secondary" onClick={this.props.onCancel}>Cancel</Button>
                    <Button variant="primary" onClick={this.saveProfile}>Save profile</Button>
                </InputGroup>
            </div>
        )
    }
}
