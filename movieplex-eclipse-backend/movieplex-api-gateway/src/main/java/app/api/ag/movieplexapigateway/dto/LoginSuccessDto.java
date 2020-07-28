package app.api.ag.movieplexapigateway.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor
@NoArgsConstructor
public class LoginSuccessDto {
	
	private String userId;
	private String firstName;
	private String lastName; 
	private String email;  
	private UserType userType;
	private String token; 

}
