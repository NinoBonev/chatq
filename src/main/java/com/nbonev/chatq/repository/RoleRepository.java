package com.nbonev.chatq.repository;

import com.nbonev.chatq.entity.Role;
import com.nbonev.chatq.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by Nino Bonev - 23.3.2019 г., 11:41
 */

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
