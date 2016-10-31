// package react.app.server.account;

// // import java.security.Principal;
// import java.lang.Override;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.mongodb.core.MongoTemplate;
// import react.app.server.account.Account;
// import org.springframework.stereotype.Repository;
// import org.springframework.stereotype.Service;

// @Service
// public abstract class MongoService implements AccountRepository {

// 	@Autowired
// 	private MongoTemplate mongoTemplate;

// 	@Override
//     public Account findOne(String id) {
//     	return null;
//     }

//     @Override
//     public Account findByEmail(String email) {
//     	return null;
//     }

//     @Override
//     public Account save(Account account) { 
//     	if (!mongoTemplate.collectionExists(Account.class)) {
//             mongoTemplate.createCollection(Account.class);
//         }       
//         mongoTemplate.insert(account, "accounts");
//         mongoTemplate.save(account);
//         return account;
//     }

//     @Override
//     public Account insert(Account account) {
//     	return account;
//     }
// }
