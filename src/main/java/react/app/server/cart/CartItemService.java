// package react.app.server.account;

// import java.util.Collections;
// import java.util.List;
// import java.util.ArrayList;
// import java.util.Arrays;

// import javax.annotation.PostConstruct;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.*;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.*;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import org.springframework.transaction.annotation.Transactional;
// import org.springframework.stereotype.Service;
// import org.springframework.context.annotation.Scope;
// import org.springframework.context.annotation.ScopedProxyMode;
// import react.app.server.response.Response;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import javax.json.JsonObject;
// import javax.json.Json;
// import java.security.Principal;
// import org.springframework.security.core.context.SecurityContextHolder;

// @Service
// @Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)
// public class CartItemService {
	
// 	@Autowired
// 	private CartRepository cartRepository;
	
// 	@Autowired
// 	private CartItemRepository cartItemRepository;

// 	@Transactional
// 	public CartItem saveCartItem(CartItem cartItem) {
// 		cartItemRepository.save(cartItem);
// 		return cartItem;
// 	}

// 	@Transactional
// 	public CartItem findByProductId(String productId) {
// 		CartItem cartItem = cartItemRepository.findByProductId(productId);
// 		return cartItem;
// 	}
// }