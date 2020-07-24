package api.app.web.movie.movieplexmoviemicro.controller;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.app.web.movie.movieplexmoviemicro.dto.MovieDetailDto;
import api.app.web.movie.movieplexmoviemicro.dto.MovieExceptionDto;
import api.app.web.movie.movieplexmoviemicro.exception.CommonException;
import api.app.web.movie.movieplexmoviemicro.service.MovieDetailConvertor;
import api.app.web.movie.movieplexmoviemicro.service.MovieService;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
	
	private static final Logger logger = LoggerFactory.getLogger(MovieController.class);
	
	@Autowired
	private MovieService service;
	
	@Autowired
	private MovieDetailConvertor convertor;
	
	@GetMapping("/message")
	public String getMessage(String message) {
		return "Jai Ram G ki";
	}
	
	@PostMapping("/add")
	public ResponseEntity<MovieDetailDto> addMovie(@RequestBody MovieDetailDto dto){
		MovieDetailDto movieDto = null;
		
		if(dto == null) {
			throw new CommonException("Invalid Request!");
		}
		
		if(dto != null) { 
			
			dto.setMovieId(null);
			dto.setMovieCreationTimeStamp(new Date(System.currentTimeMillis()));
			
			movieDto = this.service.addMovie(this.convertor.convertDtoToOriginal(dto));
		}
		
		if(movieDto == null) {
			throw new CommonException("Movie entry could not done. kindly contact MoviePlex administrator.");
		}
		
		ResponseEntity<MovieDetailDto> response = new ResponseEntity<MovieDetailDto>(movieDto, HttpStatus.OK);
		return response;
	}
	
	@PutMapping("/modify")
	public ResponseEntity<MovieDetailDto> modifyMovie(@RequestBody MovieDetailDto dto){
		MovieDetailDto movieDto = null;
		if(dto != null) { 
			dto.setMovieLastModifiedTimeStamp(new Date(System.currentTimeMillis()));
			movieDto = this.service.modifyMovie(dto);
		}
		ResponseEntity<MovieDetailDto> response = new ResponseEntity<MovieDetailDto>(movieDto, HttpStatus.OK);
		return response;
	}
	
	@GetMapping("/get/id/{movieId}")
	public ResponseEntity<MovieDetailDto> getMovieById(@PathVariable("movieId") String movieId){
		MovieDetailDto dto = this.service.getMovieById(movieId);
		ResponseEntity<MovieDetailDto> response = new ResponseEntity<MovieDetailDto>(dto, HttpStatus.OK);
		return response;
	}
	
	@GetMapping("/get/name/{movieName}")
	public ResponseEntity<MovieDetailDto> getMovieByName(@PathVariable("movieName") String movieName){
		MovieDetailDto dto = this.service.getMovieByName(movieName);
		ResponseEntity<MovieDetailDto> response = new ResponseEntity<MovieDetailDto>(dto, HttpStatus.OK);
		return response;
	}
	
	@GetMapping("/get-all")
	public ResponseEntity<List<MovieDetailDto>> getAllMovie(){
		List<MovieDetailDto> dto = this.service.getAllMovie();
		ResponseEntity<List<MovieDetailDto>> response = new ResponseEntity<List<MovieDetailDto>>(dto, HttpStatus.OK);
		return response;
	}
	
	@ExceptionHandler(CommonException.class)
	public ResponseEntity<MovieExceptionDto> movieExceptionController(CommonException ex){

		logger.error(ex.getMessage());
		
		MovieExceptionDto dto = new MovieExceptionDto(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), System.currentTimeMillis());
		
		ResponseEntity<MovieExceptionDto> response = new ResponseEntity<MovieExceptionDto>(dto, HttpStatus.BAD_REQUEST);
		
		return response;
		
	}
	

}
