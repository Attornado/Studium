package model;
import javax.servlet.ServletException;

public class DataAccessException extends ServletException {

    public DataAccessException(){

        super("There was an exception in the data access process.");
    }

    public DataAccessException(String message) {
        super(message);
    }

    public DataAccessException(String message, Throwable rootCause) {

        super(message, rootCause);
    }

    public DataAccessException(Throwable rootCause) {

        super(rootCause);
    }
}
