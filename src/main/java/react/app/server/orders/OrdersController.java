package react.app.server.orders;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import javax.servlet.http.HttpServletRequest;

@Controller
public class OrdersController {
	
	@RequestMapping(value = "orders", method = RequestMethod.GET)
	public String index(Principal principal, HttpServletRequest request) {
		// String token = new HttpSessionCsrfTokenRepository().loadToken(request).getToken();
		// System.out.println("********************************");
		// System.out.println(token);
		return principal != null ? "orders/orders" : "home/index";
	}
}
