package react.app.server.account;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String>  {
	Account findOne(String id);
    Account findByEmail(String email);
}