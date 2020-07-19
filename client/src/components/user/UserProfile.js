import React from 'react';

import InputError from '../elements/form/InputError';
import InputGroup from '../elements/form/InputGroup';
import MainButton from '../elements/MainButton';
import LinkButton from '../elements/LinkButton';
import SuccessMessage from '../elements/SuccessMessage';

export default class UserProfile extends React.PureComponent {
    state = {
        login: this.props.login,
        name: this.props.name,
    };

    componentDidMount() {
        /*let { profileSaved } = this.props;
        if (profileSaved !== this.state.profileSaved) {
            this.setState(profileSaved);

            this.props.history.push('/');
        }*/
    }

    renderSuccessMessage = (profileSaved) => {
        if (!profileSaved) {
            return false;
        }

        return <SuccessMessage text={'Profile was successfully updated'}/>
    };
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
        let { profileSaved, onCancel } = this.props;
        return (
            <div className='user-profile'>
                {this.renderSuccessMessage(profileSaved)}
                <InputGroup
                    title={'Your login'}
                    id={'user-login'}
                    placeholder={'[a-zA-Z-_]+'}
                    onChange={this.handleLoginChange}
                    value={this.state.login}
                />
                {this.renderError('login')}

                <InputGroup
                    title={'Your name'}
                    id={'user-name'}
                    placeholder={'[a-zA-Z-_ ]+'}
                    onChange={this.handleNameChange}
                    value={this.state.name}
                />
                {this.renderError('name')}

                <LinkButton
                    text={'<--- go back'}
                    onClick={onCancel}/>
                <MainButton
                    text={'Save profile'}
                    onClick={this.saveProfile}/>
            </div>
        )
    }
}
