package api.app.web.movie.movieplexmoviemicro.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

//import com.amazonaws.services.s3.model.S3Object;
//import com.amazonaws.services.s3.model.S3ObjectInputStream;
//import com.amazonaws.util.IOUtils;

import api.app.web.movie.movieplexmoviemicro.aws.service.AWSFileService;
import api.app.web.movie.movieplexmoviemicro.configuration.MinioAdapter;
import api.app.web.movie.movieplexmoviemicro.dto.MovieDetailDto;
import api.app.web.movie.movieplexmoviemicro.dto.MovieExceptionDto;
import api.app.web.movie.movieplexmoviemicro.exception.CommonException;
import api.app.web.movie.movieplexmoviemicro.service.MovieService;
 

@RestController
@RequestMapping("api/media")
public class MovieMediaController {

private static final Logger logger = LoggerFactory.getLogger(MovieMediaController.class);
	
	//@Autowired
	//private FileStorageService fileStorageService;
	
	@Autowired
	private MovieService service;
	
	//@Autowired
	//private AWSFileService awsService;
	
	@Autowired
    MinioAdapter minioAdapter;
	
	//@Value("${app.awsServices.bucketName}")
    //private String bucketName;
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
	@PostMapping("/uploadMultipleFiles/{movieId}/save")
    public ResponseEntity<MovieDetailDto> uploadFile(@PathVariable("movieId") String movieId, @RequestParam("image") MultipartFile file) {

		/* local storage of upload image starts */
			/*String fileName = fileStorageService.storeFile(file, movieId); 
	        
	        String fileDownloadUrix = ServletUriComponentsBuilder.fromCurrentContextPath().toString(); 
	        
	        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
	                .path("/downloadFile/") ///api/media/user
	                .path(fileName)
	                .toUriString();*/
		/* local storage of upload image ends */
		
		/* Amazon S3 bucket upload starts */ 
		 //String fileName = StringUtils.cleanPath(file.getOriginalFilename());
         //fileName = movieId+"_"+fileName;
        
         //File fileToUpload = convertMultiPartFileToFile(file);
        
         //awsService.uploadFileToS3bucket(fileName, fileToUpload, bucketName);
        
        /* Amazon S3 bucket upload ends */ 
		
		String fileName = "";
		/* minio file upload starts */
		try {
			fileName = StringUtils.cleanPath(file.getOriginalFilename());
	        fileName = movieId+"_"+fileName; 
	        minioAdapter.uploadFile(fileName, file.getInputStream());
		} catch (IOException e) {
			throw new CommonException("Something wrong while upload image ... "+e);
		}  
		/* minio file upload ends */
		
        String finalDownloadURI = "/MoviePlex-Movie-Micro/api/media/downloadFile/"+fileName;
        
        System.out.println("finalDownloadURI ================== "+finalDownloadURI+"  | movieId ==================="+movieId);
         
        //Update filename+movieId to movieId record  
        MovieDetailDto returnDto = this.service.updateMoviePoster(movieId, finalDownloadURI);
        
       
        ResponseEntity<MovieDetailDto> response = new ResponseEntity<MovieDetailDto>(returnDto, HttpStatus.OK);
        
        return response;
    }
	
	//@PostMapping("/uploadMultipleFiles/{movieId}/save")
   /* public List<List<String>> uploadMultipleFiles(@PathVariable("movieId") String movieId, @RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(movieId, file))
                .collect(Collectors.toList());
    }*/
	
	@GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
      
		/* local storage of download image starts */
		
			/*  // Load file as Resource
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
		   */ 
		
		/* local storage of download image ends */
		
		/* Amazon S3 bucket upload starts */
			/* String contentType = null;
			
			if(contentType == null) {
	            contentType = "application/octet-stream";
	        }
		   
			final byte[] data = downloadAWSS3File(fileName, bucketName);
	        final ByteArrayResource resource = new ByteArrayResource(data);
	          
	        return ResponseEntity.ok()
	                .contentType(MediaType.IMAGE_JPEG)
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
	                .body(resource);
	        */
        /* Amazon S3 bucket upload ends */
		
		
		byte[] data = minioAdapter.getFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
	
	private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
        	System.out.println(e);
            //log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }
	/* 
	 * Code for AWS S3 upload/ download
	public byte[] downloadAWSS3File(String bucket_name, String fileName) {
		byte[] content = null;
		
		S3Object s3Object = this.awsService.downloadFileFromS3bucket(bucket_name, fileName);
		
		final S3ObjectInputStream stream = s3Object.getObjectContent();
        try {
            content = IOUtils.toByteArray(stream);
            System.out.println("File downloaded successfully.");
            s3Object.close();
        } catch(final IOException ex) {
            System.out.println("IO Error Message= " + ex.getMessage());
        }
        return content;
	}*/
	
	@ExceptionHandler(CommonException.class)
	public ResponseEntity<MovieExceptionDto> movieExceptionController(CommonException ex){

		logger.error(ex.getMessage());
		
		MovieExceptionDto dto = new MovieExceptionDto(ex.getMessage(), HttpStatus.BAD_REQUEST.value(), System.currentTimeMillis());
		
		ResponseEntity<MovieExceptionDto> response = new ResponseEntity<MovieExceptionDto>(dto, HttpStatus.BAD_REQUEST);
		
		return response;
		
	}
}
