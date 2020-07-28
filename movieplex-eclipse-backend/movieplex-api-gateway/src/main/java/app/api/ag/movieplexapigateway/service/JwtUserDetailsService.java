package app.api.ag.movieplexapigateway.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.api.ag.movieplexapigateway.dto.UserDetailDto;
import app.api.ag.movieplexapigateway.feignproxy.UserAuthFeignProxy;

@Service
public class JwtUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserAuthFeignProxy proxy;
	
	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		/*if ("javainuse".equals(username)) {
			return new User("javainuse", "$2a$10$slYQmyNdGzTn7ZLBXBChFOC9f6kFjAqPhccnP6DxlWXx2lPk1C3G6",
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}*/
		
		UserDetailDto user = this.proxy.getUserByEmail(email).getBody();
		
		if (user == null) {
			throw new UsernameNotFoundException("User not found with email: " + email);
		}
		 
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
		
	}
	
	/*public UserDetailDto login(LoginDto loginDto) {
		
		BindingResult validator = null;
		
		UserDetailDto userDetailDto = this.proxy.login(loginDto, validator).getBody();
		
		return userDetailDto; 
	}*/
	
	public UserDetailDto save(UserDetailDto dto) throws Exception {
		UserDetailDto userDetailDto = null; 
		try {
		dto.setPassword(bcryptEncoder.encode(dto.getPassword())); //setting encrypted password to dto 
		
		userDetailDto = this.proxy.register(dto).getBody(); //Register user request with feign proxy with encrypted password value.
		}catch(Exception ex) {
			System.out.println("error is = "+ex);
			throw ex;
		}
		//Object userDetailDto = this.proxy.register(dto).getStatusCode();
		//System.out.println("Seeeehere ################## "+userDetailDto);
		return userDetailDto;
		
		/*DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userDao.save(newUser);*/
	}

}
