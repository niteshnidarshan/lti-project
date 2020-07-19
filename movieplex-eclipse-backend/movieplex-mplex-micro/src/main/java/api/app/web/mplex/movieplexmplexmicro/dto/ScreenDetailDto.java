package api.app.web.mplex.movieplexmplexmicro.dto;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ScreenDetailDto {

	private String screenId;
	private String multiplexId;
	private String screenName;
	private int screenSize; 
	private int totalSeat;
	private String movieId;
	private MovieDetailDto movieDetail;
	private Date showStartDate;
	private Date showEndDate;
	private boolean isScreenAlive;
	private Date showAllocationDate;
	private Date showLastModified;
	
}
