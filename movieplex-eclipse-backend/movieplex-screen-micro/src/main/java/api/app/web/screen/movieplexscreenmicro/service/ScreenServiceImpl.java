package api.app.web.screen.movieplexscreenmicro.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import api.app.web.screen.movieplexscreenmicro.dao.ScreenDao;
import api.app.web.screen.movieplexscreenmicro.document.ScreenDetail;
import api.app.web.screen.movieplexscreenmicro.dto.MovieDetailDto;
import api.app.web.screen.movieplexscreenmicro.dto.ScreenDetailDto;
import api.app.web.screen.movieplexscreenmicro.feignproxy.MovieFeignProxy;

@Service
public class ScreenServiceImpl implements ScreenService{
	
	@Autowired
	private ScreenDao repository;
	
	@Autowired
	private MovieFeignProxy movieProxy;
	
	@Autowired
	private ScreenObjectConvertor convertor;

	@Override
	public ScreenDetailDto registerScreen(ScreenDetailDto dto) {
		
		ScreenDetailDto screenDto = null;
		
		ScreenDetail screen  = this.convertor.convertDtoToOriginal(dto);
		
		screen.setScreenId(null);
		screen.setScreenAlive(true);
		if(screen.getMovieId() != null) {
			screen.setShowAllocationDate(new Date(System.currentTimeMillis()));
		}
		screen.setScreenCreationDate(new Date(System.currentTimeMillis()));
		
		screen = this.repository.save(screen);
		
		if(screen != null) {
			screenDto = this.convertor.convertOriginalToDto(screen); 
			
			if(screenDto.getMovieId() != null && this.movieProxy.getMovieById(screenDto.getMovieId()).getStatusCode() == HttpStatus.OK){
				//Fetching movie details from Movie MS & setting to the ScreenDetailDto before attaching to the list
				MovieDetailDto movieDto = this.movieProxy.getMovieById(screenDto.getMovieId()).getBody();
				if(movieDto != null)
					screenDto.setMovieDetail(movieDto);
			}
				 
		}
		
		return screenDto;
		
	}

	@Override
	public ScreenDetailDto modifyScreen(ScreenDetailDto dto) {
		ScreenDetailDto screenDto = null;
		
		ScreenDetail screen = this.repository.findById(dto.getScreenId()).orElse(null);
		
		if(screen != null) {
			screen.setMovieId(dto.getMovieId());
			screen.setMultiplexId(dto.getMultiplexId());
			screen.setScreenAlive(dto.isScreenAlive());
			screen.setScreenName(dto.getScreenName());
			screen.setScreenSize(dto.getScreenSize());
			screen.setShowAllocationDate(new Date(System.currentTimeMillis()));
			screen.setShowStartDate(dto.getShowStartDate());
			screen.setShowEndDate(dto.getShowEndDate());
			screen.setTotalSeat(dto.getTotalSeat());
			screen.setShowLastModified(new Date(System.currentTimeMillis()));
			
			screen = this.repository.save(screen);
		}
		
		if(screen != null) {
			screenDto = this.convertor.convertOriginalToDto(screen);
			if(screenDto.getMovieId() != null && this.movieProxy.getMovieById(screenDto.getMovieId()).getStatusCode() == HttpStatus.OK){
				//Fetching movie details from Movie MS & setting to the ScreenDetailDto before attaching to the list
				MovieDetailDto movieDto = this.movieProxy.getMovieById(screenDto.getMovieId()).getBody();
				if(movieDto != null)
					screenDto.setMovieDetail(movieDto);
			}
		}
		
		return screenDto;
	}

	@Override
	public boolean deleteScreen(String screenId) {
		this.repository.deleteById(screenId);
		return true;
	}

	@Override
	public ScreenDetailDto addMovie(ScreenDetailDto dto) {
		
		ScreenDetailDto screenDto = null;
		
		ScreenDetail screen = this.repository.findById(dto.getScreenId()).orElse(null);
		
		if(screen != null) {
			screen.setMovieId(dto.getMovieId());
			screen.setScreenAlive(dto.isScreenAlive());
			screen.setScreenName(dto.getScreenName());
			screen.setScreenSize(dto.getScreenSize());
			screen.setShowEndDate(dto.getShowStartDate());
			screen.setShowEndDate(dto.getShowEndDate());
			screen.setTotalSeat(dto.getTotalSeat());
			screen.setShowLastModified(new Date(System.currentTimeMillis()));
			
			screen = this.repository.save(screen);
		}
		
		if(screen != null) {
			screenDto = this.convertor.convertOriginalToDto(screen);
			//Fetching movie details from Movie MS & setting to the ScreenDetailDto before attaching to the list
			MovieDetailDto movieDto = this.movieProxy.getMovieById(screenDto.getMovieId()).getBody();
			screenDto.setMovieDetail(movieDto);
		}
		
		return screenDto;
	}

	@Override
	public List<ScreenDetailDto> getAllScreenByMPlexId(String mPlexId) {
		
		List<ScreenDetailDto> dtoList = new ArrayList<ScreenDetailDto>();
		
		this.repository.findAllByMultiplexId(mPlexId).forEach(
					(screen) -> {
						ScreenDetailDto dto = this.convertor.convertOriginalToDto(screen);
						if(dto != null && (dto.getMovieId() != null && dto.getMovieId().length()>0)) {
							//Fetching movie details from Movie MS & setting to the ScreenDetailDto before attaching to the list
							MovieDetailDto movieDto = this.movieProxy.getMovieById(dto.getMovieId()).getBody();
							dto.setMovieDetail(movieDto);
						}
						dtoList.add(dto);
					}
				);
		
		return dtoList;
		
	}

	@Override
	public ScreenDetailDto getScreenByScreenId(String screenId) {
		
		ScreenDetailDto dto = null;

		ScreenDetail screen = this.repository.findById(screenId).orElse(null);
		
		if(screen != null) {
			dto = this.convertor.convertOriginalToDto(screen);
			if(dto.getMovieId() != null) {
				//Fetching movie details from Movie MS & setting to the ScreenDetailDto before attaching to the list
				 
				MovieDetailDto movieDto = this.movieProxy.getMovieById(dto.getMovieId()).getBody(); 
				
				if(movieDto!=null)
					dto.setMovieDetail(movieDto);
			}
		}
		
		return dto;

	}

	@Override
	public ScreenDetailDto getScreenByMovieId(String movieId) {
		
		ScreenDetailDto dto = null;

		ScreenDetail screen = this.repository.findByMovieIdAndIsScreenAlive(movieId, true);
		
		if(screen != null) {
			dto = this.convertor.convertOriginalToDto(screen);
			//Fetching movie details from Movie MS & setting to the ScreenDetailDto before attaching to the list
			MovieDetailDto movieDto = this.movieProxy.getMovieById(dto.getMovieId()).getBody();
			dto.setMovieDetail(movieDto);
		}
		
		return dto;
	}

}
