package react.app.server.products;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.StringBuilder;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import react.app.server.orders.Product;
import react.app.server.orders.ProductsService;

@Component
public class BooksXmlParser {
	
	private static boolean year;
    private static boolean rating;
    private static boolean title;
    private static boolean author;
    private static boolean imageUrl;
    private static boolean smallImageUrl;

	@Autowired
	private ProductsService productsService;

	public static void main(String[] args) throws Exception {}

	public ArrayList<Product> getBooksXml(String term) throws IOException, XMLStreamException {

		if (term == "") {
			term = "beethoven";
		} 	

		String encodedUrl = URLEncoder.encode(term, "UTF-8");
		URL url = new URL("https://www.goodreads.com/search/index.xml?key=yoFHa4POPX1HEXFtf4ow&q=" + encodedUrl);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("GET");
		connection.setRequestProperty("Content-Type", "application/xml");

		ArrayList<Product> bookList = new ArrayList<>();

		BufferedReader reader = new BufferedReader(new InputStreamReader((connection.getInputStream())));

		XMLInputFactory xmlInputFactory = XMLInputFactory.newInstance();
		try {
			XMLStreamReader xmlStreamReader = xmlInputFactory.createXMLStreamReader(reader);
			int event = xmlStreamReader.getEventType();
			Product book = null;
			while (true) {
				switch (event) {
				case XMLStreamConstants.START_ELEMENT:
					if (xmlStreamReader.getLocalName().equals("work")) {
						book = new Product();
					} else if (xmlStreamReader.getLocalName().equals("original_publication_year")) {
						year = true;
					} else if (xmlStreamReader.getLocalName().equals("average_rating")) {
						rating = true;
					} else if (xmlStreamReader.getLocalName().equals("title")) {
						title = true;
					} else if (xmlStreamReader.getLocalName().equals("name")) {
						author = true;
					} else if (xmlStreamReader.getLocalName().equals("image_url")) {
						imageUrl = true;
					} else if (xmlStreamReader.getLocalName().equals("small_image_url")) {
						smallImageUrl = true;
					}
					break;
				case XMLStreamConstants.CHARACTERS:
					if (year) {
						book.setYear(xmlStreamReader.getText());
						year = false;
					} else if (rating) {
						book.setRating(xmlStreamReader.getText());
						rating = false;
					} else if (title) {
						book.setTitle(xmlStreamReader.getText());
						title = false;
					} else if (author) {
						book.setAuthor(xmlStreamReader.getText());
						author = false;
					} else if (imageUrl) {
						book.setImageUrl(xmlStreamReader.getText());
						imageUrl = false;
					} else if (smallImageUrl) {
						book.setSmallImageUrl(xmlStreamReader.getText());
						smallImageUrl = false;
					}
					break;
				case XMLStreamConstants.END_ELEMENT:
					if (xmlStreamReader.getLocalName().equals("work")) {
						bookList.add(book);
					}
					break;
				}
				if (!xmlStreamReader.hasNext()) {
					for (Product b: bookList) {
						productsService.save(b);
					}
					bookList.clear();
					break;
				}
				event = xmlStreamReader.next();
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			System.out.println("Parse XML complete");
		}
		return bookList;
	}
}