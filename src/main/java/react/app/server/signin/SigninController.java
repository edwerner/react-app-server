package react.app.server.signin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.validation.Valid;
import javax.json.JsonObject;
import javax.json.Json;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.lang.Object;
import java.lang.Thread;

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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.servlet.http.HttpSession;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.*;
import react.app.server.signup.SignupForm;
import react.app.server.account.AccountService;
import java.security.Principal;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Controller
public class SigninController {

    private static final String SIGNUP_VIEW_NAME = "home/index";

	@Autowired
	private AccountService accountService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@RequestMapping(value = "signin", method = RequestMethod.GET)
	public String signupGet(Model model) {
		model.addAttribute(new SignupForm());
        return SIGNUP_VIEW_NAME;
	}

	@RequestMapping(value = "signin", method = RequestMethod.POST)
	@ResponseBody
	public Response signinPost(@Valid @RequestBody SignupForm signupForm, Errors errors) throws JsonProcessingException {		
		Account account = signupForm.createAccount();
		accountService.signin(account);
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String email = ((UserDetails) principal).getUsername();
		UserDetails userDetails = accountService.loadUserByUsername(email);
		String formEmail = signupForm.getEmail();
		String formPassword = signupForm.getPassword();
		String repositoryEmail = "";
		String repositoryPassword = "";
		Response response = new Response();
		FieldError emailError = errors.getFieldError("email");
		FieldError passwordError = errors.getFieldError("password");
		Map validationErrors = new HashMap();
		ObjectMapper mapper = new ObjectMapper();

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
		} else if (userDetails != null) {
			repositoryEmail = userDetails.getUsername();
			repositoryPassword = userDetails.getPassword();

			if (new String(formEmail).equals(repositoryEmail) && passwordEncoder.matches(formPassword, repositoryPassword)) {
				response.setTitle("Success");
				response.setMessage("Signin successful");
				response.setSuccess(true);
				response.setErrors(null);
			} else if (new String(formEmail).equals(repositoryEmail) && !passwordEncoder.matches(formPassword, repositoryPassword)) {
				response.setTitle("Error");
				response.setMessage("Invalid password");
				response.setSuccess(false);
				response.setErrors(null);
			} else if (!new String(formEmail).equals(repositoryEmail) && passwordEncoder.matches(formPassword, repositoryPassword)) {
				response.setTitle("Error");
				response.setMessage("User not found");
				response.setSuccess(false);
				response.setErrors(null);
			}
		} else {
			response.setTitle("Error");
			response.setMessage("User not found");
			response.setSuccess(false);
			response.setErrors(null);
		}
		return response;
    }
}