package ar.com.telecom.gemp.service;

import ar.com.telecom.gemp.config.FileStorageProperties;
import ar.com.telecom.gemp.service.FileStorageException;
import ar.com.telecom.gemp.service.MyFileNotFoundException;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Repository
public class FileStorageService {
    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, String emprendimiento) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path p = Paths.get("/home/pablo/upload/" + emprendimiento);
            // Path targetLocation = p.resolve(fileName);

            try {
                Files.createDirectories(p);
            } catch (Exception ex) {
                throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
            }

            Path targetLocation = p.resolve(fileName);

            // Copy file to the target location (Replacing existing file with the same name)
            // Path targetLocation = this.fileStorageLocation.resolve(emprendimiento + '/' +fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName, String emprendimiento) {
        try {
            Path filePath = this.fileStorageLocation.resolve(emprendimiento + '/' + fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public Set<String> listFiles(String emprendimiento) {
        try {
            return Stream
                .of(new File("/home/pablo/upload/" + emprendimiento).listFiles())
                .filter(file -> !file.isDirectory())
                .map(File::getName)
                .collect(Collectors.toSet());
        } catch (Exception ex) {
            throw new MyFileNotFoundException("No hay archivos en el emprendimiento " + emprendimiento);
        }
    }

    public String deleteFile(String file, String emprendimiento) {
        // Normalize file name
        try {
            Path p = Paths.get("/home/pablo/upload/" + emprendimiento + "/" + file);
            Files.delete(p);

            return "Archivo borrado: " + file;
        } catch (IOException ex) {
            throw new FileStorageException("No es posible eliminar el archivo " + file + ". ", ex);
        }
    }
}
