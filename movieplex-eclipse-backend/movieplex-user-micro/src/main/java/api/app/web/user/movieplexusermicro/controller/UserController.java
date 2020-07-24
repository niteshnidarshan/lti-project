package api.app.web.user.movieplexusermicro.controller;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import api.app.web.user.movieplexusermicro.document.UserDetail;
import api.app.web.user.movieplexusermicro.dto.LoginDto;
import api.app.web.user.movieplexusermicro.dto.UserDetailDto;
import api.app.web.user.movieplexusermicro.dto.UserExceptionDto;
import api.app.web.user.movieplexusermicro.exception.CommonException;
import api.app.web.user.movieplexusermicro.service.UserDtoConvertor;
import api.app.web.user.movieplexusermicro.service.UserService;

@RestController
@RequestMapping("api/user")
//@CrossOrigin("*")
public class UserController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService service;
	
	@Autowired
	private UserDtoConvertor convertor;
	
	@GetMapping("message")
	public String getMessage() {
		return "Jai Ram G ki";
	}
	
	@PostMapping("/register")
	public ResponseEntity<UserDetailDto> register(@RequestBody UserDetailDto dto){
		
		if(dto != null && this.service.checkAlreadyInUse(dto.getEmail())) {
			throw new CommonException("Email already in use! Try login with valid password or reset password.");
		}
		
		dto.setAlive(true);
		dto.setProfileCreationTimeStamp(new Date(System.currentTimeMillis()));
		
		UserDetail user = this.convertor.convertDtoToOriginal(dto);
		
		UserDetailDto userDto = this.service.register(user);
		
		ResponseEntity<UserDetailDto> response = new ResponseEntity<UserDetailDto>(userDto, HttpStatus.OK);
		
		return response;
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserDetailDto> login(@RequestBody LoginDto loginDto, BindingResult validator){
		
		if(validator.hasErrors()) {
			logger.error("Invalid user credentials provided.");
			// Will be handled by @ExceptionHandler(CommonException.class) definition & will return bad request with proper message
			throw new CommonException("Invalid credential. Either email or password is wrong!");
		}
		
		UserDetailDto dto = this.service.login(loginDto);
		
		if(dto == null) {
			throw new CommonException("Invalid credential. Either email or password is wrong!");
		}
		
		ResponseEntity<UserDetailDto> response = new ResponseEntity<UserDetailDto>(dto, HttpStatus.OK);
		
		return response;
	}
	
	@PutMapping(path = "/modify-user", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetailDto> updateProfile(@RequestBody UserDetailDto userDto){
		
		if(userDto == null) {
			logger.info("request is null to modify-user.");
			throw new CommonException("Invalid request!");
		}
		
		userDto.setProfileLastModifiedTimeStamp(new Date(System.currentTimeMillis()));
		 
		UserDetail user = this.convertor.convertDtoToOriginal(userDto);
		
		UserDetailDto dto = this.service.editProfile(user);
		
		if(dto == null) {
			logger.error("Error in modify-user request. DTO object has null reponse from database.");
			throw new CommonException("User details not available!");
		}
		
		ResponseEntity<UserDetailDto> response = new ResponseEntity<UserDetailDto>(dto, HttpStatus.OK);
		
		return response;
	}
	
	@GetMapping("/get/{userId}")
	public ResponseEntity<UserDetailDto> getUserDetail(@PathVariable("userId") String userId){
		
		UserDetailDto dto = this.service.getUserDetail(userId);
		
		if(dto == null) {
			logger.info("in getUserDetail() - DTO object has null reponse from database."); 
			throw new CommonException("User not available!");
		}
		
		ResponseEntity<UserDetailDto> response = new ResponseEntity<UserDetailDto>(dto, HttpStatus.OK);
		
		return response;
		
	}
	
	@GetMapping("/get-all")
	public ResponseEntity<List<UserDetailDto>> getAllUserDetail(){
		
		List<UserDetailDto> userList = this.service.getAllUserDetail();
		
		if(userList == null) {
			logger.info("No users available.");
			throw new CommonException("No users available.");
		}
		if(userList != null && userList.size()==0) {
			logger.info("No users available in DB. ");
			throw new CommonException("No users available in DB.");
		}
		
		ResponseEntity<List<UserDetailDto>> response = new ResponseEntity<List<UserDetailDto>>(userList, HttpStatus.OK);
		
		return response;
		
	}
	
	@ExceptionHandler(CommonException.class)// It is used to handle exception in rest controller - if not defined, then in return response a trace element will also be attached with exception
	public ResponseEntity<UserExceptionDto> commonExceptionHandler(CommonException ex){
		
		logger.error(ex.getMessage());
		
		UserExceptionDto exceptionDto = new UserExceptionDto(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), System.currentTimeMillis());
		ResponseEntity<UserExceptionDto> response = new ResponseEntity<UserExceptionDto>(exceptionDto, HttpStatus.BAD_REQUEST);
		return response;
	}
	

}
