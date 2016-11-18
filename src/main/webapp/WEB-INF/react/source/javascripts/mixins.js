import _ from 'underscore';
import Callbacks from './globals';

module.exports = {
    setButtonText: function(cartItem) {
	  	Callbacks.resetButtonState(cartItem);
    }
}