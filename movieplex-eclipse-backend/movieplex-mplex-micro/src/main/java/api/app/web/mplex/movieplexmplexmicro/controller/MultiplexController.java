package api.app.web.mplex.movieplexmplexmicro.controller;

import java.util.ArrayList;
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

import api.app.web.mplex.movieplexmplexmicro.dto.MPlexDetailDto;
import api.app.web.mplex.movieplexmplexmicro.dto.MultiplexExceptionDto;
import api.app.web.mplex.movieplexmplexmicro.dto.ScreenDetailDto;
import api.app.web.mplex.movieplexmplexmicro.exception.CommonException;
import api.app.web.mplex.movieplexmplexmicro.service.MultiplexService; 

@RestController
@RequestMapping("/api/multiplex")
public class MultiplexController {
	
	private static final Logger logger = LoggerFactory.getLogger(MultiplexController.class);
	
	@Autowired
	private MultiplexService service;
	
	@GetMapping("/message")
	public String getMessage() {
		return "Jai Ram G ki";
	}
	
	@PostMapping("/add")
	public ResponseEntity<MPlexDetailDto> addMultiplex(@RequestBody MPlexDetailDto dto){
		
		if(dto == null)
			throw new CommonException("Invalid request!");
		
		MPlexDetailDto mPlexDto = this.service.registerMPlex(dto);
		
		if(mPlexDto == null) {
			throw new CommonException("Unable to add multiplex. Invalid Response!");
		}
		
		ResponseEntity<MPlexDetailDto> response= new ResponseEntity<MPlexDetailDto>(mPlexDto, HttpStatus.OK);
		
		return response;
	}
	
	@PutMapping("/modify")
	public ResponseEntity<MPlexDetailDto> modifyMultiplex(@RequestBody MPlexDetailDto dto){
		
		if(dto == null)
			throw new CommonException("Invalid request!");
		
		MPlexDetailDto mPlexDto = this.service.modifyMplex(dto);
		
		if(mPlexDto == null) {
			throw new CommonException("Unable to modify multiplex. Invalid Response!");
		}
		
		ResponseEntity<MPlexDetailDto> response= new ResponseEntity<MPlexDetailDto>(mPlexDto, HttpStatus.OK);
		
		return response;
		
	}
	
	@DeleteMapping("/delete/{multiplexId}")
	public ResponseEntity<Boolean> deleteMultiplex(@PathVariable("multiplexId") String multiplexId){
		
		boolean res =  this.service.deleteMplex(multiplexId);
		 
		ResponseEntity<Boolean> response= new ResponseEntity<Boolean>(res, HttpStatus.OK);
		
		return response;
		
	}
	
	@GetMapping("/get/id/{multiplexId}")
	public ResponseEntity<MPlexDetailDto> getMultiplexById(@PathVariable("multiplexId") String id){

		MPlexDetailDto mPlexDto = this.service.getMPlexById(id);
		
		if(mPlexDto == null) {
			throw new CommonException("No such multiplex available!");
		}
		
		ResponseEntity<MPlexDetailDto> response= new ResponseEntity<MPlexDetailDto>(mPlexDto, HttpStatus.OK);
		
		return response;
		
	}
	
	@GetMapping("/get/name/{name}")
	public ResponseEntity<MPlexDetailDto> getMultiplexByName(@PathVariable("name") String name){

		MPlexDetailDto mPlexDto = this.service.getMPlexByName(name);
		
		if(mPlexDto == null) {
			throw new CommonException("No such multiplex available!");
		}
		
		ResponseEntity<MPlexDetailDto> response= new ResponseEntity<MPlexDetailDto>(mPlexDto, HttpStatus.OK);
		
		return response;
		
	}
	
	@GetMapping("/get-all")
	public ResponseEntity<List<MPlexDetailDto>> getAllMultiplex(){
		
		List<MPlexDetailDto> mPlexList = new ArrayList<MPlexDetailDto>();
		
		mPlexList = this.service.getAllMPlex();
		
		/*if(mPlexList == null || mPlexList.size() == 0) {
			throw new CommonException("No multiplex available!");
		}*/
		
		ResponseEntity<List<MPlexDetailDto>> response= new ResponseEntity<List<MPlexDetailDto>>(mPlexList, HttpStatus.OK);
		
		return response;
		
	}
	
	@GetMapping("/get/all/location/{location}")
	public ResponseEntity<List<MPlexDetailDto>> getAllMultiplexByLocation(@PathVariable("location") String location){
		
		List<MPlexDetailDto> mPlexList = new ArrayList<MPlexDetailDto>();
		
		mPlexList = this.service.getAllMPlexByLocation(location);
		
		if(mPlexList == null || mPlexList.size() == 0) {
			throw new CommonException("No multiplex avvailable at this location");
		}
		
		ResponseEntity<List<MPlexDetailDto>> response= new ResponseEntity<List<MPlexDetailDto>>(mPlexList, HttpStatus.OK);
		
		return response;
		
	}
	
	@GetMapping("/get/all/screen/{multiplexId}")
	public ResponseEntity<List<ScreenDetailDto>> getAllScreensByMultiplexId(@PathVariable("multiplexId") String multiplexId){
		
		List<ScreenDetailDto> screenList = this.service.getAllScreen(multiplexId);
		
		if(screenList == null || screenList.size() == 0)
			throw new CommonException("No screens added yet to this Theatre!");
		
		ResponseEntity<List<ScreenDetailDto>> response = new ResponseEntity<List<ScreenDetailDto>>(screenList, HttpStatus.OK);
		
		return response;
		
	}
	
	@GetMapping("/get/all/user/{associatedUserId}")
	public ResponseEntity<List<MPlexDetailDto>> getAllMPlexByAssociatedUserId(@PathVariable("associatedUserId") String associatedUserId){
		
		List<MPlexDetailDto> dtoList = this.service.getAllMplexByAssociatedUserId(associatedUserId);
		
		/*if(dtoList == null || dtoList.size() == 0) {
			throw new CommonException("No Multiplex records available with the user yet.");
		}*/
		
		ResponseEntity<List<MPlexDetailDto>> response = new ResponseEntity<List<MPlexDetailDto>>(dtoList, HttpStatus.OK);
		
		return response;
		
	}
	
	@ExceptionHandler(CommonException.class)
	public ResponseEntity<MultiplexExceptionDto> multiplexExceptionHandler(CommonException ex){
		
		logger.error("Common Exception - "+ex.getMessage());
		
		MultiplexExceptionDto exceptionDto = new MultiplexExceptionDto(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), System.currentTimeMillis());
		
		ResponseEntity<MultiplexExceptionDto> response = new ResponseEntity<MultiplexExceptionDto>(exceptionDto, HttpStatus.BAD_REQUEST);
		
		return response;
		
	}

}
