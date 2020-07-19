package api.app.web.screen.movieplexscreenmicro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ScreenExceptionDto {

	private String message;
	private Integer errorCode;
	private long timestamp;
}
