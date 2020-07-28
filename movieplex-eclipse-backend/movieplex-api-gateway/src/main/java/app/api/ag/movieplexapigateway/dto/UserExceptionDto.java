package app.api.ag.movieplexapigateway.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserExceptionDto {

	private String message;
	private Integer errorCode;
	private long timestamp;
	
}
