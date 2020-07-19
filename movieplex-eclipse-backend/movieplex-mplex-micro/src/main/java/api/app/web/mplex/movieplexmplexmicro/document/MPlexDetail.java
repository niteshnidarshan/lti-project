package api.app.web.mplex.movieplexmplexmicro.document;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import api.app.web.mplex.movieplexmplexmicro.dto.ScreenDetailDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MPlexDetail {

	@Id
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
