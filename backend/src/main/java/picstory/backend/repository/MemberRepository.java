package picstory.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import picstory.backend.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
}
