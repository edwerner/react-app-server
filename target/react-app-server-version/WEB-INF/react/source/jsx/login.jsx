import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Bootstrap from 'bootstrap';
import sass from '../scss/login.scss';
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
            <input type="text" className="form-control" id="inputEmail" placeholder="Email" name="username" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-lg-2 control-label">Password</label>
          <div className="col-lg-10">
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password" />
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
            <button type="submit" className="btn btn-default">Sign in</button>
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
      password: ''
    }
  },
  onUsernameChange: function(e) {
   this.setState({username: e.target.value});
  },
  onPasswordChange: function(e) {
   this.setState({password: e.target.value});
  },
  onSignUpButtonClick: function() {
    Backbone.history.navigate('register', {trigger:true});
  },
  submitForm: function() {
    if (this.isFormComplete()) {
      Backbone.emulateHTTP = true;
      var user = new User();
      user.set('username', this.state.username);
      user.set('password', this.state.password);
      user.serialize();
      user.set('url', '/login');
      var promise = user.save();
      var _this = this;
      renderLoader();
      $.when(promise).done(function(data) {
        window.localStorage.setItem('shop-token', data.token);
        hideLoader();
        _this.resetForm();
        renderOverlayModal(data.title, data.message, data.success);
      });
      $.when(promise).fail(function(error) {
        hideLoader();
        renderOverlayModal('Error', error.responseJSON.message, false);
      });
    } else {
      hideLoader();
      renderOverlayModal('Error', 'Form incomplete', false);
    }
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