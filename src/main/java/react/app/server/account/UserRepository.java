package react.app.server.account;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.*;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	User findUserByUsername(String username);
}