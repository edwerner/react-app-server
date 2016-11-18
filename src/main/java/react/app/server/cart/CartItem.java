package react.app.server.cart;

import java.time.ZonedDateTime;

import javax.persistence.*;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;

import javax.persistence.PrePersist;

import javax.persistence.Embeddable;

public class CartItem {

	private String productId;

	private Instant created;

    protected CartItem() {

	}
	
	public CartItem(String productId) {
		this.productId = productId;
	}

    public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}
}
