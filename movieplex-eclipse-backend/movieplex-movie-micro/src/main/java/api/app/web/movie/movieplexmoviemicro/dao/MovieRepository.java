package api.app.web.movie.movieplexmoviemicro.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import api.app.web.movie.movieplexmoviemicro.document.MovieDetail;

@Repository
public interface MovieRepository extends MongoRepository<MovieDetail, String>{

	public MovieDetail findByName(String name);
	
}
