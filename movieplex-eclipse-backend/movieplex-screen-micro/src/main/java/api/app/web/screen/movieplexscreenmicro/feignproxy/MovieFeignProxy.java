package api.app.web.screen.movieplexscreenmicro.feignproxy;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import api.app.web.screen.movieplexscreenmicro.dto.MovieDetailDto;

@FeignClient(name = "MoviePlex-Movie-Micro")
@RibbonClient(name = "MoviePlex-Movie-Micro")
public interface MovieFeignProxy {

	@GetMapping("/api/movie/get/id/{movieId}")
	public ResponseEntity<MovieDetailDto> getMovieById(@PathVariable("movieId") String movieId);
}
