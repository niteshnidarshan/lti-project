package api.app.web.movie.movieplexmoviemicro.aws.service;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.model.PutObjectRequest;
//import com.amazonaws.services.s3.model.S3Object;


/**
 * 
 * For file upload/ download to AWS s3 bucket
 * @author niteshnidarshan
 *
 */
//@Service
public class AWSFileServiceImpl{// implements AWSFileService{
	
	//@Autowired
	//private AmazonS3 amazonS3Client;
/*
	@Override
	public void uploadFileToS3bucket(String fileName, File file, String bucketName) {
		amazonS3Client.putObject(new PutObjectRequest(bucketName, fileName, file));
		
	}

	@Override
	public S3Object downloadFileFromS3bucket(String fileName, String bucketName) {
		S3Object object = amazonS3Client.getObject(bucketName,  fileName);
        return object;
	}

	@Override
	public void deleteFileFromS3bucket(String fileName, String bucketName) {
		amazonS3Client.deleteObject(bucketName, fileName);
		
	}*/

}
