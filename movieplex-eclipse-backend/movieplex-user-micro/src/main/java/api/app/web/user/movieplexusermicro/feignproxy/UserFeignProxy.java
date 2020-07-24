package api.app.web.user.movieplexusermicro.feignproxy;

import java.util.List;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import api.app.web.user.movieplexusermicro.dto.MPlexDetailDto;

@FeignClient(name = "MoviePlex-Multiplex-Micro")
@RibbonClient(name = "MoviePlex-Multiplex-Micro")
public interface UserFeignProxy {

	@GetMapping("/api/multiplex/get/all/user/{associatedUserId}")
	public ResponseEntity<List<MPlexDetailDto>> getAllMPlexByAssociatedUserId(@PathVariable("associatedUserId") String associatedUserId);
	
}
