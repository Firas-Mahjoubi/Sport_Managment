package com.example.sport_backend.ServiceImpl.Matches;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;

@Service
public class FileStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);
    private final String uploadDir;
    private Path fileStorageLocation;

    public FileStorageService(@Value("${app.file.upload-dir:C:/Users/ASUS/Desktop/ragModel/rag_data}") String uploadDir) {
        this.uploadDir = uploadDir;
        try {
            this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
            logger.info("Configured upload directory: {}", this.fileStorageLocation);
        } catch (Exception e) {
            logger.error("Failed to resolve upload directory path: {}. Using default.", uploadDir, e);
            this.fileStorageLocation = Paths.get("C:/Users/ASUS/Desktop/ragModel/rag_data").toAbsolutePath().normalize();
        }
    }

    private void ensureDirectoryExists() throws IOException {
        if (this.fileStorageLocation == null) {
            throw new IOException("Upload directory path is not initialized.");
        }
        if (!Files.exists(this.fileStorageLocation)) {
            try {
                Files.createDirectories(this.fileStorageLocation);
                logger.info("Created upload directory: {}", this.fileStorageLocation);
            } catch (IOException e) {
                logger.error("Failed to create upload directory: {}", this.fileStorageLocation, e);
                throw new IOException("Cannot create upload directory: " + this.fileStorageLocation, e);
            }
        }
        if (!Files.isDirectory(this.fileStorageLocation) || !Files.isWritable(this.fileStorageLocation)) {
            logger.error("Upload path is not a writable directory: {}", this.fileStorageLocation);
            throw new IOException("Upload path is not a writable directory: " + this.fileStorageLocation);
        }
    }

    public String storeFile(MultipartFile file) throws IOException {
        // Validate file
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty or not provided.");
        }

        // Validate file type
        String contentType = file.getContentType();
        if (!"application/pdf".equals(contentType)) {
            throw new IllegalArgumentException("Only PDF files are allowed.");
        }

        // Ensure directory exists before saving
        ensureDirectoryExists();

        // Normalize file name to avoid duplicates using timestamp
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName != null && originalFileName.contains(".")
                ? originalFileName.substring(originalFileName.lastIndexOf("."))
                : ".pdf";
        String fileName = new Date().getTime() + "-file" + fileExtension;

        // Save file
        Path targetLocation = this.fileStorageLocation.resolve(fileName);
        logger.info("Saving file to: {}", targetLocation);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }
}