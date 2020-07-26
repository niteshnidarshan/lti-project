package app.api.ag.movieplexapigateway.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import app.api.ag.movieplexapigateway.dto.LoginDto;
import app.api.ag.movieplexapigateway.dto.UserDetailDto;
import app.api.ag.movieplexapigateway.feignproxy.UserFeignProxy;

@Service
public class JwtUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserFeignProxy proxy;
	
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
	
	public UserDetailDto login(LoginDto loginDto) {
		
		BindingResult validator = null;
		
		UserDetailDto userDetailDto = this.proxy.login(loginDto, validator).getBody();
		
		return userDetailDto; 
	}
	
	public UserDetailDto save(UserDetailDto dto) {
		 
		dto.setPassword(bcryptEncoder.encode(dto.getPassword())); //setting encrypted password to dto 
		
		UserDetailDto userDetailDto = this.proxy.register(dto).getBody(); //Register user request with feign proxy with encrypted password value.
		
		return userDetailDto;
		
		/*DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userDao.save(newUser);*/
	}

}
