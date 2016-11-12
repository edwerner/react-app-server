package react.app.server.account;

import java.time.ZonedDateTime;

import javax.persistence.*;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;

import javax.persistence.PrePersist;

import javax.persistence.Embeddable;

@SuppressWarnings("serial")
@Entity
@Table(name = "cartitem")
@Embeddable
public class CartItem implements java.io.Serializable {

	@Id
	private String id;

	@Column(unique = true)
	private String productId;

	private Instant created;

    protected CartItem() {

	}
	
	public CartItem(String productId) {
		this.productId = productId;
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

    public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public Instant getCreated() {
		return created;
	}
}
