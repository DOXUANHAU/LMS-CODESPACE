package com.lms_backend.lms_project.service;

import java.util.stream.Collectors;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DocxParserService {

    public String extract(MultipartFile file) {
        try (XWPFDocument doc = new XWPFDocument(file.getInputStream())) {
            System.out.println("extracting docx");
            return doc.getParagraphs()
                    .stream()
                    .map(XWPFParagraph::getText)
                    .collect(Collectors.joining("\n"));
        } catch (Exception e) {
            throw new RuntimeException("Cannot read docx", e);
        }
    }
}
