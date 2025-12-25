package com.lms_backend.lms_project.serviceimpl;


import java.io.File;
import java.io.FileOutputStream;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import com.lms_backend.lms_project.Utility.CustomMultipartFile;
import com.lms_backend.lms_project.dao.UserDAO;
import com.lms_backend.lms_project.entity.User;
import com.lms_backend.lms_project.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class StorageServiceImpl implements StorageService {

    @Value("${com.lms.profile.image.folder.path}")
    private String PROFILE_PIC_BASEPATH;

    @Value("${com.lms.course.video.folder.path}")
    private String COURSE_VIDEO_BASEPATH;

    @Value("${com.lms.course.notes.folder.path}")
    private String COURSE_NOTE_BASEPATH;

    @Value("${com.lms.course.document.folder.path}")
    private String COURSE_DOCUMENT_BASEPATH;

    @Override
    public List<String> loadAll() {
        File dirPath = new File(PROFILE_PIC_BASEPATH);
        return Arrays.asList(dirPath.list());
    }

    @Override
    public String store(MultipartFile file) {

        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

        String fileName = UUID.randomUUID().toString().replaceAll("-", "") + ext;
        File filePath = new File(PROFILE_PIC_BASEPATH, fileName);
        try (FileOutputStream out = new FileOutputStream(filePath)) {
            FileCopyUtils.copy(file.getInputStream(), out);
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Resource load(String fileName) {
        File filePath = new File(PROFILE_PIC_BASEPATH, fileName);
        if (filePath.exists())
            return new FileSystemResource(filePath);
        return null;
    }

    @Override
    public void delete(String fileName) {
        File filePath = new File(PROFILE_PIC_BASEPATH, fileName);
        if (filePath.exists())
            filePath.delete();
    }

    @Override
    public List<String> loadAllCourseVideo() {
        File dirPath = new File(COURSE_VIDEO_BASEPATH);
        return Arrays.asList(dirPath.list());
    }

    @Override
    public String storeCourseVideo(MultipartFile file) {

        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

        String fileName = UUID.randomUUID().toString().replaceAll("-", "") + ext;
        File filePath = new File(COURSE_VIDEO_BASEPATH, fileName);
        try (FileOutputStream out = new FileOutputStream(filePath)) {
            FileCopyUtils.copy(file.getInputStream(), out);
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Resource loadCourseVideo(String fileName) {
        File filePath = new File(COURSE_VIDEO_BASEPATH, fileName);
        if (filePath.exists())
            return new FileSystemResource(filePath);
        return null;
    }

    @Override
    public void deleteCourseVideo(String fileName) {
        File filePath = new File(COURSE_VIDEO_BASEPATH, fileName);
        if (filePath.exists())
            filePath.delete();
    }

    @Override
    public List<String> loadAllCourseNote() {
        File dirPath = new File(COURSE_NOTE_BASEPATH);
        return Arrays.asList(dirPath.list());
    }

    @Override
    public String storeCourseNote(MultipartFile file) {

        String ext = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

        String fileName = UUID.randomUUID().toString().replaceAll("-", "") + ext;
        File filePath = new File(COURSE_NOTE_BASEPATH, fileName);
        try (FileOutputStream out = new FileOutputStream(filePath)) {
            FileCopyUtils.copy(file.getInputStream(), out);
            return fileName;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Resource loadCourseNote(String fileName) {
        File filePath = new File(COURSE_NOTE_BASEPATH, fileName);
        if (!filePath.exists()) {
            System.err.println("File not found: " + filePath.getAbsolutePath());
            return null;
        }
        return new FileSystemResource(filePath);
    }

    @Override
    public void deleteCourseNote(String fileName) {
        File filePath = new File(COURSE_NOTE_BASEPATH, fileName);
        if (filePath.exists())
            filePath.delete();
    }

    @Override
    public MultipartFile getCourseNoteAndThumbnailAsMultipartFile(String fileName) {
        File file = new File(COURSE_NOTE_BASEPATH + "/" + fileName); // courseNotesLocation là thư mục lưu trữ
        return new CustomMultipartFile(file);
    }

    // @Override
    // public List<String> loadAllCourseDocument() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'loadAllCourseDocument'");
    // }

    // @Override
    // public String storeCourseDocument(MultipartFile file) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'storeCourseDocument'");
    // }

    @Override
public String storeCourseDocument(MultipartFile file) {

    String originalName = file.getOriginalFilename();
    String ext = originalName.substring(originalName.lastIndexOf("."));

    // chỉ cho phép doc / docx
    if (!ext.equalsIgnoreCase(".doc") && !ext.equalsIgnoreCase(".docx")) {
        throw new RuntimeException("Only DOC/DOCX files are allowed");
    }

    String fileName = UUID.randomUUID().toString().replace("-", "") + ext;
    File dir = new File(COURSE_DOCUMENT_BASEPATH);

    if (!dir.exists()) {
        dir.mkdirs();
    }

    File filePath = new File(dir, fileName);

    try (FileOutputStream out = new FileOutputStream(filePath)) {
        FileCopyUtils.copy(file.getInputStream(), out);
        return fileName;
    } catch (Exception e) {
        throw new RuntimeException("Failed to store course document", e);
    }
}
@Override
public List<String> loadAllCourseDocument() {
    File dirPath = new File(COURSE_DOCUMENT_BASEPATH);
    if (!dirPath.exists()) {
        return List.of();
    }
    return Arrays.asList(dirPath.list());
}

@Override
public Resource loadCourseDocument(String fileName) {
    File filePath = new File(COURSE_DOCUMENT_BASEPATH, fileName);

    if (!filePath.exists()) {
        throw new RuntimeException("Course document not found: " + fileName);
    }

    return new FileSystemResource(filePath);
}


}

