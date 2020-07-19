package api.app.web.user.movieplexusermicro.service;

import java.util.List;

import api.app.web.user.movieplexusermicro.document.UserDetail;
import api.app.web.user.movieplexusermicro.dto.LoginDto;
import api.app.web.user.movieplexusermicro.dto.UserDetailDto;

public interface UserService {

	public UserDetailDto login(LoginDto loginDto);
	public boolean checkAlreadyInUse(String email);
	public UserDetailDto register(UserDetail userDetail); 
	public UserDetailDto editProfile(UserDetail userDetail);
	public UserDetailDto getUserDetail(String userId);
	public List<UserDetailDto> getAllUserDetail();
	public boolean checkEmailAlreadyAvailable(String email);
}
