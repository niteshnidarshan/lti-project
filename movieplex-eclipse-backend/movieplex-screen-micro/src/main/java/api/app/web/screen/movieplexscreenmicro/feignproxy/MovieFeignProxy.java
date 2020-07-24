package api.app.web.screen.movieplexscreenmicro.feignproxy;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import api.app.web.screen.movieplexscreenmicro.dto.MovieDetailDto;

//@FeignClient(name = "MoviePlex-Movie-Micro")
@FeignClient(name = "api-gateway")
@RibbonClient(name = "MoviePlex-Movie-Micro")
//@FeignClient(name="MoviePlex-Movie-Micro", url="http://localhost:8765")
public interface MovieFeignProxy {

	@GetMapping("/MoviePlex-Movie-Micro/api/movie/get/id/{movieId}")
	public ResponseEntity<MovieDetailDto> getMovieById(@PathVariable("movieId") String movieId);
}
