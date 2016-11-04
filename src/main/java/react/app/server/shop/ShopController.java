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
import react.app.server.orders.Product;
import react.app.server.support.web.*;
import react.app.server.orders.ProductsService;

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
import com.fasterxml.jackson.core.JsonProcessingException;

@Controller
public class ShopController {

	@Autowired
	private ProductsService productsService;
	
	@RequestMapping(value = "shop", method = RequestMethod.GET)
	@ResponseBody
	public String ordersGet(Principal principal, HttpServletRequest request) throws JsonProcessingException {        
        String csvFile = "C:/Users/Edward/Desktop/reactjs/react-app-server/src/main/java/react/app/server/orders/products.csv";
        String line = "";
        try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
        	if (getProductList().isEmpty()) {
	            while ((line = br.readLine()) != null) {
	                String[] productValue = line.split(",");
	                Product product = new Product(productValue[0], productValue[1], productValue[2], productValue[3]);
	                productsService.save(product);
	            }
            }    
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
			ObjectMapper mapper = new ObjectMapper();
			String productsString = mapper.writeValueAsString(getProductList());
			return productsString;
        }
	}

	public List<Product> getProductList() {
		List<Product> productList = productsService.getProductList();
		return productList;
	}
}