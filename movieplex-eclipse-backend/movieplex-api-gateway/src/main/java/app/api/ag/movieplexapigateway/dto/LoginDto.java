package app.api.ag.movieplexapigateway.dto;

import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length; 
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString 
public class LoginDto {

	@Email
	private String email;
	
	@Length(min = 5)
	private String password;
	
}
