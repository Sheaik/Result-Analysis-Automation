import React from 'react'
import '../../css/login/Login.scss'
import LoginContext, { LoginProvider } from "../../context/LoginContext";

class Login extends React.Component {
    render () {
        return (
            <LoginProvider>
                <RenderLogin/>
            </LoginProvider>
        )

    }
}

class RenderLogin extends React.Component {
    render () {
        const style = {
            margin: "15px 0"
        };
        return (
            <div className={ 'Login' }>
                <div className={ 'title' }>
                    <div className={ 'initial' }>R</div>
                    esult <div className={ 'initial' }>A</div>nalysis <div className={ 'initial' }>A</div>utomation
                </div>
                <div className="login-container">
                    <div className="title">
                        Login
                    </div>
                    <FluidInput type="text" label="name" id="name" style={ style }/>
                    <FluidInput type="password" label="password" id="password" style={ style }/>
                    <Button buttonText="log in" buttonClass="login-button"/>
                </div>
            </div>
        );
    }
}

class FluidInput extends React.Component {
    static contextType = LoginContext

    constructor ( props ) {
        super( props );
        this.state = {
            focused: false,
            value: ""
        };
    }

    focusField () {
        const { focused } = this.state;
        this.setState( {
            focused: !focused
        } );
    }

    handleChange ( event ) {
        const context = this.context
        const { target } = event;
        const { value } = target;
        this.setState( {
            value: value
        } );
        if ( this.props.type === 'text' ) {
            context.setEmail( value )
        } else if ( this.props.type === 'password' ) {
            context.setPassword( value )
        }
    }

    render () {
        const { type, label, style, id } = this.props;
        const { focused, value } = this.state;

        let inputClass = "fluid-input";
        if ( focused ) {
            inputClass += " fluid-input--focus";
        } else if ( value !== "" ) {
            inputClass += " fluid-input--open";
        }

        return (
            <div className={ inputClass } style={ style }>
                <div className="fluid-input-holder">

                    <input
                        className="fluid-input-input"
                        type={ type }
                        id={ id }
                        onFocus={ this.focusField.bind( this ) }
                        onBlur={ this.focusField.bind( this ) }
                        onChange={ this.handleChange.bind( this ) }
                        autocomplete="off"
                    />
                    <label className="fluid-input-label" forHtml={ id }>{ label }</label>

                </div>
            </div>
        );
    }
}

class Button extends React.Component {
    static contextType = LoginContext

    constructor ( props ) {
        super( props );
        this.handleLogin = this.handleLogin.bind( this )
    }

    handleLogin () {
        const context = this.context
        if ( (context.email != null && context.email !== '') && (context.password != null && context.password !== '') ){
            if(context.email === 'admin' && context.password === 'admin'){
                window.location.href = "/home"
            }
        }
    }

    render () {
        return (
            <div className={ `button ${ this.props.buttonClass }` } onClick={ this.handleLogin }>
                { this.props.buttonText }
            </div>
        );
    }
}

export default Login
