var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var cors = require('cors');
var UserDao = require('./database/javascripts/user-dao');
var ProductDao = require('./database/javascripts/product-dao');
var CartDao = require('./database/javascripts/cart-dao');
var Cart = require('./database/javascripts/cart');
var passport = require('passport');
var expressSession = require('express-session');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var mung = require('express-mung');
var PropertiesReader = require('properties-reader');
var config = PropertiesReader('./config/config.ini');
var promisify = require('promisify-node');
var token = null;
var Product = require('./database/javascripts/product');
var Products = require('./database/json/products');
var jsonfile = require('jsonfile');

UserDao.initialize();

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser(config.get('session.cookie_secret')));
app.use(expressSession({
  secret: config.get('session.cookie_secret'),
  name: config.get('session.cookie_name'),
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
// app.use(require('./public/javascripts/new-user'));

// app.use('/register', register);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use(passport.initialize());
app.use(passport.session());

app.use(function(err, req, res, next) {
  console.log(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
}

app.get('/shop', function(req, res) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.get('session.cookie_secret'), function(err, decoded) {      
      if (err) {
        return err;
      } else {
        return res.status(200).json({
          title: 'Authentication Success',
          message: 'You have successfully logged in',
          success: true
        });
      }
    });
  } else {
    return res.status(401).json({
      title: 'Authentication Failure',
      message: 'You must be logged in to shop',
      success: false
    });
  }
});

app.get('/products', function(req, res) {
  Product.find({}, function(err, products) {
    if (err) return err;
    return res.send(JSON.stringify(products));
  });
});

app.post('/cart', function(req, res) {
  var cartItem = {
    product_id: req.body.product_id,
    quantity: req.body.quantity
  };
  CartDao.updateOrCreateCartItem(cartItem);
  var cart = CartDao.getCurrentCart();
  var promise = promisify(cart.save());
  promise.then(function() {
    return res.status(200).json({
      title: 'Success',
      message: 'Product added to cart',
      success: true,
      token: token
    });
  }).catch(function(error) {
    throw error;
  });
});

app.post('/login',
function(req, res, next) {
  passport.authenticate('login',
  {session: true},
  function(err, user, info) {
    if (user) {
      if (user.new_user) {
        return res.status(401).json({
          title: 'Invalid Password',
          message: 'Password is incorrect',
          success: false
        });
      } else {
        CartDao.setCurrentUserId(user._id);
        Cart.find({user_id: user._id}, function(err, cart) {
          if (cart.length) {
            CartDao.setCurrentCart(cart);
          } else {
            var newCart = CartDao.createCart();
            CartDao.setCurrentCart(newCart);
          }
        });
        var token = jwt.sign(user, config.get('session.cookie_secret'), {
          expiresIn: 1440 // expires in 24 hours
        });
        return res.status(200).json({
          title: 'Authentication successful',
          message: 'You are currently logged in',
          success: true,
          token: token
        });
      }
    } else {
      return res.status(401).json({
        title: 'User Not Found',
        message: 'There is no registered user with that username',
        success: false
      });
    }
  })(req, res, next);
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
app.post('/register', 
function(req, res, next) {
  passport.authenticate('register',
  {session: true},
  function(err, user, info) {
    // if (err) throw err;
    if (user) {
      if (user.new_user == true) {
        user.new_user == false;
        var promise = promisify(user.save());
        token = jwt.sign(user, config.get('session.cookie_secret'), {
          expiresIn: 1440 // expires in 24 hours
        });
        promise.then(function() {
          return res.status(200).json({
            title: 'New user created',
            message: 'Welcome ' + req.body.username,
            success: true,
            token: token
          });
        }).catch(function(error) {
          throw error;
        });
      }
      else {
        return res.status(401).json({
          title: 'User already exists',
          message: 'Username taken',
          success: false
        });
      }
    }
    else {
      return res.status(401).json({
        title: 'Passwords do not match',
        message: 'Please enter a valid password',
        success: false
      });
    }
  })(req, res, next);
});

module.exports = app;