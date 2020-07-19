package api.app.web.user.movieplexusermicro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserExceptionDto {

	private String message;
	private Integer errorCode;
	private long timestamp;
	
}
