package com.nbonev.chatq.sections.comments.repositories;

import com.nbonev.chatq.sections.comments.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Created by Nino Bonev - 27.3.2019 г., 18:48
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
