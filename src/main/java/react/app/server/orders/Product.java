package react.app.server.orders;

import java.time.ZonedDateTime;

import javax.persistence.*;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.UUID;

import javax.persistence.PrePersist;
import javax.persistence.ManyToOne;
import org.hibernate.validator.constraints.Length;
import javax.persistence.Column;

@SuppressWarnings("serial")
@Entity
@Table(name = "product")
public class Product implements java.io.Serializable {

	@Id
	private String id;
	private String title;
	private String subtitle;
	private String author;
	private String isbn;
	private String publishDate;
	private String language;
	private String image;
	private String price;
	@Column(length = 3000)
	private String description;
	private String genre;
	private String pageCount;
	private String publisher;

    public Product() {

	}
	
	public Product(
		String title,
		String subtitle,
		String author, 
		String isbn, 
		String publishDate,
		String language,
		String image,
		String price,
		String description,
		String genre,
		String pageCount,
		String publisher) {
		this.title = title;
		this.subtitle = subtitle;
		this.author = author;
		this.isbn = isbn;
		this.publishDate = publishDate;
		this.language = language;
		this.image = image;
		this.price = price;
		this.description = description;
		this.genre = genre;
		this.pageCount = pageCount;
		this.publisher = publisher;
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

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getAuthor() {
		return author;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setPublishDate(String publishDate) {
		this.publishDate = publishDate;
	}

	public String getPublishDate() {
		return publishDate;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getLanguage() {
		return language;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getImage() {
		return image;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getPrice() {
		return price;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getGenre() {
		return genre;
	}

	public void setTitle(String title) {
		this.title = title;
	}

    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

    public String getPageCount() {
		return pageCount;
	}

	public void setPageCount(String pageCount) {
		this.pageCount = pageCount;
	}

    public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

    public String getSubtitle() {
		return subtitle;
	}

	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}
}
