package api.app.web.user.movieplexusermicro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients("api.app.web.user.movieplexusermicro.feignproxy")
public class MovieplexUserMicroApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieplexUserMicroApplication.class, args);
	}

}
