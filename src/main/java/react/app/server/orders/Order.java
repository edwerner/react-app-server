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
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.JoinColumn;

@SuppressWarnings("serial")
@Entity
@Table(name = "order")
public class Order implements java.io.Serializable {

	@Id
	private String id;

	// @Column(unique = true)
	private String userId;

	private Instant created;

    // @OneToMany(cascade = CascadeType.ALL, mappedBy="product")
    @ElementCollection
   	// @CollectionTable(name = "product", joinColumns = @JoinColumn(name="id"))
	private List<Product> productList;

    protected Order() {

	}
	
	public Order(String userId) {
		this.userId = userId;
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

    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Instant getCreated() {
		return created;
	}

	public void addToProductList(Product product) {
		productList.add(product);
	}
}
