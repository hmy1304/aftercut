package picstory.backend.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    /**
     * S3에 파일 업로드 후 Public URL 반환
     *
     * @param file    업로드할 MultipartFile
     * @param dirName S3 내 저장 디렉토리 (예: "images")
     * @return 업로드된 파일의 Public URL
     */
    public String upload(MultipartFile file, String dirName) throws IOException {
        String ext = extractExtension(file.getOriginalFilename());
        String s3Key = dirName + "/" + UUID.randomUUID() + ext;

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucket)
                .key(s3Key)
                .contentType(file.getContentType())
                .contentLength(file.getSize())
                .build();

        s3Client.putObject(request,
                RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        String url = buildUrl(s3Key);
        log.info("S3 업로드 완료 → {}", url);
        return url;
    }

    /**
     * S3에서 파일 삭제
     *
     * @param fileUrl 삭제할 파일의 Full URL (업로드 시 반환된 URL)
     */
    public void delete(String fileUrl) {
        if (fileUrl == null || fileUrl.isBlank()) return;

        String s3Key = extractKey(fileUrl);
        s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(bucket)
                .key(s3Key)
                .build());

        log.info("S3 삭제 완료 → {}", s3Key);
    }

    // ── private helpers ──────────────────────────────────────

    private String buildUrl(String s3Key) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucket, region, s3Key);
    }

    private String extractKey(String fileUrl) {
        String prefix = String.format("https://%s.s3.%s.amazonaws.com/", bucket, region);
        if (fileUrl.startsWith(prefix)) {
            return fileUrl.substring(prefix.length());
        }
        // fallback
        int idx = fileUrl.indexOf(".amazonaws.com/");
        return idx >= 0 ? fileUrl.substring(idx + ".amazonaws.com/".length()) : fileUrl;
    }

    private String extractExtension(String filename) {
        if (filename != null && filename.contains(".")) {
            return filename.substring(filename.lastIndexOf("."));
        }
        return "";
    }
}