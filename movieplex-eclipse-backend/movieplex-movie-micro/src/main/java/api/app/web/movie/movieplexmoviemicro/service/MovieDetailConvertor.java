package api.app.web.movie.movieplexmoviemicro.service;
 
import org.springframework.stereotype.Component;

import api.app.web.movie.movieplexmoviemicro.document.MovieDetail;
import api.app.web.movie.movieplexmoviemicro.dto.MovieDetailDto;

@Component
public class MovieDetailConvertor {
	
	public MovieDetail convertDtoToOriginal(MovieDetailDto dto) {
		return new MovieDetail(dto.getMovieId(), dto.getName(), dto.getCategory(), dto.getCasts(), dto.getProducer(), dto.getDirector(), dto.getDescription(), dto.getLength(), dto.getLanguage(), dto.getTrailer(), dto.getPosterURL(), dto.getImdbRating(), dto.getUserRating(), dto.getReleaseDate(), dto.getMovieAddedBy(), dto.getIsAlive(), dto.getMovieCreationTimeStamp(), dto.getMovieLastModifiedTimeStamp());
	}
	
	public MovieDetailDto convertOriginalToDto(MovieDetail obj) {
		return new MovieDetailDto(obj.getMovieId(), obj.getName(), obj.getCategory(), obj.getCasts(), obj.getProducer(), obj.getDirector(), obj.getDescription(), obj.getLength(), obj.getLanguage(), obj.getTrailer(), obj.getPosterURL(), obj.getImdbRating(), obj.getUserRating(), obj.getReleaseDate(), obj.getMovieAddedBy(), obj.getIsAlive(), obj.getMovieCreationTimeStamp(), obj.getMovieLastModifiedTimeStamp());
	}

}
