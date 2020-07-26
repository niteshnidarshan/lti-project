package app.api.ag.movieplexapigateway.dto;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScreenDetailDto {

	private String screenId;
	private String multiplexId;
	private String screenName;
	private int screenSize; 
	private int totalSeat;
	private String movieId;
	private Date showStartDate;
	private Date showEndDate;
	private boolean isScreenAlive;
	private Date showAllocationDate;
	private Date showLastModified;
	
}
