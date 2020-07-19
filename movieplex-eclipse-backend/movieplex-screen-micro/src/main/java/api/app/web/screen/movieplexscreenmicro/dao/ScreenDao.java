package api.app.web.screen.movieplexscreenmicro.dao;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import api.app.web.screen.movieplexscreenmicro.document.ScreenDetail;

@Repository
public interface ScreenDao extends MongoRepository<ScreenDetail, String>{

	public List<ScreenDetail> findAllByMultiplexId(String multiplexId);
	
	public ScreenDetail findByMovieIdAndIsScreenAlive(String movieId, boolean isAlive);
	
}
