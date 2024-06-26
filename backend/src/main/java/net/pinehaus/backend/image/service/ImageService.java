package net.pinehaus.backend.image.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import javax.imageio.ImageIO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

  @Value("${app.image.path}")
  public String UPLOAD_DIR;
  private static final long MAX_FILE_SIZE = 10485760; // 10MB
  private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList("image/jpeg", "image/png");
  private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(".jpg", ".jpeg", ".png");

  public String saveImage(MultipartFile file, String name) throws IOException {
    validateImage(file);

    String extension = getFileExtension(file);

    Path path = Paths.get(getUploadDir() + name + extension);
    Files.write(path, file.getBytes());

    return name + extension;
  }


  private String getUploadDir() {
    if (!UPLOAD_DIR.endsWith(File.separator)) {
      return UPLOAD_DIR + File.separator;

    }

    return UPLOAD_DIR;
  }

  private String getFileExtension(MultipartFile file) {
    String originalFilename = file.getOriginalFilename();
    assert originalFilename != null;
    return originalFilename.substring(originalFilename.lastIndexOf("."));
  }

  private void validateImage(MultipartFile file) throws IOException {
    if (file.getSize() > MAX_FILE_SIZE) {
      throw new IOException("File size exceeds limit");
    }

    String mimeType = file.getContentType();
    if (mimeType == null || !ALLOWED_MIME_TYPES.contains(mimeType)) {
      throw new IOException("Invalid MIME type");
    }

    String extension = getFileExtension(file);
    if (!ALLOWED_EXTENSIONS.contains(extension)) {
      throw new IOException("Invalid file extension");
    }

    BufferedImage image = ImageIO.read(file.getInputStream());
    if (image == null) {
      throw new IOException("File is not an image");
    }
  }
}