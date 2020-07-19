package api.app.web.movie.movieplexmoviemicro.service;

import java.util.List;

import api.app.web.movie.movieplexmoviemicro.document.MovieDetail;
import api.app.web.movie.movieplexmoviemicro.dto.MovieDetailDto;

public interface MovieService {

	public MovieDetailDto addMovie(MovieDetail movieDetail);
	public MovieDetailDto modifyMovie(MovieDetailDto dto);
	public boolean deleteMovie(String movieId);
	public MovieDetailDto getMovieById(String movieId);
	public List<MovieDetailDto> getAllMovie();
	public MovieDetailDto getMovieByName(String name);
	public MovieDetailDto updateMoviePoster(String movieId, String fileName);
	//getAllRunningMultiplexes()
	
}
