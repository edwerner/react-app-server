package react.app.server.orders;

import java.time.ZonedDateTime;

import javax.persistence.*;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;
import java.util.List;

import javax.persistence.PrePersist;
import javax.persistence.ElementCollection;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;
// import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.JoinColumn;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@SuppressWarnings("serial")
@Entity
@Table(name = "submittedorder")
public class Order implements java.io.Serializable {

	@Id
	private String id;

	private String accountId;

	private Instant created;

	@Cascade({CascadeType.ALL})
    @ElementCollection(fetch = FetchType.EAGER, targetClass = String.class)
	private List<String> productList;

    protected Order() {

	}
	
	public Order(String accountId) {
		this.accountId = accountId;
		this.created = Instant.now();
	}

	@PrePersist
	private void ensureId(){
	    this.setId(UUID.randomUUID().toString());
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getId() {
		return id;
	}

    public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public Instant getCreated() {
		return created;
	}

	public void setProductList(List<String> productList) {
		this.productList = productList;
	}

	public List<String> getProductList() {
		return this.productList;
	}
}
