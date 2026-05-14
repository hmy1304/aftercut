package picstory.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import picstory.backend.service.S3Service;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/upload")
@RequiredArgsConstructor
public class FileController {

    private final S3Service s3Service;

    /**
     * POST /upload
     * 이미지를 S3에 업로드하고 Public URL을 반환한다.
     *
     * Request  : multipart/form-data  { file: File, dir?: String }
     * Response : { "url": "https://bucket.s3.region.amazonaws.com/images/uuid.jpg" }
     */
    @PostMapping
    public ResponseEntity<Map<String, String>> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "dir", defaultValue = "images") String dir
    ) throws IOException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "파일이 비어있습니다."));
        }

        String url = s3Service.upload(file, dir);
        return ResponseEntity.ok(Map.of("url", url));
    }

    /**
     * DELETE /upload
     * S3에서 파일을 삭제한다.
     *
     * Request  : { "url": "https://..." }
     * Response : 204 No Content
     */
    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestBody Map<String, String> body) {
        String fileUrl = body.get("url");
        if (fileUrl == null || fileUrl.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        s3Service.delete(fileUrl);
        return ResponseEntity.noContent().build();
    }
}