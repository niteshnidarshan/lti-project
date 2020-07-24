package api.app.web.user.movieplexusermicro.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import api.app.web.user.movieplexusermicro.document.UserDetail;

public interface UserDetailDao extends MongoRepository<UserDetail, String>{

	public UserDetail findByEmailAndPassword(String email, String password);
	
	public UserDetail findByEmail(String email);
	
	public UserDetail findByUserId(String userId);
	
	 
	
}
