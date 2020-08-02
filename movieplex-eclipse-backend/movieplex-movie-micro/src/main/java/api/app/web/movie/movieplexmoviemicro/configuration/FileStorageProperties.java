package api.app.web.movie.movieplexmoviemicro.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;
//@ConfigurationProperties(prefix="spring.servlet.multipart",ignoreUnknownFields=false)
//@ConfigurationProperties(prefix="file")
@Getter
@Setter
public class FileStorageProperties {

	/**
	 * The @ConfigurationProperties(prefix = "file") annotation does its job on application startup 
	 * and binds all the properties with prefix file to the corresponding fields of the POJO class.
	 *
	 * If you define additional file properties in future, you may simply add a corresponding field in the
 	 * above class, and spring boot will automatically bind the field with the property value.
	 */

	private String uploadDir;
}
