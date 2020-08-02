package api.app.web.movie.movieplexmoviemicro.aws;
 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//import com.amazonaws.auth.AWSCredentialsProvider;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;

//@Configuration
public class AWSS3Config {
	
	/**
	 * For file upload/ download to AWS s3 bucket
	 */
	
	// Access key id will be read from the application.properties file during the application intialization.
   // @Value("${cloud.aws.credentials.accessKey}")
   // private String accessKeyId;
    // Secret access key will be read from the application.properties file during the application intialization.
   // @Value("${cloud.aws.credentials.secretKey}")
   // private String secretAccessKey;
    // Region will be read from the application.properties file  during the application intialization.
   // @Value("${cloud.aws.region.static}")
   // private String region;
    
    //@Bean
   /* public AmazonS3 amazonS3Client(AWSCredentialsProvider credentialsProvider, @Value("${cloud.aws.region.static}") String region) {
    	return AmazonS3ClientBuilder
    			.standard()
    			.withCredentials(credentialsProvider)
    			.withRegion(region)
    			.build();
    }*/

}
