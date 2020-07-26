package app.api.ag.movieplexapigateway.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MPlexDetailDto {

	private String multiplexId;
	private String name;
	private String location;
	private List<ScreenDetailDto> screenDetailList;
	private int numberOfScreens;
	private String associatedUserId;
	public boolean isAlive;
	private Date mPlexCreateTimeStamp;
	private Date mPlexModifiedTimeStamp;
	
}
