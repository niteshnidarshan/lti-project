package api.app.web.screen.movieplexscreenmicro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients("api.app.web.screen.movieplexscreenmicro.feignproxy")
public class MovieplexScreenMicroApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieplexScreenMicroApplication.class, args);
	}

}
