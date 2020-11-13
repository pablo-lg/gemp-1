package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.domain.Segmento;
import ar.com.telecom.gemp.service.SegmentoService;
import ar.com.telecom.gemp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpEntity;

import javax.servlet.http.HttpServletRequest;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ar.com.telecom.gemp.domain.Segmento}.
 */
@RestController
@RequestMapping("/geographicAddressManagement/v1")
public class MuResource {

    private final Logger log = LoggerFactory.getLogger(MuResource.class);
    // private String server = "http://192.168.218.213:9090/geographicAddressManagement/v1/";
    @Value("${mu.http}")
    private String server;
    // private String server = "192.168.216.177";
    @Value("${mu.geographicport}")
    private int port;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    public MuResource (){
        
    }



    /**
     * {@code GET  /segmentos} : get all the segmentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of segmentos in body.
     */
    @RequestMapping("/**")
    @ResponseBody
    public String mirrorRest( HttpMethod method, HttpServletRequest request) throws URISyntaxException {
        String query = request.getQueryString();
        query = query.replace("%20", " ");
        URI uri = new URI("http", null, server, port, request.getRequestURI(), query, null);
        //RestTemplate restTemplate = new RestTemplate();
        log.debug("Uri MU :",request.getQueryString());
        log.debug("Uri MU :", request.getPathInfo());


        //URLEncoder.encode(nomFil, "UTF-8");

        String body = null;
        DefaultUriBuilderFactory defaultUriBuilderFactory = new DefaultUriBuilderFactory();
        defaultUriBuilderFactory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);
      
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setUriTemplateHandler(defaultUriBuilderFactory);
        ResponseEntity<String> responseEntity =
            restTemplate.exchange(uri, method, new HttpEntity<String>(body), String.class);
    
        return responseEntity.getBody();
    }


}
