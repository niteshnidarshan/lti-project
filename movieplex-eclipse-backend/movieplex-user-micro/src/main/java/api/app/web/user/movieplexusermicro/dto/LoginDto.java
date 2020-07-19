package api.app.web.user.movieplexusermicro.dto;

import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;
import org.springframework.data.mongodb.core.mapping.Document;

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
@Document
public class LoginDto {

	@Email
	private String email;
	
	@Length(min = 5)
	private String password;
	
}
