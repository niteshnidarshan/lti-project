package api.app.web.movie.movieplexmoviemicro.document;

import java.util.Date;

import org.springframework.data.annotation.Id;
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
public class MovieDetail {

	@Id
	private String movieId;
	private String name;
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
	private String movieAddedBy;
	private Boolean isAlive;
	private Date movieCreationTimeStamp;
	private Date movieLastModifiedTimeStamp;
	
}
