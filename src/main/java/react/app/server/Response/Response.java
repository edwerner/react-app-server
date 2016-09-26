// data.title, data.message, data.success
package react.app.server.response;

public class Response {
	private String title;
	private String message;
	Boolean success;
	private String getTitle() {
		return this.title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getMessage() {
		return this.title;
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

}