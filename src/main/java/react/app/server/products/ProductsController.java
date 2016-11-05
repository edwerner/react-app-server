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

@Controller
public class ProductsController {

	@Autowired
	private ProductsService productsService;
	
	@RequestMapping(value = "products", method = RequestMethod.GET)
	@ResponseBody
	public String productsGet(Principal principal, HttpServletRequest request) throws IOException {

		String url = "https://www.librarything.com/api_getdata.php?userid=timspalding&key=2652641547";

		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 		con.addRequestProperty("User-Agent", "Mozilla/4.76"); 

		// optional default is GET
		con.setRequestMethod("GET");

		//add request header
		// con.setRequestProperty("User-Agent", USER_AGENT);

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		String productsString = response.toString()
			.replace("var widgetResults = ", "")
			.replace("LibraryThing.bookAPI.displayWidgetContents(widgetResults, \"LT_Content\");", "")
			.replace("};", "}");

		JSONObject productsJsonObject = null;
		JSONObject booksJsonObject = null;

		try {
			productsJsonObject = (JSONObject) new JSONParser().parse(productsString);
			booksJsonObject = (JSONObject) productsJsonObject.get("books");
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		String isbnProductString = "";

		for (Iterator iterator = booksJsonObject.keySet().iterator(); iterator.hasNext();) {
		    String key = (String) iterator.next();
		     if (booksJsonObject.get(key) instanceof JSONObject) {
			    JSONObject booksWrapper = (JSONObject) booksJsonObject.get(key);
			    for (Iterator booksIterator = booksWrapper.keySet().iterator(); booksIterator.hasNext();) {
			    	// String booksKey = (String) booksIterator.next();
					String id = booksWrapper.get("book_id").toString();
					String tile = booksWrapper.get("title").toString();
					String author = booksWrapper.get("author_lf").toString();
					String isbn = booksWrapper.get("ISBN").toString();
					String language = booksWrapper.get("language_main").toString();
					String publicationdate = booksWrapper.get("publicationdate").toString();
					String image = StringEscapeUtils.unescapeJava(booksWrapper.get("cover").toString());
					String description = "";
					String price = "";
					String genre = "";
					isbnProductString = fetchProductByIsbn(isbn);

					JSONArray isbnJsonArray = null;

					try {
						isbnJsonArray = (JSONArray) new JSONParser().parse(isbnProductString);
					} catch(Exception e) {
						e.printStackTrace();
					} finally {
						// iterate through jsonarray
					}

					// for (Iterator isbnIterator = isbnJsonObject.keySet().iterator(); isbnIterator.hasNext();) {
					// 	String isbnPrice = isbnJsonObject.get("Price").toString();
					// 	System.out.println(isbnPrice);
					// }


					System.out.println(isbnJsonArray);
			    }
			}
		}


		return "hello";
	}

	public String fetchProductByIsbn(String isbn) throws IOException {
		String url = "http://www.barcodefinder.com/search?q=" + isbn + "&format=json";

		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
 		con.addRequestProperty("User-Agent", "Mozilla/4.76"); 

		con.setRequestMethod("GET");

		int responseCode = con.getResponseCode();
		InputStream stream = con.getErrorStream();

		String errorString = "";

		if (stream != null) {
			errorString = convertInputStreamToString(stream);
		}

		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);
		System.out.println(errorString);

		BufferedReader in = new BufferedReader(
		        new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		return response.toString();
	}

	public String convertInputStreamToString(InputStream stream) throws IOException {
		BufferedReader br = null;
		StringBuilder sb = new StringBuilder();

		String line;
		try {
			br = new BufferedReader(new InputStreamReader(stream));
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return sb.toString();
	}
}