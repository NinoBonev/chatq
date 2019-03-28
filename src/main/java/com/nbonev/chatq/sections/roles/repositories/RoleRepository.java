package com.nbonev.chatq.sections.roles.repositories;

import com.nbonev.chatq.sections.roles.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Nino Bonev - 23.3.2019 г., 11:41
 */

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRole(String role);
}
