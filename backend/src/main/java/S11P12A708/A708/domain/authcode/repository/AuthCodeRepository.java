package S11P12A708.A708.domain.authcode.repository;

import S11P12A708.A708.domain.authcode.entity.Authcode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthCodeRepository extends JpaRepository<Authcode, Long> {

    Optional<Authcode> findByEmail(String email);

    void deleteByEmail(String email);
}
