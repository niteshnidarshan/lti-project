package app.api.ag.movieplexapigateway.filter;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

@Component
public class LoggingFilter extends ZuulFilter{
	
	/**
	 * This class is responsible to maintain Log on console for every request url
	 */

	Logger logger = LoggerFactory.getLogger(getClass());
	
	@Override
	public boolean shouldFilter() {
		
		//true : this filter to be active
		//false : to inactive
		
		return true;
	}

	@Override
	public Object run() throws ZuulException {
		
		//What to do in case request is intercepted 
		//This class is responsible to maintain Log on console for every request url
		
		HttpServletRequest request = RequestContext.getCurrentContext().getRequest();
		
		logger.info("Request intercepted as : "+request.getRequestURL());
		
		
		return null;
	}

	@Override
	public String filterType() {
		
		//pre - to run this filter class at pre request handle
		//post - to run this filter class at post request handle
		
		return "pre";
	}

	@Override
	public int filterOrder() {
		//Lower the value higher the priority
		return 0;
	}

}
