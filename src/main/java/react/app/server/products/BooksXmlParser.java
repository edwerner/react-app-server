package react.app.server.products;

import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.StringBuilder;
import java.net.URL;

public class BooksXmlParser {

	public static void main(String[] args) throws Exception {
		parseBooksXml("history");
	}
	
	public static String parseBooksXml(String term) throws IOException {
		URL url = new URL("https://www.goodreads.com/search/index.xml?key=yoFHa4POPX1HEXFtf4ow&q=" + term);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setRequestMethod("GET");
		connection.setRequestProperty("Content-Type", "application/xml");
		
		BufferedReader br = new BufferedReader(new InputStreamReader((connection.getInputStream())));
		StringBuilder sb = new StringBuilder();
		String output;
		while ((output = br.readLine()) != null) {
  			sb.append(output);
		}
		System.out.println(sb.toString());
		return sb.toString();
	}
}