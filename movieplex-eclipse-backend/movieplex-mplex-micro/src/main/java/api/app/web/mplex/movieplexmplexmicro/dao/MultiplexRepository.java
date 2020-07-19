package api.app.web.mplex.movieplexmplexmicro.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import api.app.web.mplex.movieplexmplexmicro.document.MPlexDetail;

@Repository
public interface MultiplexRepository extends MongoRepository<MPlexDetail, String>{
	
	public MPlexDetail findByName(String name);
	public List<MPlexDetail> findAllByLocationLike(String location);
	public List<MPlexDetail> findAllByAssociatedUserId(String associatedUserId);

}
