package api.app.web.mplex.movieplexmplexmicro.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import api.app.web.mplex.movieplexmplexmicro.dao.MultiplexRepository;
import api.app.web.mplex.movieplexmplexmicro.document.MPlexDetail;
import api.app.web.mplex.movieplexmplexmicro.dto.MPlexDetailDto;
import api.app.web.mplex.movieplexmplexmicro.dto.ScreenDetailDto;
import api.app.web.mplex.movieplexmplexmicro.feignproxy.ScreenFeignProxy;

@Service
public class MultiplexServiceImpl implements MultiplexService {

	@Autowired
	private MPlexConvertor convertor;
	
	@Autowired
	private MultiplexRepository repository;
	
	@Autowired
	private ScreenFeignProxy screenProxy;
	
	@Override
	public MPlexDetailDto registerMPlex(MPlexDetailDto dto) {
		
		MPlexDetailDto returnDto = null;
		
		MPlexDetail mPlex = this.convertor.convertDtoToOriginal(dto);
		
		mPlex.setMultiplexId(null); 
		mPlex.setAlive(true);
		mPlex.setMPlexCreateTimeStamp(new Date(System.currentTimeMillis()));
		
		mPlex = this.repository.save(mPlex);
		
		if(mPlex != null)
			returnDto = this.convertor.convertOriginalToDto(mPlex);
		
		return returnDto;
		
	}

	@Override
	public MPlexDetailDto modifyMplex(MPlexDetailDto dto) {
		
		MPlexDetailDto returnDto = null;
		
		MPlexDetail mPlex = this.repository.findById(dto.getMultiplexId()).orElse(null);
		
		if(mPlex != null){
			mPlex.setAssociatedUserId(dto.getAssociatedUserId());
			mPlex.setLocation(dto.getLocation());
			mPlex.setName(dto.getName());
			mPlex.setNumberOfScreens(dto.getNumberOfScreens());
			mPlex.setScreenDetailList(dto.getScreenDetailList());
			mPlex.setMPlexModifiedTimeStamp(new Date(System.currentTimeMillis()));
			
			mPlex = this.repository.save(mPlex);
	
		}
		
		if(mPlex != null) {
			returnDto = this.convertor.convertOriginalToDto(mPlex);
			List<ScreenDetailDto> screenList = this.screenProxy.getAllScreenByMultiplex(returnDto.getMultiplexId()).getBody();
			returnDto.setScreenDetailList(screenList);
		}
		
		
		return returnDto;
		
	}

	@Override
	public boolean deleteMplex(String multiplexId) {
		
		MPlexDetail mPlex = this.repository.findById(multiplexId).orElse(null);
		
		if(mPlex != null){
			mPlex.setAlive(false);
			
			mPlex = this.repository.save(mPlex);
	
		}
		
		if(mPlex != null) {
			return true;
		}
		
		return false;
	}

	@Override
	public MPlexDetailDto getMPlexById(String id) {
		
		MPlexDetailDto dto = null;
		
		MPlexDetail mPlex = this.repository.findById(id).orElse(null);
		
		if(mPlex != null) {
			dto = this.convertor.convertOriginalToDto(mPlex);
			List<ScreenDetailDto> screenList = this.screenProxy.getAllScreenByMultiplex(dto.getMultiplexId()).getBody();
			dto.setScreenDetailList(screenList);
		}
		
		return dto;
	}
	
	@Override
	public MPlexDetailDto getMPlexByName(String name) {
		
		MPlexDetailDto dto = null;
		
		MPlexDetail mPlex = this.repository.findByName(name);
		
		if(mPlex != null) {
			dto = this.convertor.convertOriginalToDto(mPlex);
			List<ScreenDetailDto> screenList = this.screenProxy.getAllScreenByMultiplex(dto.getMultiplexId()).getBody();
			dto.setScreenDetailList(screenList);
		}
		
		return dto;
	}

	@Override
	public List<MPlexDetailDto> getAllMPlex() {
		
		List<MPlexDetailDto> dtoList = new ArrayList<MPlexDetailDto>();
		
		this.repository.findAll().forEach(
					(mPlex) -> {
						MPlexDetailDto dto = this.convertor.convertOriginalToDto(mPlex);
						List<ScreenDetailDto> screenList = this.screenProxy.getAllScreenByMultiplex(dto.getMultiplexId()).getBody();
						dto.setScreenDetailList(screenList);
						dtoList.add(dto);
					}
				);
		return dtoList;
	}

	@Override
	public List<MPlexDetailDto> getAllMPlexByLocation(String location_alike) {
		List<MPlexDetailDto> dtoList = new ArrayList<MPlexDetailDto>();
		
		this.repository.findAllByLocationLike(location_alike).forEach(
					(mPlex) -> {
						MPlexDetailDto dto = this.convertor.convertOriginalToDto(mPlex);
						List<ScreenDetailDto> screenList = this.screenProxy.getAllScreenByMultiplex(dto.getMultiplexId()).getBody();
						dto.setScreenDetailList(screenList);
						dtoList.add(dto);
					}
				);
		return dtoList;
	}
	
	public List<MPlexDetailDto> getAllMplexByAssociatedUserId(String associatedUserId){
		
		List<MPlexDetailDto> dtoList = new ArrayList<MPlexDetailDto>();
		
		this.repository.findAllByAssociatedUserId(associatedUserId).forEach(
					(mPlex) -> {
						MPlexDetailDto dto = this.convertor.convertOriginalToDto(mPlex);
						List<ScreenDetailDto> screenList = this.screenProxy.getAllScreenByMultiplex(dto.getMultiplexId()).getBody();
						dto.setScreenDetailList(screenList);
						dtoList.add(dto);
					}
				);
		
		return dtoList;
	}

	@Override
	public List<ScreenDetailDto> getAllScreen(String multiplexId) {
		List<ScreenDetailDto> screenList = this.screenProxy.getAllScreenByMultiplex(multiplexId).getBody();
		return screenList;
	}

}
