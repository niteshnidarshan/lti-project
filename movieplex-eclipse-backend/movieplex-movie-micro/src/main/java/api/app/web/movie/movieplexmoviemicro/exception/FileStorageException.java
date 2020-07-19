package api.app.web.movie.movieplexmoviemicro.exception;

public class FileStorageException extends RuntimeException{

	public FileStorageException(String message) {
		super(message);
	}
	
	public FileStorageException(String message, Throwable cause) {
		super(message, cause);
	}
	
}
