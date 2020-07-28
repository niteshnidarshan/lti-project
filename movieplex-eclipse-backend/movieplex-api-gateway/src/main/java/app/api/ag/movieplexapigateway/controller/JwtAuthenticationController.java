package app.api.ag.movieplexapigateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import app.api.ag.movieplexapigateway.config.JwtTokenUtil;
import app.api.ag.movieplexapigateway.dto.JwtRequest;
import app.api.ag.movieplexapigateway.dto.LoginSuccessDto;
import app.api.ag.movieplexapigateway.dto.UserDetailDto;
import app.api.ag.movieplexapigateway.dto.UserExceptionDto;
import app.api.ag.movieplexapigateway.exception.CommonException;
import app.api.ag.movieplexapigateway.feignproxy.UserAuthFeignProxy;
import app.api.ag.movieplexapigateway.service.JwtUserDetailsService;

@RestController
@CrossOrigin("http://localhost:4200")
public class JwtAuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@Autowired
	private UserAuthFeignProxy proxy;
	 
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<LoginSuccessDto> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
		 
		/*
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
		*/
		
		//Here userName is email
		
		
		UserDetailDto dto = null;
		
		LoginSuccessDto success = null;
		
		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		  
		if(userDetails != null) {
			//once user is valid then need to return token with userdetails  
			dto = this.proxy.getUserByEmail(authenticationRequest.getUsername()).getBody();
			 
			final String token = jwtTokenUtil.generateToken(userDetails);
			
			success = new LoginSuccessDto();
			
			success.setUserId(dto.getUserId());
			success.setFirstName(dto.getFirstName());
			success.setLastName(dto.getLastName());
			success.setEmail(dto.getEmail());
			success.setUserType(dto.getUserType());
			success.setToken(token);
			
		} 
		
		ResponseEntity<LoginSuccessDto> response = new ResponseEntity<LoginSuccessDto>(success, HttpStatus.OK);
		return response;
		//return ResponseEntity.ok(new JwtResponse(token));
	}
	
	@RequestMapping(value = "/register-user", method = RequestMethod.POST)
	public ResponseEntity<UserDetailDto> saveUser(@RequestBody UserDetailDto user) throws Exception {
		//return ResponseEntity.ok(userDetailsService.save(user));
		UserDetailDto returnDto = null;
		
		try {
			returnDto = userDetailsService.save(user);
		}catch(Exception e) {
			//System.out.println("Feign Exception ------------------- = "+e);
			throw new CommonException("Email already in use! Try login with valid password or reset password.");
		} 
		
		ResponseEntity<UserDetailDto> response = new ResponseEntity<UserDetailDto>(returnDto, HttpStatus.OK);
		return response;
		
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new CommonException("USER_DISABLED");
		} catch (BadCredentialsException e) {
			throw new CommonException("Invalid credential. Either email or password is wrong!");
		}
	}
	
	@ExceptionHandler(CommonException.class)// It is used to handle exception in rest controller - if not defined, then in return response a trace element will also be attached with exception
	public ResponseEntity<UserExceptionDto> commonExceptionHandler(CommonException ex){ 
		UserExceptionDto exceptionDto = new UserExceptionDto(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), System.currentTimeMillis());
		ResponseEntity<UserExceptionDto> response = new ResponseEntity<UserExceptionDto>(exceptionDto, HttpStatus.BAD_REQUEST);
		return response;
	}

}
