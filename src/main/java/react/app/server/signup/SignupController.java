package react.app.server.signup;

import javax.validation.Valid;
import javax.json.JsonObject;
import javax.json.Json;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.http.MediaType;
import org.springframework.validation.ObjectError;
import org.springframework.validation.FieldError;
import org.springframework.security.core.Authentication;
// import org.springframework.http.HttpRequest;

import react.app.server.account.*;
import react.app.server.support.web.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import react.app.server.response.Response;
import react.app.server.account.AccountService;
import java.lang.System;
import java.lang.Object;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.servlet.http.HttpSession;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
// import react.app.server.config.MongoDao;


@Controller
public class SignupController {

    private static final String SIGNUP_VIEW_NAME = "home/index";

	@Autowired
	private AccountService accountService;
	
	@RequestMapping(value = "signup", method = RequestMethod.GET)
	public String signupGet(Model model) {
		model.addAttribute(new SignupForm());
        return SIGNUP_VIEW_NAME;
	}
	
	@RequestMapping(value = "signup", method = RequestMethod.POST)
	@ResponseBody
	public Response signupPost(@Valid @RequestBody SignupForm signupForm, Errors errors) throws JsonProcessingException {
		Account account = accountService.save(signupForm.createAccount());
		accountService.signin(account);
		FieldError emailError = errors.getFieldError("email");
		FieldError passwordError = errors.getFieldError("password");
		ObjectMapper mapper = new ObjectMapper();
		Map validationErrors = new HashMap();
		Response response = new Response();

		if (errors.hasErrors()) {
			if (emailError != null) {
				validationErrors.put("email", emailError.getDefaultMessage());
			}
			if (passwordError != null) {
				validationErrors.put("password", passwordError.getDefaultMessage());
			}
			String errorString = mapper.writeValueAsString(validationErrors);
			response.setTitle("Error");
			response.setMessage("Form has validation errors");
			response.setSuccess(false);
			response.setErrors(errorString);
		} else {
			response.setTitle("Success");
			response.setMessage("Signup successful");
			response.setSuccess(true);
			response.setErrors(null);
		}
		return response;
	}
}
