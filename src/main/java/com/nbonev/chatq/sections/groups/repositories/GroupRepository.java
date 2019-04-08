package com.nbonev.chatq.sections.groups.repositories;

import com.nbonev.chatq.sections.groups.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Nino Bonev - 24.3.2019 г., 15:34
 */

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    Group findGroupByName(String name);

    Group findGroupById(Long id);

}
