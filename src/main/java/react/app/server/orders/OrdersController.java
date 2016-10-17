package react.app.server.orders;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class OrdersController {
	
	@RequestMapping(value = "orders", method = RequestMethod.GET)
	public String index(Principal principal) {
		return principal != null ? "orders/orders" : "home/index";
	}
}
