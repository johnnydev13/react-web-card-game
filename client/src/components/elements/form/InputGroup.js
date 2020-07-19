import React from 'react';
import {label, InputGroup as InputGroupElement, FormControl} from 'react-bootstrap';

export default class InputGroup extends React.PureComponent {
    render () {
        let { id, title, placeholder, onChange, value} = this.props;

        return (
            <div className={'input-group'}>
                <label htmlFor={id}>{title}</label>
                <InputGroupElement className="mb-3">
                    <FormControl
                        id={id}
                        placeholder={placeholder}
                        aria-label={title}
                        aria-describedby="basic-addon1"
                        onChange={onChange}
                        value={value}
                    />
                </InputGroupElement>
            </div>
        )
    }
}
