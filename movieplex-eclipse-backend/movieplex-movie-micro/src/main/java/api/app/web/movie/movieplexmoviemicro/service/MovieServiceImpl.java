package api.app.web.movie.movieplexmoviemicro.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.app.web.movie.movieplexmoviemicro.dao.MovieRepository;
import api.app.web.movie.movieplexmoviemicro.document.MovieDetail;
import api.app.web.movie.movieplexmoviemicro.dto.MovieDetailDto;

@Service
public class MovieServiceImpl implements MovieService {

	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private MovieDetailConvertor convertor;
	
	@Override
	public MovieDetailDto addMovie(MovieDetail movieDetail) { 
		
		MovieDetailDto dto = null;
		
		MovieDetail movie = this.repository.save(movieDetail);
		
		if(movie != null)
			dto = this.convertor.convertOriginalToDto(movie);
		
		return dto;
	}

	@Override
	public MovieDetailDto modifyMovie(MovieDetailDto dto) {
		
		MovieDetail movie = this.repository.findById(dto.getMovieId()).orElse(null);
		
		movie.setCasts(dto.getCasts());
		movie.setCategory(dto.getCategory());
		movie.setDirector(dto.getDirector());
		movie.setImdbRating(dto.getImdbRating());
		movie.setIsAlive(dto.getIsAlive());
		movie.setLanguage(dto.getLanguage());
		movie.setLength(dto.getLength());
		movie.setMovieAddedBy(dto.getMovieAddedBy());
		movie.setMovieCreationTimeStamp(dto.getMovieCreationTimeStamp());
		movie.setMovieLastModifiedTimeStamp(new Date(System.currentTimeMillis()));
		movie.setName(dto.getName());
		movie.setProducer(dto.getProducer());
		movie.setReleaseDate(dto.getReleaseDate());
		movie.setTrailer(dto.getTrailer());
		//movie.setUserRating(dto.getUserRating());
		
		movie = this.repository.save(movie);
		
		MovieDetailDto movieDto = null;
		
		if(movie != null)
			movieDto = this.convertor.convertOriginalToDto(movie);
		
		return movieDto;
			
	}
	
	public MovieDetailDto updateMoviePoster(String movieId, String fileName) {
		
		MovieDetail movie = this.repository.findById(movieId).orElse(null);
		
		String existingFile = movie.getPosterURL();
		if(existingFile == null || existingFile.equals(""))
			existingFile = fileName;
		else
			existingFile = existingFile+","+fileName;
		
		movie.setPosterURL(existingFile);
		
		movie = this.repository.save(movie);
		
		MovieDetailDto movieDto = null;
		
		if(movie != null)
			movieDto = this.convertor.convertOriginalToDto(movie);
		
		return movieDto;
			
	}

	@Override
	public boolean deleteMovie(String movieId) {
		this.repository.deleteById(movieId);
		return true;	
	}

	@Override
	public MovieDetailDto getMovieById(String movieId) {
		MovieDetailDto dto = null;
		
		MovieDetail movie = this.repository.findById(movieId).orElse(null);
		
		dto = this.convertor.convertOriginalToDto(movie);
		
		return dto;
	}

	@Override
	public List<MovieDetailDto> getAllMovie() {
		List<MovieDetailDto> dtoList = new ArrayList<MovieDetailDto>();
		
		this.repository.findAll().forEach(
					(movie) -> {
						MovieDetailDto dto = this.convertor.convertOriginalToDto(movie);
						dtoList.add(dto);
					}
				);
		
		return dtoList;
	}

	@Override
	public MovieDetailDto getMovieByName(String name) {
		MovieDetail movie = this.repository.findByName(name);
		MovieDetailDto dto = null;
		if(movie!=null)
			dto = this.convertor.convertOriginalToDto(movie);
		return dto;
	}

}
