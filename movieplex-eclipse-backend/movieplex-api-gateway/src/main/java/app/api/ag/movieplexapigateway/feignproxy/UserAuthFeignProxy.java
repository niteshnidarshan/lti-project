package app.api.ag.movieplexapigateway.feignproxy;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import app.api.ag.movieplexapigateway.dto.LoginDto;
import app.api.ag.movieplexapigateway.dto.UserDetailDto;

@FeignClient(name = "api-gateway")
@RibbonClient(name = "MoviePlex-User-Micro")
public interface UserAuthFeignProxy {

	@PostMapping("/MoviePlex-User-Micro/api/user/register")
	public ResponseEntity<UserDetailDto> register(@RequestBody UserDetailDto dto);
	
	//@PostMapping("/login")
	//public ResponseEntity<UserDetailDto> login(@RequestBody LoginDto loginDto, BindingResult validator);
	
	@GetMapping("/MoviePlex-User-Micro/api/user/email/{email}")
	public ResponseEntity<UserDetailDto> getUserByEmail(@PathVariable("email") String email);
	
}
