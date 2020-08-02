package api.app.web.movie.movieplexmoviemicro.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient; 

@Configuration
public class MinioConfig {

	@Value("${minio.access.name}")
    private String accessKey;
    @Value("${minio.access.secret}")
    private String accessSecret;
    @Value("${minio.url}")
    private String minioUrl;

    @Bean
    public MinioClient generateMinioClient() {
        try {
        	// Create a minioClient with the MinIO Server name, Port, Access key and Secret key.
            @SuppressWarnings("deprecation")
			MinioClient client = new MinioClient(minioUrl, accessKey, accessSecret);
            
         // Check if the bucket already exists.
            boolean isExist = client.bucketExists(BucketExistsArgs.builder().bucket("movieplexa").build());
            if(isExist) {
              System.out.println("Bucket already exists.");
            } else {
              // Make a new bucket called movieplexa.
              client.makeBucket(MakeBucketArgs.builder().bucket("movieplexa").build());
            }
            
            
            return client;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }
}
