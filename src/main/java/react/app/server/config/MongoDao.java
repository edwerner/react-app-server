// package react.app.server.config;

// import react.app.server.config.SpringMongoConfig;
// import react.app.server.config.MongoConfig;
// import react.app.server.account.Account;
// import org.springframework.context.ApplicationContext;
// // import org.springframework.context.annotation.AnnotationConfigApplicationContext;
// import org.springframework.data.mongodb.core.MongoOperations;
// import org.springframework.data.mongodb.core.query.Criteria;
// import org.springframework.data.mongodb.core.query.Query;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.mongodb.core.MongoTemplate;
// import java.lang.System;
// import react.app.server.account.AccountService;
 
// import com.mongodb.MongoClient;
 
// public class MongoDao {

// 	@Autowired
// 	private AccountService accountService;

// 	public void saveAccount() {
// 		// // ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringMongoConfig.class);
// 		// // MongoOperations mongoOperation = (MongoOperactions) context.getBean("getMongoTemplate");
// 		Account account = new Account("email25@email.com", "asdf", "ROLE_USER");
// 		accountService.save(account);
// 		// // mongoOperation.save(account, "account");
// 		// // System.out.println("SAVED NEW ACCOUNT TO MONGODB");


//   //       if (!mongoTemplate.collectionExists(Account.class)) {
//   //           mongoTemplate.createCollection(Account.class);
//   //       }       
//   //       // customer.setId(UUID.randomUUID().toString());
//   //       mongoTemplate.insert(account, "accounts");
//   //       mongoTemplate.save(account);
// 	}

// }