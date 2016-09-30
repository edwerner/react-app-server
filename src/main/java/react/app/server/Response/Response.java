package react.app.server.response;

import com.fasterxml.jackson.annotation.JsonRawValue;

public class Response {
	public String title;
	public String message;
	public Boolean success;
	public String errors;

	private String getTitle() {
		return this.title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMessage() {
		return this.message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Boolean getSuccess() {
		return this.success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public String getErrors() {
		return this.errors;
	}
	@JsonRawValue
	public void setErrors(String errors) {
		this.errors = errors;
	}
}