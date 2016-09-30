package react.app.server.signup;

import javax.validation.Valid;
import javax.json.JsonObject;
import javax.json.Json;
import java.util.HashMap;
import java.util.Map;

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

import react.app.server.account.*;
import react.app.server.support.web.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import react.app.server.response.Response;
import javax.servlet.http.HttpServletRequest;
import java.lang.System;
import java.lang.Object;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class SignupController {

    private static final String SIGNUP_VIEW_NAME = "index/home";

	@Autowired
	private AccountService accountService;
	
	@RequestMapping(value = "signup", method = RequestMethod.GET)
	public String signup(Model model) {
		model.addAttribute(new SignupForm());
        return SIGNUP_VIEW_NAME;
	}
	
	@RequestMapping(value = "signup", method = RequestMethod.POST)
	@ResponseBody
	public Response signup(@Valid @RequestBody SignupForm signupForm, Errors errors) throws JsonProcessingException {
		Account account = accountService.save(signupForm.createAccount());
		accountService.signin(account);
		Response response = new Response();

		if (errors.hasErrors()) {
			FieldError emailError = errors.getFieldError("email");
			FieldError passwordError = errors.getFieldError("password");
			Map validationErrors = new HashMap();

			if (emailError != null) {
				validationErrors.put("email", emailError.getDefaultMessage());
			}
			if (passwordError != null) {
				validationErrors.put("password", passwordError.getDefaultMessage());
			}

			ObjectMapper mapper = new ObjectMapper();

			String jsonString = mapper.writeValueAsString(validationErrors);

			System.out.println(jsonString);
			response.setTitle("Error");
			response.setMessage("Form has validation errors");
			response.setSuccess(false);
			response.setErrors(jsonString);
		} else {
			response.setTitle("Success");
			response.setMessage("Account registered successfully");
			response.setSuccess(true);
			response.setErrors(null);
		}
		return response;
	}
}
