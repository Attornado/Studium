package controller;
import javax.servlet.ServletException;

public class MyServletException extends ServletException {

    public MyServletException() {
        super("There was an error in the resource access.");
    }

    public MyServletException(String message) {
        super(message);
    }

    public MyServletException(String message, Throwable cause) {
        super(message, cause);
    }

    public MyServletException(Throwable cause) {
        super(cause);
    }
}
