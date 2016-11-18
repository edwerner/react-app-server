package react.app.server.cart;

import java.time.ZonedDateTime;

import javax.persistence.*;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;

import java.util.List;

import javax.persistence.PrePersist;

import javax.persistence.ElementCollection;

// import javax.persistence.CascadeType;
// import org.hibernate.metamodel.binding.CascadeType;ss
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@SuppressWarnings("serial")
@Entity
@Table(name = "cart")
public class Cart implements java.io.Serializable {

	@Id
	private String id;

	@Column(unique = true)
	private String email;

	@Cascade({CascadeType.ALL})
	@ElementCollection(fetch = FetchType.EAGER, targetClass = String.class)
	private List<String> cartItemList;

	private Instant created;

    protected Cart() {

	}
	
	public Cart(String email) {
		this.email = email;
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

    public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setCartItemList(List<String> cartItemList) {
		this.cartItemList = cartItemList;
	}

	public List<String> getCartItemList() {
		return cartItemList;
	}

	public Instant getCreated() {
		return created;
	}
}