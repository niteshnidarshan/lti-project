package api.app.web.movie.movieplexmoviemicro.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import api.app.web.movie.movieplexmoviemicro.dto.MovieDetailDto;
import api.app.web.movie.movieplexmoviemicro.dto.UploadFileDto;
import api.app.web.movie.movieplexmoviemicro.service.FileStorageService;
import api.app.web.movie.movieplexmoviemicro.service.MovieService;
 

@RestController
@RequestMapping("api/media")
public class MovieMediaController {

private static final Logger logger = LoggerFactory.getLogger(MovieMediaController.class);
	
	@Autowired
	private FileStorageService fileStorageService;
	
	@Autowired
	private MovieService service;
	/*
	@PostMapping("/upload-movie-pic/{movieId}/save")
    public ResponseEntity<MovieDetailDto> uploadFile(@PathVariable("movieId") String movieId, @RequestParam("file") MultipartFile file) {

        String fileName = fileStorageService.storeFile(file, movieId);
        
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/media/downloadFile/") ///api/media/user
                .path(fileName)
                .toUriString();
        
        //Update filename+movieId to movieId record  
        MovieDetailDto returnDto = this.service.updateMoviePoster(movieId, fileName);

        //return new UploadFileDto(fileName, fileDownloadUri, file.getContentType(), file.getSize());
        ResponseEntity<MovieDetailDto> response = new ResponseEntity<MovieDetailDto>(returnDto, HttpStatus.OK);
        
        return response;
    }
	*/
	//@PostMapping("/upload-movie-pic-")
    public List<String> uploadFile(String movieId, MultipartFile file) {

        String fileName = fileStorageService.storeFile(file, movieId);
        
        String fileDownloadUrix = ServletUriComponentsBuilder.fromCurrentContextPath().toString();
        System.out.println("Imhere="+fileDownloadUrix);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/") ///api/media/user
                .path(fileName)
                .toUriString();
        

        //Update filename+movieId to movieId record  
        MovieDetailDto returnDto = this.service.updateMoviePoster(movieId, fileName);
        
        String posterUrl = returnDto.getPosterURL();
        
        List<String> posterUrlList = new ArrayList<String>();
        
        if(posterUrl != null && posterUrl.contains(",")) {
        	String posterUrls[] = posterUrl.split(",");
        	posterUrlList = Arrays.asList(posterUrls);
        }
        else
        {
        	posterUrlList.add(posterUrl);
        }
        
        //return new UploadFileDto(fileName, fileDownloadUri, file.getContentType(), "caption", "discription", file.getSize());
        return posterUrlList;
    }
	
	@PostMapping("/uploadMultipleFiles/{movieId}/save")
    public List<List<String>> uploadMultipleFiles(@PathVariable("movieId") String movieId, @RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(movieId, file))
                .collect(Collectors.toList());
    }
	
	@GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type 
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
