package api.app.web.mplex.movieplexmplexmicro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients("api.app.web.mplex.movieplexmplexmicro.feignproxy")
public class MovieplexMplexMicroApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieplexMplexMicroApplication.class, args);
	}

}
