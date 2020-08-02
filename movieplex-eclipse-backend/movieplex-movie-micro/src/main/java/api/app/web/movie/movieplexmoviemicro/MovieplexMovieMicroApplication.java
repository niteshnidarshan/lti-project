package api.app.web.movie.movieplexmoviemicro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import api.app.web.movie.movieplexmoviemicro.configuration.FileStorageProperties;

@SpringBootApplication
@EnableEurekaClient
//@EnableConfigurationProperties({
//	FileStorageProperties.class
//})
public class MovieplexMovieMicroApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieplexMovieMicroApplication.class, args);
	}

}
