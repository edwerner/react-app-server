package react.app.server.products;

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
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import org.json.simple.parser.JSONParser;

import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.Characters;
import javax.xml.stream.events.EndElement;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;
import javax.xml.transform.Transformer;
import java.lang.Exception;
import org.apache.commons.lang3.StringEscapeUtils;
import java.io.InputStream;
import java.util.Arrays;

@Controller
public class ProductsController {

	@Autowired
	private ProductsService productsService;

	List<Product> productList;

	public List<Product> getProductList() {
		return productList;
	}

	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}

	@RequestMapping(value = "products", method = RequestMethod.GET)
	@ResponseBody
	public List<Product> productsGet(Principal principal, HttpServletRequest request)
			throws IOException, XMLStreamException {
		List<Product> productList = productsService.getProductList();
		parseXML();
		return productList;
	}

	@RequestMapping(value = "products/{query}", method = RequestMethod.GET)
	@ResponseBody
	public String productsGet(Principal principal, HttpServletRequest request, @PathVariable String query)
			throws IOException {

		String url = "https://www.googleapis.com/books/v1/volumes?q=" + query;
		String genre = query.replace("+", " ");

		URL obj = new URL(url);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		con.addRequestProperty("User-Agent", "Mozilla/4.76");
		con.setRequestMethod("GET");

		int responseCode = con.getResponseCode();
		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
		String inputLine;
		StringBuffer response = new StringBuffer();

		while ((inputLine = in.readLine()) != null) {
			response.append(inputLine);
		}
		in.close();

		String productsString = response.toString();

		JSONObject productsJsonObject = null;
		JSONArray booksJsonArray = null;

		try {
			productsJsonObject = (JSONObject) new JSONParser().parse(productsString);
			booksJsonArray = (JSONArray) productsJsonObject.get("items");
		} catch (Exception e) {
			e.printStackTrace();
		}

		JSONObject bookObject = null;
		JSONObject bookInfo = null;
		JSONObject saleInfo = null;
		JSONObject descriptionInfo = null;
		List<Product> productList = new ArrayList<Product>();

		for (int i = 0; i < booksJsonArray.size(); i++) {
			bookObject = (JSONObject) booksJsonArray.get(i);
			bookInfo = (JSONObject) bookObject.get("volumeInfo");
			saleInfo = (JSONObject) bookObject.get("saleInfo");
			descriptionInfo = (JSONObject) bookObject.get("searchInfo");

			String title = "";
			String author = "";
			String isbn = "";
			String publishDate = "";
			String language = "";
			String image = "";
			String price = "";
			String description = "";
			String pageCount = "";
			String publisher = "";
			String subtitle = "";

			for (Iterator iterator = bookInfo.keySet().iterator(); iterator.hasNext();) {
				String key = (String) iterator.next();
				if (bookInfo.get(key) instanceof JSONObject) {
					title = (String) bookInfo.get("title");
					subtitle = (String) bookInfo.get("subtitle");
					JSONArray authorJsonArray = (JSONArray) bookInfo.get("authors");
					String[] authors;
					if (authorJsonArray != null) {
						authors = jsonArrayToStringArray(authorJsonArray);
						author = Arrays.toString(authors).replaceAll("\\[", "").replaceAll("\\]", "");
					}
					JSONArray isbnJsonArray = (JSONArray) bookInfo.get("industryIdentifiers");
					String[] isbns;
					JSONObject isbnJsonObject;
					if (isbnJsonArray != null) {
						isbnJsonObject = (JSONObject) isbnJsonArray.get(0);
						isbn = (String) isbnJsonObject.get("identifier");
					}
					JSONObject imageJsonObject = (JSONObject) bookInfo.get("imageLinks");
					image = (String) imageJsonObject.get("thumbnail");
					// description = (String) bookInfo.get("description");

					if (descriptionInfo != null) {
						description = (String) descriptionInfo.get("textSnippet");
					}
					publishDate = (String) bookInfo.get("publishedDate");
					language = (String) bookInfo.get("language");
					pageCount = bookInfo.get("pageCount").toString();
					publisher = (String) bookInfo.get("publisher");
				}
			}
			for (Iterator saleInfoIterator = saleInfo.keySet().iterator(); saleInfoIterator.hasNext();) {
				String key = (String) saleInfoIterator.next();
				if (saleInfo.get(key) instanceof JSONObject) {
					JSONObject listPriceJsonObject = (JSONObject) saleInfo.get("listPrice");
					price = listPriceJsonObject.get("amount").toString();
				}
			}
			Product product = new Product(title, subtitle, author, isbn, publishDate, language, image, price,
					description, genre, pageCount, publisher);
			productList.add(product);
		}
		setProductList(productList);
		return "hello";
	}

	@RequestMapping(value = "productsave", method = RequestMethod.GET)
	@ResponseBody
	public String productsSave() {
		for (Product product : getProductList()) {
			productsService.save(product);
		}
		return "save";
	}

	public String[] jsonArrayToStringArray(JSONArray jsonArray) {
		int arraySize = jsonArray.size();
		String[] stringArray = new String[arraySize];

		for (int i = 0; i < arraySize; i++) {
			stringArray[i] = (String) jsonArray.get(i);
		}

		return stringArray;
	}

	public String getBooksXml() throws IOException {

		String title = "";
		String author = "";
		String isbn = "";
		String publishDate = "";
		String language = "";
		String image = "";
		String price = "";
		String description = "";
		String pageCount = "";
		String publisher = "";
		String subtitle = "";

		URL url = new URL("https://www.goodreads.com/search/index.xml?key=yoFHa4POPX1HEXFtf4ow&q=history");
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("GET");
		connection.setRequestProperty("Content-Type", "application/xml");

		// BufferedReader br = new BufferedReader(new
		// InputStreamReader((connection.getInputStream())));
		StringBuilder sb = new StringBuilder();
		// String output;
		// while ((output = br.readLine()) != null) {
		// sb.append(output);
		// }
		// System.out.println(sb.toString());
		return sb.toString();
	}

	// private static List<Product> parseXML() throws IOException,
	// XMLStreamException {
	//
	// URL url = new
	// URL("https://www.goodreads.com/search/index.xml?key=yoFHa4POPX1HEXFtf4ow&q=history");
	// HttpURLConnection connection = (HttpURLConnection) url.openConnection();
	// connection.setRequestMethod("GET");
	// connection.setRequestProperty("Content-Type", "application/xml");
	//
	// List<Product> bookList = new ArrayList<>();
	//
	// XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
	//
	// BufferedReader br = new BufferedReader(new
	// InputStreamReader((connection.getInputStream())));
	//
	// XMLEventReader eventReader = xmlInputFactory.createXMLEventReader(br);
	//
	// Product product = null;
	//
	// while (eventReader.hasNext()) {
	// XMLEvent event = eventReader.nextEvent();
	//
	// //reach the start of an item
	// if (event.isStartElement()) {
	//
	// StartElement startElement = event.asStartElement();
	//
	// if (startElement.getName().getLocalPart().equals("work")) {
	//
	//
	// StartElement searchElement = startElement.asStartElement();
	//
	//// String id = searchElement.getName().getLocalPart();
	//
	// if (searchElement.getName().getLocalPart().equals("average_rating")) {
	// System.out.println(" average_rating *******************");
	// }
	//
	//// Attribute idAttr = startElement.getAttributeByName(new
	// QName("average_rating"));
	////
	//// System.out.println(idAttr + " ID *******************");
	//
	//// Iterator<Attribute> attributes = startElement.getAttributes();
	//// while (attributes.hasNext()) {
	//// Attribute attribute = attributes.next();
	//// System.out.println(attribute + " *******************");
	////// if (attribute.getName().toString().equals("id")) {
	////// System.out.println("id = " + attribute.getValue());
	////// }
	//// }
	// }
	// }
	// }
	//
	//
	//// Product book = null;
	//// XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
	//// try {
	////
	//// BufferedReader br = new BufferedReader(new
	// InputStreamReader((connection.getInputStream())));
	//// // StringBuilder sb = new StringBuilder();
	//// // String output;
	//// // while ((output = br.readLine()) != null) {
	//// // sb.append(output);
	//// // }
	////
	//// XMLEventReader xmlEventReader = xmlInputFactory.createXMLEventReader(br);
	//// while (xmlEventReader.hasNext()) {
	////
	//// XMLEvent event = xmlEventReader.nextEvent();
	//// if (event.isStartElement()) {
	////
	//// StartElement element = (StartElement) event;
	////
	//// Iterator<Attribute> iterator = element.getAttributes();
	//// while (iterator.hasNext()) {
	//// Attribute attribute = iterator.next();
	//// System.out.println("****** " + attribute.get + " ********");
	//// }
	//// }
	//// }
	////
	//// } catch (FileNotFoundException | XMLStreamException e) {
	//// e.printStackTrace();
	//// }
	//
	// return bookList;
	// }

	private static List<Product> parseXML() throws IOException, XMLStreamException {

		URL url = new URL("https://www.goodreads.com/search/index.xml?key=yoFHa4POPX1HEXFtf4ow&q=history");
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("GET");
		connection.setRequestProperty("Content-Type", "application/xml");

		List<Product> bookList = new ArrayList<>();

		BufferedReader reader = new BufferedReader(new InputStreamReader((connection.getInputStream())));
		
		
		XMLInputFactory factory = XMLInputFactory.newInstance();


		try {
		    XMLEventReader eventReader = factory.createXMLEventReader(reader);
		    
		    while(eventReader.hasNext()){

		        XMLEvent event = eventReader.nextEvent();

		        if(event.getEventType() == XMLStreamConstants.START_ELEMENT) {
		            StartElement startElement = event.asStartElement();
		            System.out.println(startElement.getName().getLocalPart());
		        } else if (event.getEventType() == XMLStreamConstants.CHARACTERS) {		            
		            Characters characterElement = event.asCharacters();
		            System.out.println("Character: " + characterElement.getData());
		        }
		        //handle more event types here...
		    }
		    
		} catch (XMLStreamException e) {
		    e.printStackTrace();
		}

//		XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
//	    XMLEventReader eventReader = xmlInputFactory.createXMLEventReader(br);
//	    XMLEvent event;
//
//	    while (eventReader.hasNext()){
//	        event = eventReader.nextEvent();
//
//	        if (event.isStartElement()) {
//	            String elementName = event.asStartElement().getName().getLocalPart();
//	            System.out.println("Element Name: " + elementName);
//	            Iterator<Attribute> iterator = event.asStartElement().getAttributes();
//	            while (iterator.hasNext()) {
//	                Attribute attribute = iterator.next();
//	                String value = attribute.getValue();
//	                String name = attribute.getName().toString();
//	                System.out.println("\t" + name + " " + value);
//	            }
//	        }
//	    }
		return bookList;
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
			System.out.println(errorString);
		}

		System.out.println("\nSending 'GET' request to URL : " + url);
		System.out.println("Response Code : " + responseCode);

		BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
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