package react.app.server.signup;

import javax.validation.Valid;
import javax.json.JsonObject;
import javax.json.Json;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.http.MediaType;
import org.springframework.validation.ObjectError;
import org.springframework.validation.FieldError;
import org.springframework.security.core.Authentication;
// import org.springframework.http.HttpRequest;

import react.app.server.account.*;
import react.app.server.support.web.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import react.app.server.response.Response;
import react.app.server.account.AccountService;
import java.lang.System;
import java.lang.Object;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.servlet.http.HttpSession;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import java.security.Principal;
import org.springframework.security.core.context.SecurityContextHolder;
import react.app.server.orders.ProductsService;
import react.app.server.orders.Product;
import java.util.List;
// import react.app.server.config.MongoDao;


@Controller
public class CartController {

    private static final String SIGNUP_VIEW_NAME = "home/index";

	@Autowired
	private CartService cartService;

	// @Autowired
	// private CartItemService cartItemService;

	@Autowired
	private ProductsService productsService;
	
	// @RequestMapping(value = "signup", method = RequestMethod.GET)
	// public String signupGet(Model model) {
	// 	model.addAttribute(new SignupForm());
 //        return SIGNUP_VIEW_NAME;
	// }
	
	@RequestMapping(value = "cart", method = RequestMethod.GET)
	@ResponseBody
	public String cartItemGet() throws JsonProcessingException {
		Cart cart = cartService.findOrCreateCart();
		ObjectMapper mapper = new ObjectMapper();
		String cartItemString = mapper.writeValueAsString(cart);
		System.out.println(cartItemString);

		return cartItemString;
	}
	
	// @RequestMapping(value = "cartitemcreate", method = RequestMethod.GET)
	// @ResponseBody
	// public String createCartItemGet() throws JsonProcessingException {
		
	// 	List<Product> productList = productsService.getProductList();

	// 	for (Product product : productList) {
	// 		CartItem cartItem = new CartItem(product.getId());
	// 		cartItemService.saveCartItem(cartItem);
	// 	}
	// 	return "saved";
	// }
	
	@RequestMapping(value = "cartitemadd", method = RequestMethod.POST)
	@ResponseBody
	public String addCartItemPost(@Valid @RequestBody CartItem cartItem, Errors errors) throws JsonProcessingException {
		List<String> cartItemList = cartService.saveCart(cartItem.getProductId());
		ObjectMapper mapper = new ObjectMapper();
		String cartItemString = mapper.writeValueAsString(cartItemList);
		return cartItemString;
	}
	
	@RequestMapping(value = "cartitemremove", method = RequestMethod.POST)
	@ResponseBody
	public String removeCartItemPost(@Valid @RequestBody CartItem cartItem, Errors errors) throws JsonProcessingException {
		CartItem cartItemToRemove = cartService.removeCartItem(new CartItem(cartItem.getProductId()));
		ObjectMapper mapper = new ObjectMapper();
		String cartItemString = mapper.writeValueAsString(cartItemToRemove);
		return cartItemString;
	}
}
