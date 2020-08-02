package api.app.web.movie.movieplexmoviemicro.configuration;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.messages.Bucket;

@Service
public class MinioAdapter {

	@Autowired
    MinioClient minioClient;

    @Value("${minio.buckek.name}")
    String defaultBucketName;

    @Value("${minio.default.folder}")
    String defaultBaseFolder;

    public List<Bucket> getAllBuckets() {
        try {
            return minioClient.listBuckets();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }
 
	public void uploadFile(String name, InputStream content) {
		long fileSize = 0; 
        try { 
            
            byte[] contentBytes = IOUtils.toByteArray(content);;
            
            
            fileSize = contentBytes.length;
            
           
            minioClient.putObject(
            	     PutObjectArgs.builder().bucket(defaultBucketName).object(name).stream( 
            	    		 new ByteArrayInputStream(contentBytes), fileSize, -1)
            	         .build());
 
        } catch (Exception e) {
           throw new RuntimeException(e.getMessage());
        }

    }

    public byte[] getFile(String key) {
        try {
           @SuppressWarnings("deprecation")
		InputStream obj = minioClient.getObject(defaultBucketName, defaultBaseFolder + "/" + key); 
        	
            byte[] content = IOUtils.toByteArray(obj);
            obj.close();
            return content;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostConstruct
    public void init() {
    }
}
