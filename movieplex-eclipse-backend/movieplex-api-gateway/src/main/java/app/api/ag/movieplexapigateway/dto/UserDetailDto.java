package app.api.ag.movieplexapigateway.dto;

import java.util.Date;
import java.util.List; 

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class UserDetailDto {
	
	private String userId;
	private String firstName;
	private String lastName;
	private String gender;
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
