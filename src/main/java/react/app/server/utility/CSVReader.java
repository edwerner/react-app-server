// package react.app.server.utility;

// import java.io.BufferedReader;
// import java.io.FileReader;
// import java.io.IOException;
// import java.lang.System;

// public class CSVReader {

//     public static void main(String[] args) {
        
//         String csvFile = "C:/Users/Edward/Desktop/reactjs/react-app-server/src/main/java/react/app/server/orders/products.csv";
//         String line = "";
//         List<Product> productList = new ArrayList<Product>();

//         try (BufferedReader br = new BufferedReader(new FileReader(csvFile))) {
//             while ((line = br.readLine()) != null) {
//                 String[] productValue = line.split(",");
//                 Product product = new Product(productValue[0], productValue[1], productValue[2], productValue[3]);
//                 productsService.save(product);
//             }        
//         } catch (IOException e) {
//             e.printStackTrace();
//         }

//     }

// }