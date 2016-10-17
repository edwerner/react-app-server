package react.app.server.error;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import com.google.common.base.Throwables;

import react.app.server.response.Response;
import org.springframework.web.bind.annotation.ResponseBody;

import react.app.server.response.Response;

/**
 * General error handler for the application.
 */
@ControllerAdvice
class ExceptionHandler {

	/**
	 * Handle exceptions thrown by handlers.
	 */
	@ResponseBody
	@org.springframework.web.bind.annotation.ExceptionHandler(value = Exception.class)	
	public String exception(Exception exception, WebRequest request) throws JsonProcessingException {
//		ModelAndView modelAndView = new ModelAndView("home/index");
//		modelAndView.addObject("errorMessage", Throwables.getRootCause(exception));
		
		Response response = new Response();
		ObjectMapper mapper = new ObjectMapper();
		response.setTitle("Error");
		response.setMessage("Something went wrong");
		response.setSuccess(false);
		String errorString = mapper.writeValueAsString(exception.getCause().getMessage());
		response.setErrors(errorString);
		String responseString = mapper.writeValueAsString(response);
		return responseString;
	}
}