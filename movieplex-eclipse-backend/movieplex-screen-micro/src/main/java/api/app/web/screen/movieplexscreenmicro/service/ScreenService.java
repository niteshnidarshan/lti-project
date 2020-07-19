package api.app.web.screen.movieplexscreenmicro.service;

import java.util.List;

import api.app.web.screen.movieplexscreenmicro.dto.ScreenDetailDto;

public interface ScreenService {

	public ScreenDetailDto registerScreen(ScreenDetailDto dto);
	public ScreenDetailDto modifyScreen(ScreenDetailDto dto);
	public boolean deleteScreen(String screenId);
	public ScreenDetailDto addMovie(ScreenDetailDto dto);
	public List<ScreenDetailDto> getAllScreenByMPlexId(String mPlexId);
	public ScreenDetailDto getScreenByScreenId(String screenId);
	public ScreenDetailDto getScreenByMovieId(String movieId);
	
}
