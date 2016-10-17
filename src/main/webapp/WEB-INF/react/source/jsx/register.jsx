import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Bootstrap from 'bootstrap';
import sass from '../scss/create.scss';
import User from '../javascripts/user';
var Client = require('node-rest-client').Client;
var BackboneSerialize = require('backbone-serialize');
var Backbone = BackboneSerialize.mixin(require('backbone'));
import {renderOverlayModal} from './overlay.jsx';
import {renderLoader, hideLoader} from './loader.jsx';

var RegisterUserForm = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      emailError: '',
      passwordError: ''
    }
  },
  render: function() {
    return (
      <div className={this.props.showLink ? 'hidden' : 'form-narrow form-horizontal'}>
        <div>
            <h3>Please Register</h3>
            <div className="form-group">
                <label className="col-lg-2 control-label">Email</label>
                <div className="col-lg-10">
                    <input onChange={this.onEmailChange} type="text" className="span2 form-control" name="email" placeholder="Email address"/>
                    <span className={this.state.emailError ? 'error help-block' : 'hidden'}>{this.state.emailError}</span>
                </div>
            </div>
            <div className="form-group">
                <label className="col-lg-2 control-label">Password</label>
                <div className="col-lg-10">
                    <input onChange={this.onPasswordChange} type="password" className="span2 form-control" name="password" placeholder="Password"/>
                    <span className={this.state.emailError ? 'error help-block' : 'hidden'}>{this.state.passwordError}</span>
                </div>
            </div>
            <div className="form-group">
                <div className="col-lg-offset-2 col-lg-10">
                    <button onClick={this.submitForm} type="submit" className="btn btn-default">Sign up</button>
                </div>
            </div>
            <div className="form-group">
                <div className="col-lg-offset-2 col-lg-10">
                    <p>Already have an account? <a onClick={this.onSignInButtonClick} href="javascript:void(0))">Sign In</a></p>
                </div>
            </div>
        </div>
      </div>
    );
  },
  onEmailError: function(e) {
    this.setState({emailError: e});
  },
  onPasswordError: function(e) {
    this.setState({passwordError: e});
  },
  onEmailChange: function(e) {
   this.setState({email: e.target.value});
  },
  onLastNameChange: function(e) {
   this.setState({last_name: e.target.value});
  },
  onFirstNameChange: function(e) {
   this.setState({first_name: e.target.value});
  },
  onUsernameChange: function(e) {
   this.setState({username: e.target.value});
  },
  onPasswordChange: function(e) {
   this.setState({password: e.target.value});
  },
  onSignUpButtonClick: function() {
    Backbone.history.navigate('signin', {trigger:true});
  },
  submitForm: function() {
    Backbone.emulateHTTP = true;
    var user = new User();
    user.set('email', this.state.email);
    user.set('password', this.state.password);
    // user.set('first_name', this.state.first_name);
    // user.set('last_name', this.state.last_name);
    // user.set('email', this.state.email);
    user.serialize();
    // user.set('url', '/signup');
    var promise = user.save();
    var _this = this;
    renderLoader();
    $.when(promise).done(function(data) {
      // window.localStorage.setItem('shop-token', data.token);
      // console.log(data.errors);
      _this.onEmailError(data.errors.email);
      _this.onPasswordError(data.errors.password);
      hideLoader();
      // _this.resetForm();
      renderOverlayModal(data.title, data.message, data.success);
    });
    $.when(promise).fail(function(error) {
      hideLoader();
      renderOverlayModal('Error', 'ERROR', false);
      console.log(error);
    });
  },
  resetForm: function() {
    this.setState({username: ''});
    this.setState({password: ''});
    this.setState({first_name: ''});
    this.setState({last_name: ''});
    this.setState({email: ''});
  }
});

export function renderUserForm() {
  ReactDOM.render(<RegisterUserForm showLink=''/>, document.getElementById('signup__container'));
}

export function hideCreateUserForm() {
  ReactDOM.render(<RegisterUserForm showLink='hidden'/>, document.getElementById('signup__container'));
}