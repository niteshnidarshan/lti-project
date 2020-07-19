package api.app.web.screen.movieplexscreenmicro.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.app.web.screen.movieplexscreenmicro.dto.ScreenDetailDto;
import api.app.web.screen.movieplexscreenmicro.dto.ScreenExceptionDto;
import api.app.web.screen.movieplexscreenmicro.exception.CommonException;
import api.app.web.screen.movieplexscreenmicro.service.ScreenService;

@RestController
@RequestMapping("/api/screen")
public class ScreenController {
	
	private static final Logger logger = LoggerFactory.getLogger(ScreenController.class);
	
	@Autowired
	private ScreenService service;

	@GetMapping("/message")
	public String getMessage() {
		return "Jai Ram G ki!";
	}
	
	@PostMapping("/add")
	public ResponseEntity<ScreenDetailDto> addScreen(@RequestBody ScreenDetailDto dto){
		
		if(dto == null) {
			logger.info("addScreen() - Invalid request to add screen.");
			throw new CommonException("Invalid request to add screen.");
		}
		
		ScreenDetailDto screenDto = this.service.registerScreen(dto);
		
		if(screenDto == null) {
			logger.info("addScreen() - Request to add screen could not done. null response from DB");
			throw new CommonException("Request to add screen could not done.");
		}
		
		ResponseEntity<ScreenDetailDto> response = new ResponseEntity<ScreenDetailDto>(screenDto, HttpStatus.OK);
		
		return response;
	}
	
	@PutMapping("/modify")
	public ResponseEntity<ScreenDetailDto> modifyScreen(@RequestBody ScreenDetailDto dto){
		
		if(dto == null) {
			logger.info("modifyScreen() - NULL request to modify screen.");
			throw new CommonException("Invalid request to modify screen.");
		}
		
		ScreenDetailDto screenDto = this.service.modifyScreen(dto);
		
		if(screenDto == null) {
			logger.info("modifyScreen() - Request to modify screen could not done. null response from DB");
			throw new CommonException("Request to modify screen could not done.");
		}
		
		ResponseEntity<ScreenDetailDto> response = new ResponseEntity<ScreenDetailDto>(screenDto, HttpStatus.OK);
		
		return response;
	}
	
	@DeleteMapping("/delete/{screenId}")
	public ResponseEntity<Boolean> deleteScreen(@PathVariable("screenId") String screenId) {
		
		if(screenId == null || screenId.trim().equals("")) {
			logger.info("deleteScreen() - invalid request to delete screen. screenId = "+screenId);
			throw new CommonException("Invalid request to delete screen.");
		}
		
		boolean res = this.service.deleteScreen(screenId);
		
		ResponseEntity<Boolean> response = new ResponseEntity<Boolean>(res, HttpStatus.OK);
		
		return response;
	}
	
	@PutMapping("/add-movie")
	public ResponseEntity<ScreenDetailDto> addMovie(@RequestBody ScreenDetailDto dto){
		
		if(dto == null) {
			logger.info("addMovie() - NULL request to Add Movie.");
			throw new CommonException("Invalid request to Add Movie.");
		}
		
		if(dto != null && (dto.getMovieId()==null || dto.getMovieId().trim().equals(""))) {
			logger.info("addMovie() - invalid movieId | movieId = "+dto.getMovieId());
			throw new CommonException("Invalid request to Add Movie.");
		}
		
		ScreenDetailDto screenDto = this.service.addMovie(dto);
		
		if(screenDto == null) {
			logger.info("addMovie() - NULL response to Add Movie from DB.");
			throw new CommonException("Invalid response to Add Movie from DB.");
		}
		
		ResponseEntity<ScreenDetailDto> response = new ResponseEntity<ScreenDetailDto>(screenDto, HttpStatus.OK);
		
		return response;
	}
	
	@GetMapping("get/screen/{screenId}")
	public ResponseEntity<ScreenDetailDto> getScreenById(@PathVariable("screenId") String screenId){
		
		ScreenDetailDto screenDto = this.service.getScreenByScreenId(screenId);
		
		if(screenDto == null) {
			logger.info("getScreenById() - NULL response to get Screen By Id from DB.");
			throw new CommonException("Invalid response to get Screen By Id from DB.");
		}
		
		ResponseEntity<ScreenDetailDto> response = new ResponseEntity<ScreenDetailDto>(screenDto, HttpStatus.OK);
		
		return response;
	}
	
	@GetMapping("get/screen/movie/{movieId}")
	public ResponseEntity<ScreenDetailDto> getScreenByMovieId(@PathVariable("movieId") String movieId){
		
		ScreenDetailDto screenDto = this.service.getScreenByMovieId(movieId);
		
		if(screenDto == null) {
			logger.info("getScreenByMovieId() - NULL response to get Screen By Movie Id from DB.");
			throw new CommonException("No such movie mapped with the screen.");
		}
		
		ResponseEntity<ScreenDetailDto> response = new ResponseEntity<ScreenDetailDto>(screenDto, HttpStatus.OK);
		
		return response;
	} 
	
	@GetMapping("get/all/{multiplexId}")
	public ResponseEntity<List<ScreenDetailDto>> getAllScreenByMultiplex(@PathVariable("multiplexId") String multiplexId){
		
		List<ScreenDetailDto> screenDtoList = this.service.getAllScreenByMPlexId(multiplexId);
		
		/*if(screenDtoList == null || screenDtoList.size() == 0) {
			logger.info("getAllScreenByMultiplex() - No response to get Screen By Multiplex Id from DB.");
			throw new CommonException("No screens mapped with this multiplex.");
		}*/
		
		ResponseEntity<List<ScreenDetailDto>> response = new ResponseEntity<List<ScreenDetailDto>>(screenDtoList, HttpStatus.OK);
		
		return response;
	}
	
	@ExceptionHandler(CommonException.class)
	public ResponseEntity<ScreenExceptionDto> commonExceptionHandler(CommonException ex){
		
		logger.error("Common Exception - "+ex.getMessage());
		
		ScreenExceptionDto exceptionDto = new ScreenExceptionDto(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), System.currentTimeMillis());
		
		ResponseEntity<ScreenExceptionDto> response = new ResponseEntity<ScreenExceptionDto>(exceptionDto, HttpStatus.BAD_REQUEST);
		
		return response;
		
	}
}
