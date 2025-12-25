package com.lms_backend.lms_project.Utility;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@JsonIgnoreProperties({"inputStream", "bytes"})
public class CustomMultipartFile implements MultipartFile {
    private final File file;

    public CustomMultipartFile(File file) {
        this.file = file;
    }

    @Override
    public String getName() {
        return file.getName();  // Trả về tên của file
    }

    @Override
    public String getOriginalFilename() {
        return file.getName();  // Trả về tên gốc của file
    }

    @Override
    public String getContentType() {
        return null;
    }

    @Override
    public boolean isEmpty() {
        return false;
    }

    @Override
    public long getSize() {
        return file.length();  // Trả về kích thước file
    }

    @Override
    public byte[] getBytes() throws IOException {
        // Đọc tất cả byte từ file và trả về mảng byte
        try (FileInputStream fileInputStream = new FileInputStream(file)) {
            return fileInputStream.readAllBytes();
        }
    }

    @Override
    public InputStream getInputStream() throws IOException {
        // Trả về InputStream của file
        return new FileInputStream(file);
    }

    @Override
    public void transferTo(File dest) throws IOException, IllegalStateException {
        // Sao chép file đến vị trí đích
        try (FileInputStream inputStream = new FileInputStream(file)) {
            java.nio.file.Files.copy(inputStream, dest.toPath());
        }
    }
}

