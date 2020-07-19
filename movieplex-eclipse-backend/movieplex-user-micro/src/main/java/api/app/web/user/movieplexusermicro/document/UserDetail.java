package api.app.web.user.movieplexusermicro.document;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import api.app.web.user.movieplexusermicro.dto.MPlexDetailDto;
import api.app.web.user.movieplexusermicro.dto.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDetail {

	@Id
	private String userId;
	private String firstName;
	private String lastName;
	private String gender;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") 
	private Date dob;
	private int age;
	private String email;
	private String mobile;
	private String password;
	private String location;
	private UserType userType;
	private boolean isAlive; 
	private List<MPlexDetailDto> mPlexList;
	private Date profileCreationTimeStamp;
	private Date profileLastModifiedTimeStamp;
	
}
