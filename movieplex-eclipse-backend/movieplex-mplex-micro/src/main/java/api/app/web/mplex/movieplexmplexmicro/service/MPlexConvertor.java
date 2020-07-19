package api.app.web.mplex.movieplexmplexmicro.service;

import org.springframework.stereotype.Component;

import api.app.web.mplex.movieplexmplexmicro.document.MPlexDetail;
import api.app.web.mplex.movieplexmplexmicro.dto.MPlexDetailDto;

@Component
public class MPlexConvertor {

	public MPlexDetail convertDtoToOriginal(MPlexDetailDto dto) {
		return new MPlexDetail(dto.getMultiplexId(), dto.getName(), dto.getLocation(), dto.getScreenDetailList(), dto.getNumberOfScreens(), dto.getAssociatedUserId(), dto.isAlive(), dto.getMPlexCreateTimeStamp(), dto.getMPlexModifiedTimeStamp());
	}
	
	public MPlexDetailDto convertOriginalToDto(MPlexDetail mPlex) {
		return new MPlexDetailDto(mPlex.getMultiplexId(), mPlex.getName(), mPlex.getLocation(), mPlex.getScreenDetailList(), mPlex.getNumberOfScreens(), mPlex.getAssociatedUserId(), mPlex.isAlive(), mPlex.getMPlexCreateTimeStamp(), mPlex.getMPlexModifiedTimeStamp());
	}
}
