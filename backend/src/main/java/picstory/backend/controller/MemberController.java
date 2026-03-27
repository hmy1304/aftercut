package picstory.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import picstory.backend.service.MemberService;
import picstory.backend.web.dto.SignupRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    public Long signup(@RequestBody SignupRequest request) {
        return memberService.signup(
                request.name(),
                request.email(),
                request.password(),
                request.passwordConfirm(),
                request.phone()
        );
    }
}
