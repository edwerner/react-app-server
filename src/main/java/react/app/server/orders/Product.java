package react.app.server.orders;

import java.time.ZonedDateTime;

import javax.persistence.*;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;

import javax.persistence.PrePersist;
import javax.persistence.ManyToOne;

@SuppressWarnings("serial")
@Entity
@Table(name = "product")
public class Product implements java.io.Serializable {

	@Id
	private String id;
	private String title;
	private String image;
	private String price;
	private String description;

    protected Product() {

	}
	
	public Product(String title, String image, String price, String description) {
		this.title = title;
		this.image = image;
		this.price = price;
		this.description = description;
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

    public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

    public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

    public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
