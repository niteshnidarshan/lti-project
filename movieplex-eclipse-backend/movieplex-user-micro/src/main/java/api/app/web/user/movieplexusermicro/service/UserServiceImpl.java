package api.app.web.user.movieplexusermicro.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import api.app.web.user.movieplexusermicro.dao.UserDetailDao;
import api.app.web.user.movieplexusermicro.document.UserDetail;
import api.app.web.user.movieplexusermicro.dto.LoginDto;
import api.app.web.user.movieplexusermicro.dto.MPlexDetailDto;
import api.app.web.user.movieplexusermicro.dto.UserDetailDto;
import api.app.web.user.movieplexusermicro.dto.UserType;
import api.app.web.user.movieplexusermicro.feignproxy.UserFeignProxy;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDetailDao repository;
	
	@Autowired
	private UserDtoConvertor convertor;
	
	@Autowired
	private UserFeignProxy userMultiplexProxy;

	@Override
	public UserDetailDto login(LoginDto loginDto) { 
		
		UserDetailDto dto = null;
		
		UserDetail user = this.repository.findByEmailAndPasswordAndIsAlive(loginDto.getEmail(), loginDto.getPassword(), true);
		 
		if(user != null) {
			 
			user.setPassword("");
			dto = this.convertor.convertOriginalToDto(user);
			if(dto.getUserType() != null && (dto.getUserType().equals(UserType.ADMIN) || dto.getUserType().equals(UserType.SUPER_USER))) {
				
				//If user is ADMIN/ SUPER_USER should show all the associated multiplexes
				if(this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getStatusCode() == HttpStatus.OK) {
					List<MPlexDetailDto> mPlexList = this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getBody();
					dto.setMPlexList(mPlexList);
				}
			}
		}
		
		return dto;
	}

	@Override
	public boolean checkAlreadyInUse(String email) { 
		UserDetail user = this.repository.findByEmailAndIsAlive(email, true);
		if(user != null)
			return true;
		else 
			return false;
	}

	@Override
	public UserDetailDto register(UserDetail userDetail) { 
		
		UserDetail user = this.repository.save(userDetail);
		
		if(user != null)
			user.setPassword("");
		
		return this.convertor.convertOriginalToDto(user);
		
	}

	@Override
	public UserDetailDto editProfile(UserDetail userDetail) { 
		
		UserDetailDto dto = null;
		
		//Obtain the existing record
		UserDetail user = this.repository.findByUserId(userDetail.getUserId());
		
		//If user exists, change values & send as save
		if(user != null) {
			user.setAge(userDetail.getAge());
			user.setAlive(userDetail.isAlive());
			user.setDob(userDetail.getDob());
			user.setEmail(userDetail.getEmail());
			user.setFirstName(userDetail.getFirstName());
			user.setLastName(userDetail.getLastName());
			user.setGender(userDetail.getGender());
			user.setLocation(userDetail.getLocation());
			user.setMobile(userDetail.getMobile());
			//user.setPassword(userDetail.getPassword());
			user.setUserType(userDetail.getUserType());
			user.setProfileLastModifiedTimeStamp(new Date(System.currentTimeMillis()));
			
			//Save the updated object
			user = this.repository.save(user);
		
		}
		if(user != null) {
			user.setPassword("");
			dto = this.convertor.convertOriginalToDto(user);
			
			if(dto.getUserType() != null && (dto.getUserType().equals(UserType.ADMIN) || dto.getUserType().equals(UserType.SUPER_USER))) {
				
				//If user is ADMIN/ SUPER_USER should show all the associated multiplexes
				if(this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getStatusCode() == HttpStatus.OK) {
					List<MPlexDetailDto> mPlexList = this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getBody();
					dto.setMPlexList(mPlexList);
				}
			}
		}
		
		return dto;
				
	}

	@Override
	public UserDetailDto getUserDetail(String userId) { 
		
		UserDetailDto dto = null;
		
		UserDetail user = this.repository.findById(userId).orElse(null);
		
		if(user != null) {
			user.setPassword("");
			dto = this.convertor.convertOriginalToDto(user);
			//System.out.println("See     Here  "+this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getStatusCode());
				if(dto.getUserType() != null && (dto.getUserType().equals(UserType.ADMIN) || dto.getUserType().equals(UserType.SUPER_USER))) {
				
				//If user is ADMIN/ SUPER_USER should show all the associated multiplexes
				if(this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getStatusCode() == HttpStatus.OK) {
					List<MPlexDetailDto> mPlexList = this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getBody();
					dto.setMPlexList(mPlexList);
				}
			}
		}
		
		return dto;
	}

	@Override
	public List<UserDetailDto> getAllUserDetail() { 
		List<UserDetailDto> dtoList = new ArrayList<UserDetailDto>();
				
				this.repository.findAll().forEach(
					(user) -> {
						if(user != null)
							user.setPassword("");
						
						UserDetailDto dto = this.convertor.convertOriginalToDto(user);
						
						if(dto.getUserType() != null && (dto.getUserType().equals(UserType.ADMIN) || dto.getUserType().equals(UserType.SUPER_USER))) {
							
							//If user is ADMIN/ SUPER_USER should show all the associated multiplexes
							if(this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getStatusCode() == HttpStatus.OK) {
								List<MPlexDetailDto> mPlexList = this.userMultiplexProxy.getAllMPlexByAssociatedUserId(dto.getUserId()).getBody();
								dto.setMPlexList(mPlexList);
							}
						}
						dtoList.add(dto);
					}
				);
				
		return dtoList;
	}

	@Override
	public boolean checkEmailAlreadyAvailable(String email) {
		
		List<UserDetail> userList = new ArrayList<UserDetail>();
		
		userList = this.repository.findByEmail(email);
		
		if(userList != null && userList.size()>0)
			return true;
		else
			return false;
		
	}

	
	
}
