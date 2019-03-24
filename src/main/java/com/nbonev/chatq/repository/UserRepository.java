package com.nbonev.chatq.repository;

import com.nbonev.chatq.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Nino Bonev - 21.3.2019 г., 12:36
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByIdIn(List<Long> userIds);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
