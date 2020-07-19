package api.app.web.user.movieplexusermicro.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import api.app.web.user.movieplexusermicro.document.UserDetail;

public interface UserDetailDao extends MongoRepository<UserDetail, String>{

	public UserDetail findByEmailAndPasswordAndIsAlive(String email, String password, boolean isAlive);
	
	public UserDetail findByEmailAndIsAlive(String email, boolean isAlive);
	
	public UserDetail findByUserId(String userId);
	
	public List<UserDetail> findByEmail(String email);
	
}
