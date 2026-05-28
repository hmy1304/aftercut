package picstory.backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import picstory.backend.domain.Member;
import picstory.backend.service.KakaoAuthService;
import picstory.backend.service.LoginService;
import picstory.backend.web.dto.LoginRequest;
import picstory.backend.web.dto.MemberResponse;
import picstory.backend.web.dto.UpdateProfileRequest;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final LoginService loginService;
    private final KakaoAuthService kakaoAuthService; // ✅ 카카오 서비스 주입 추가

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    // 프론트엔드 URL (환경변수로 관리하거나 로컬 테스트용 하드코딩)
    @Value("${app.frontend-url}")
    private String frontendUrl;

    @PostMapping("/login")
    public MemberResponse login(@RequestBody LoginRequest request, HttpSession session) {
        return loginService.login(request, session);
    }

    @GetMapping("/me")
    public ResponseEntity<MemberResponse> memberResponse(HttpSession session) {
        return loginService.me(session)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }

    @PatchMapping("/me")
    public MemberResponse updateMe(@RequestBody UpdateProfileRequest request, HttpSession session) {
        return loginService.updateMe(session, request);
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        loginService.logout(session);
    }

    @GetMapping("/kakao")
    public void kakaoLogin(HttpServletResponse response) throws IOException {
        String url = "https://kauth.kakao.com/oauth/authorize?client_id=" + clientId
                + "&redirect_uri=" + redirectUri + "&response_type=code&prompt=login";
        response.sendRedirect(url);
    }

    @GetMapping("/kakao/callback")
    public void kakaoCallback(@RequestParam String code, HttpSession session, HttpServletResponse response) throws IOException {
        // 1. 인가 코드로 액세스 토큰 받기
        String accessToken = kakaoAuthService.getAccessToken(code);
        // 2. 토큰으로 카카오 사용자 정보 조회
        Map<String, Object> userInfo = kakaoAuthService.getKakaoUserInfo(accessToken);
        // 3. 회원가입 또는 기존 회원 찾기
        Member member = kakaoAuthService.findOrCreateMember(userInfo);

        // 4. 세션에 로그인 상태 저장
        session.setAttribute("LOGIN_MEMBER_ID", member.getId());

        // 5. 처리가 끝나면 프론트엔드 메인화면으로 리다이렉트
        response.sendRedirect(frontendUrl + "/app");
    }
}