package ar.com.telecom.gemp.web.rest;

import ar.com.telecom.gemp.service.FileStorageService;
// modificar los path
import ar.com.telecom.gemp.web.rest.UploadFileResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RequestMapping("/api")
@RestController
public class FileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file, @RequestHeader("emprendimiento") String emprendimiento) {
        String fileName = fileStorageService.storeFile(file, emprendimiento);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/").path(fileName).toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(
        @RequestParam("files") MultipartFile[] files,
        @RequestHeader("emprendimiento") String emprendimiento
    ) {
        return Arrays.asList(files).stream().map(file -> uploadFile(file, emprendimiento)).collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(
        @PathVariable String fileName,
        HttpServletRequest request,
        @RequestHeader("emprendimiento") String emprendimiento
    ) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName, emprendimiento);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity
            .ok()
            .contentType(MediaType.parseMediaType(contentType))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
            .body(resource);
    }

    @GetMapping("/allFiles")
    public List<String> allFiles(HttpServletRequest request, @RequestHeader("emprendimiento") String emprendimiento) {
        // Load file as Resource
        List files = new ArrayList((HashSet) fileStorageService.listFiles(emprendimiento));

        // return (List<String>) fileStorageService.listFiles(emprendimiento);
        return files;
    }

    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestParam("file") String file, @RequestHeader("emprendimiento") String emprendimiento) {
        String fileName = fileStorageService.deleteFile(file, emprendimiento);

        return "Archivo eliminado: " + fileName;
    }
}
