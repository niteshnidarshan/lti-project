package api.app.web.movie.movieplexmoviemicro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieExceptionDto {

	private String message;
	private Integer errorCode;
	private long timestamp;
	
}
