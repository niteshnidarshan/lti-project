package api.app.web.mplex.movieplexmplexmicro.feignproxy;

import java.util.List;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import api.app.web.mplex.movieplexmplexmicro.dto.ScreenDetailDto;

//@FeignClient(name = "MoviePlex-Screen-Micro")
@FeignClient(name = "api-gateway", url = "https://movieplex-ag.herokuapp.com/")
@RibbonClient(name = "MoviePlex-Screen-Micro")
public interface ScreenFeignProxy {

	@GetMapping("/MoviePlex-Screen-Micro/api/screen/get/all/{multiplexId}")
	public ResponseEntity<List<ScreenDetailDto>> getAllScreenByMultiplex(@PathVariable("multiplexId") String multiplexId);
	
}
