package api.app.web.mplex.movieplexmplexmicro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MultiplexExceptionDto {
	
	private String message;
	private Integer errorCode;
	private long timestamp;
	
}
