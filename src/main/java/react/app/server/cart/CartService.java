package react.app.server.account;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import react.app.server.response.Response;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.json.JsonObject;
import javax.json.Json;
import java.security.Principal;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.Iterator;

@Service
@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CartService {
	
	@Autowired
	private CartRepository cartRepository;
	
	// @Autowired
	// private CartItemRepository cartItemRepository;

	private Cart cart;

	// @Transactional
	// public Cart saveCart(Cart cart) {
	// 	cartRepository.save(cart);
	// 	return cart;
	// }

	// @Transactional
	// public CartItem saveCartItem(CartItem cartItem) {
	// 	cartItemRepository.save(cartItem);
	// 	return cartItem;
	// }

	@Transactional
	public Cart findOrCreateCart() {
		Principal principal = SecurityContextHolder.getContext().getAuthentication();
		Cart cart = null;
		if (principal != null) {
			cart = cartRepository.findByEmail(principal.getName());
			if (cart == null) {
				List<String> cartItemList = new ArrayList<String>();
				cart = new Cart(principal.getName());
				cart.setCartItemList(cartItemList);
				cartRepository.save(cart);
			}
		}
		return cart;
	}

	@Transactional
	public List<String> getCartItems() {
		List<String> cartItemList = findOrCreateCart().getCartItemList();
		return cartItemList;
	}

	@Transactional
	public List<String> addCartItem(String productId) {
		List<String> cartItemList = getCartItems();
		if (!cartItemList.contains(productId)) {
			cartItemList.add(productId);
		}
		Cart cart = findOrCreateCart();
		cart.setCartItemList(cartItemList);
		cartRepository.save(cart);
		return cartItemList;
	}

	@Transactional
	public List<String> removeCartItem(String productId) {
		List<String> cartItemList = getCartItems();

		Iterator<String> i = cartItemList.iterator();
		while (i.hasNext()) {
		   String id = i.next();
		  	if (new String(id).equals(productId)) {
		    	i.remove();
		  	}
		}

		Cart cart = findOrCreateCart();
		cart.setCartItemList(cartItemList);
		cartRepository.save(cart);
		return cartItemList;
	}
}
