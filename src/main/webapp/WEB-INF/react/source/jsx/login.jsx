import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Bootstrap from 'bootstrap';
import sassLoader from '../scss/login.scss';
import User from '../javascripts/user';
var Client = require('node-rest-client').Client;
var BackboneSerialize = require('backbone-serialize');
var Backbone = BackboneSerialize.mixin(require('backbone'));
import {renderOverlayModal} from './overlay.jsx';
import {renderLoader, hideLoader} from './loader.jsx';
 
var LoginForm = React.createClass({
  render: function() {
    return (
      <div className={this.props.showLink ? 'hidden' : 'form-narrow form-horizontal'}>
        <h3>Please Sign In</h3>
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
            <span className={this.state.passwordError ? 'error help-block' : 'hidden'}>{this.state.passwordError}</span>
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <div className="checkbox">
              <label>
                <input type="checkbox" name="_spring_security_remember_me" /> Remember me
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button type="submit" className="btn btn-default" onClick={this.submitForm}>Sign in</button>
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <p>New here? <a onClick={this.onSignUpButtonClick} href="javascript:void(0)">Sign Up</a></p>
          </div>
        </div>
      </div>
    );
  },
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
  onEmailError: function(e) {
    this.setState({emailError: e});
  },
  onPasswordError: function(e) {
    this.setState({passwordError: e});
  },
  onUsernameChange: function(e) {
   this.setState({username: e.target.value});
  },
  onEmailChange: function(e) {
   this.setState({email: e.target.value});
  },
  onPasswordChange: function(e) {
   this.setState({password: e.target.value});
  },
  onSignUpButtonClick: function() {
    Backbone.history.navigate('register', {trigger:true});
  },
  submitForm: function() {
    Backbone.emulateHTTP = true;
    var user = new User();
    user.set('email', this.state.email);
    user.set('password', this.state.password);
    user.serialize();
    user.url = '/signin';
    var promise = user.save();
    var _this = this;
    renderLoader();
    $.when(promise).done(function(data) {
      var emailError = '';
      var passwordError = '';
      hideLoader();
      if (data.errors) {
        emailError = data.errors.email;
        passwordError = data.errors.password;
      } else {
        renderOverlayModal(data.title, data.message, data.success);
      }
      _this.onEmailError(emailError);
      _this.onPasswordError(passwordError);
      // _this.resetForm();
    });
    $.when(promise).fail(function(error) {
      hideLoader();
      renderOverlayModal('Error', error.message, false);
      console.log(error);
    });
  },
  resetForm: function() {
    this.setState({username: ''});
    this.setState({password: ''});
  },
  isFormComplete: function() {
    if (this.state.username != "" &&
      this.state.password != '') {
      return true;
    } else {
      return false;
    }
  }
});

export function renderLoginForm() {
	ReactDOM.render(<LoginForm showLink=''/>, document.getElementById('login__container'));
}

export function hideLoginForm() {
	ReactDOM.render(<LoginForm showLink='hidden'/>, document.getElementById('login__container'));
}