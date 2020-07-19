package api.app.web.mplex.movieplexmplexmicro.service;

import java.util.List;

import api.app.web.mplex.movieplexmplexmicro.dto.MPlexDetailDto;
import api.app.web.mplex.movieplexmplexmicro.dto.ScreenDetailDto;

public interface MultiplexService {
	
	public MPlexDetailDto registerMPlex(MPlexDetailDto dto);
	public MPlexDetailDto modifyMplex(MPlexDetailDto dto);
	public boolean deleteMplex(String multiplexId);
	public MPlexDetailDto getMPlexById(String id);
	public MPlexDetailDto getMPlexByName(String name);
	public List<MPlexDetailDto> getAllMPlex();
	public List<MPlexDetailDto> getAllMPlexByLocation(String location_alike);
	public List<ScreenDetailDto> getAllScreen(String multiplexId);
	public List<MPlexDetailDto> getAllMplexByAssociatedUserId(String associatedUserId);
	
}
