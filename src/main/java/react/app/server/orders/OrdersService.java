package react.app.server.orders;

import java.util.Collections;

import javax.annotation.PostConstruct;
import java.util.List;

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
import java.lang.System;

@Service
@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)
public class OrdersService {
	
	@Autowired
	private OrdersRepository ordersRepository;

	@Transactional
	public Order save(Order order) {
		ordersRepository.save(order);
		return order;
	}

	@Transactional
	public List<Order> findOrders() {
		return ordersRepository.findAll();
	}

	@Transactional
	public Order findOrCreateOrder(String accountId) {
		Order order = ordersRepository.findByAccountId(accountId);
		if (order == null) {
			order = new Order(accountId);
		}
		return order;
	}
}
