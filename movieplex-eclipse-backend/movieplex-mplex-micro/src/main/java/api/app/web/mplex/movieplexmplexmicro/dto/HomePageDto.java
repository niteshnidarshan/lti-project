package api.app.web.mplex.movieplexmplexmicro.dto;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomePageDto {

	//multiplex details
	private String multiplexId;
	private String multiplexName;
	private String location;
	
	//Screen details
	private String screenId; 
	private String screenName;
	private int screenSize; 
	private int totalSeat; 
	private Date showStartDate;
	private Date showEndDate;
	
	//Movie details
	private String movieId;
	private String movieName;
	private String category;
	private String casts;
	private String producer;
	private String director;
	private String description;
	private Double length;
	private String language;
	private String trailer;
	private String posterURL;
	private Double imdbRating;
	private Double userRating;
	private Date releaseDate;
	
}
