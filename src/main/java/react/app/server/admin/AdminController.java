package react.app.server.admin;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.PathVariable;


import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import javax.persistence.ManyToOne;
import javax.servlet.http.HttpServletRequest;

import java.io.FileReader;
import java.io.IOException;
import java.text.ParseException;
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
// import javax.json.JsonObject;
// import javax.json.Json;
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

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import org.json.simple.parser.JSONParser;
import javax.xml.transform.Transformer;
import java.lang.Exception;
import org.apache.commons.lang3.StringEscapeUtils;
import java.io.InputStream;
import java.util.Arrays;
import react.app.server.cart.CartService;
import react.app.server.cart.Cart;
import react.app.server.orders.Order;
import react.app.server.orders.OrdersService;

@Controller
public class AdminController {

    @Autowired
    private OrdersService ordersService;
    
    @RequestMapping(value = "allorders", method = RequestMethod.GET)
    @ResponseBody  
    // @ResponseStatus(value = HttpStatus.OK)
    // @Secured({"ROLE_USER", "ROLE_ADMIN"})
    public String adminGet(Principal principal) throws JsonProcessingException {
        List<Order> ordersList = null;
        String orders = "";
        ObjectMapper mapper = new ObjectMapper();
        if (principal != null) {
            ordersList = ordersService.findOrders();
            orders = mapper.writeValueAsString(ordersList);
        }
        return orders;
    }
}