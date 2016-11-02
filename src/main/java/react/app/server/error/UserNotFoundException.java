package react.app.server.error;
import java.lang.Exception;

public class UserNotFoundException extends Exception {
      public UserNotFoundException() {}

      public UserNotFoundException(String message) {
         super(message);
      }
 }
