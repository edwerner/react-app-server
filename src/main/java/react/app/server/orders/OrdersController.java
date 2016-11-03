package react.app.server.orders;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import javax.persistence.ManyToOne;
import javax.servlet.http.HttpServletRequest;

import java.io.FileReader;
import java.io.IOException;
import java.util.Iterator;
 
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
// import react.app.server.utility.CSVReader;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.System;
import java.util.List;
import java.util.ArrayList;

@Controller
public class OrdersController {

	@Autowired
	private OrdersService ordersService;

	@Autowired
	private ProductsService productsService;
	
	@RequestMapping(value = "orders", method = RequestMethod.GET)
	public String index(Principal principal, HttpServletRequest request) {
		return principal != null ? "orders/orders" : "home/index";
	}
}