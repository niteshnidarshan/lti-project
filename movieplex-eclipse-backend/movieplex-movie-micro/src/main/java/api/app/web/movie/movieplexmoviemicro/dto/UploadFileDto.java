package api.app.web.movie.movieplexmoviemicro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UploadFileDto {
	
	private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private String caption;
    private String description;
    private long size;

}
