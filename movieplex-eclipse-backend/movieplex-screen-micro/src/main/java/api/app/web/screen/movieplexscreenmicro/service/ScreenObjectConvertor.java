package api.app.web.screen.movieplexscreenmicro.service;

import org.springframework.stereotype.Component;

import api.app.web.screen.movieplexscreenmicro.document.ScreenDetail;
import api.app.web.screen.movieplexscreenmicro.dto.ScreenDetailDto;

@Component
public class ScreenObjectConvertor {

	public ScreenDetail convertDtoToOriginal(ScreenDetailDto dto) {
		return new ScreenDetail(dto.getScreenId(), dto.getMultiplexId(), dto.getScreenName(), dto.getScreenSize(), dto.getTotalSeat(), dto.getMovieId(), dto.getMovieDetail() , dto.getShowStartDate(), dto.getShowEndDate(), dto.isScreenAlive(), dto.getShowAllocationDate(), dto.getShowLastModified());
	}
	
	public ScreenDetailDto convertOriginalToDto(ScreenDetail screen) {
		return new ScreenDetailDto(screen.getScreenId(), screen.getMultiplexId(), screen.getScreenName(), screen.getScreenSize(), screen.getTotalSeat(), screen.getMovieId(), screen.getMovieDetail(), screen.getShowStartDate(), screen.getShowEndDate(), screen.isScreenAlive(), screen.getShowAllocationDate(), screen.getShowLastModified());
	}
	
}
