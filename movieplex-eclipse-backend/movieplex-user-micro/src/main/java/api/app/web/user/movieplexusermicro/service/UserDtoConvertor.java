package api.app.web.user.movieplexusermicro.service;

import org.springframework.stereotype.Component;

import api.app.web.user.movieplexusermicro.document.UserDetail;
import api.app.web.user.movieplexusermicro.dto.UserDetailDto;

@Component
public class UserDtoConvertor {
	
	public UserDetail convertDtoToOriginal(UserDetailDto dto) {
		UserDetail user = new UserDetail(dto.getUserId(), dto.getFirstName(), dto.getLastName(), dto.getGender(), dto.getDob(), dto.getAge(), dto.getEmail(), dto.getMobile(), dto.getPassword(), dto.getLocation(), dto.getUserType(), dto.isAlive(), dto.getMPlexList(), dto.getProfileCreationTimeStamp(), dto.getProfileLastModifiedTimeStamp());
		return user; 
	}
	
	public UserDetailDto convertOriginalToDto(UserDetail user) {
		UserDetailDto dto = new UserDetailDto(user.getUserId(), user.getFirstName(), user.getLastName(), user.getGender(), user.getDob(), user.getAge(), user.getEmail(), user.getMobile(), user.getPassword(), user.getLocation(), user.getUserType(), user.isAlive(), user.getMPlexList(), user.getProfileCreationTimeStamp(), user.getProfileLastModifiedTimeStamp());
		return dto;
	}

}
