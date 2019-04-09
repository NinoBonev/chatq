package com.nbonev.chatq;

import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.comments.repositories.CommentRepository;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.enums.GroupStatus;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.roles.entities.Role;
import com.nbonev.chatq.sections.roles.enums.RoleEnum;
import com.nbonev.chatq.sections.roles.repositories.RoleRepository;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.stories.repositories.StoryRepository;
import com.nbonev.chatq.sections.storylines.entities.StoryLine;
import com.nbonev.chatq.sections.storylines.repositories.StoryLineRepository;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Created by Nino Bonev - 24.3.2019 г., 16:22
 */

@Component
public class Initializer implements CommandLineRunner {

    private final GroupRepository groupRepository;
    private final StoryRepository storyRepository;
    private final StoryLineRepository storyLineRepository;
    private final CommentRepository commentRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public Initializer(GroupRepository groupRepository, StoryRepository storyRepository, StoryLineRepository storyLineRepository, CommentRepository commentRepository, RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.groupRepository = groupRepository;
        this.storyRepository = storyRepository;
        this.storyLineRepository = storyLineRepository;
        this.commentRepository = commentRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        List<User> allUsers = this.userRepository.findAll();

        if (allUsers.size() < 1){
            User user = new User(
                    "Nino Bonev",
                    "ninobonev",
                    "nbonev@gmail.com",
                    "1234",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1553420662/txf56ngfjqlzgndmeetd.jpg");

            user.setPassword(this.passwordEncoder.encode(user.getPassword()));

            Role userRole = new Role();
            userRole.setRole(RoleEnum.USER.getRoleName());

            this.roleRepository.save(userRole);

            user.setAuthorities(Collections.singleton(userRole));

            this.userRepository.save(user);

            User admin = new User(
                    "Veselina Doncheva",
                    "admin",
                    "ves@gmail.com",
                    "admin",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/c_crop,g_north,h_1500,w_1500,y_406/a_360/v1551608141/IMG_20180904_201103_HHT.jpg");

            admin.setPassword(this.passwordEncoder.encode(admin.getPassword()));

            Role adminRole = new Role();
            adminRole.setRole(RoleEnum.ADMIN.getRoleName());

            this.roleRepository.save(adminRole);

            admin.setAuthorities(Collections.singleton(adminRole));

            this.userRepository.save(admin);

            Group social = new Group(
                    "Social",
                    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1553445963/ubuduggkwbfwavbmkhzs.jpg",
                    GroupStatus.OPEN.getStatusName());

            Group culture = new Group(
                    "Culture",
                    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form," +
                            " by injected humour, or randomised words which don't look even slightly believable." +
                            " If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden" +
                            " in the middle of text. ",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552805256/a2fx0ekeorxqxwifxd00.jpg",
                    GroupStatus.OPEN.getStatusName());

            Group nature = new Group(
                    "Nature",
                    "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first" +
                            " true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model" +
                            " sentence structures, to generate Lorem Ipsum which looks reasonable." +
                            " The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552808641/bymsbi25mra92r24uvqk.jpg",
                    GroupStatus.OPEN.getStatusName());

            this.groupRepository.save(social);
            this.groupRepository.save(culture);
            this.groupRepository.save(nature);

            Story story1 = new Story(
                    "Story in Social Group sample.",
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking" +
                            " at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters," +
                            " as opposed to using 'Content here, content here', making it look like readable English.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1551468306/40264935593_89a12c3322_b.jpg");

            story1.setUser(user);
            story1.setGroup(social);

            this.storyRepository.save(story1);

            Group gr1 = groupRepository.findGroupByName("Social");

            gr1.setStories(Collections.singleton(story1));
            this.groupRepository.save(gr1);

            Story story2 = new Story(
                    "Story in Nature Group sample.",
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking" +
                            " at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters," +
                            " as opposed to using 'Content here, content here', making it look like readable English.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1551481939/nbb1vcng6xkvnnixycv4.jpg");

            story2.setUser(admin);
            story2.setGroup(nature);

            this.storyRepository.save(story2);

            Group gr2 = groupRepository.findGroupByName("Nature");

            gr2.setStories(Collections.singleton(story2));
            this.groupRepository.save(gr2);


            User adminUser = userRepository.findByUsername("admin");

            adminUser.setStories(Collections.singleton(story2));
            this.userRepository.save(adminUser);


            Story story3 = new Story(
                    "Story in Culture Group sample.",
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking" +
                            " at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters," +
                            " as opposed to using 'Content here, content here', making it look like readable English.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390629/b44hcijlhhydukufqyie.jpg");

            story3.setUser(user);
            story3.setGroup(culture);


            this.storyRepository.save(story3);

            Group gr3 = groupRepository.findGroupByName("Culture");

            gr3.setStories(Collections.singleton(story3));
            this.groupRepository.save(gr3);


            User ninobonev = userRepository.findByUsername("ninobonev");

            Set<Story> stories = new LinkedHashSet<>();
            stories.add(story1);
            stories.add(story3);

            ninobonev.setStories(stories);
            this.userRepository.save(ninobonev);

            StoryLine storyLine11 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390637/jciemqicvfougbjrknxs.jpg",
                    story1);

            StoryLine storyLine12 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390629/b44hcijlhhydukufqyie.jpg",
                    story1);

            StoryLine storyLine13 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390632/sphs3re1m7puuenlxqxi.jpg",
                    story1);

            StoryLine storyLine14 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390635/n24o1d47copoizungf64.jpg",
                    story1);

            Comment comment1 = new Comment(
                    "Comment number 1 from Nino",
                    user.getAvatar(),
                    user,
                    story1);

            Comment comment2 = new Comment(
                    "Comment number 2 from Vesy",
                    admin.getAvatar(),
                    admin,
                    story1);

            this.commentRepository.save(comment1);
            this.commentRepository.save(comment2);

            this.storyLineRepository.save(storyLine11);
            this.storyLineRepository.save(storyLine12);
            this.storyLineRepository.save(storyLine13);
            this.storyLineRepository.save(storyLine14);

            Set<Comment> commentsFromUser = new HashSet<>();
            Set<Comment> commentsFromAdmin = new HashSet<>();

            Story story_1 = storyRepository.findByName("Story in Social Group sample.");

            Set<StoryLine> storyLines_1 = new HashSet<>();
            Set<Comment> comments_1 = new HashSet<>();
            comments_1.add(comment1);
            commentsFromUser.add(comment1);
            comments_1.add(comment2);
            commentsFromAdmin.add(comment2);
            storyLines_1.add(storyLine11);
            storyLines_1.add(storyLine12);
            storyLines_1.add(storyLine13);
            storyLines_1.add(storyLine14);

            story_1.setComments(comments_1);
            story_1.setStoryLine(storyLines_1);
            this.storyRepository.save(story_1);

            StoryLine storyLine21 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390635/n24o1d47copoizungf64.jpg",
                    story2);

            StoryLine storyLine22 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552394637/qxla3uzk72p1blnolnhq.jpg",
                    story2);

            StoryLine storyLine23 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390632/sphs3re1m7puuenlxqxi.jpg",
                    story2);

            StoryLine storyLine24 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390629/b44hcijlhhydukufqyie.jpg",
                    story2);

            Comment comment3 = new Comment(
                    "Comment number 3 from Nino",
                    user.getAvatar(),
                    user,
                    story2);

            Comment comment4 = new Comment(
                    "Comment number 4 from Vesy",
                    admin.getAvatar(),
                    admin,
                    story2);

            this.commentRepository.save(comment3);
            this.commentRepository.save(comment4);

            this.storyLineRepository.save(storyLine21);
            this.storyLineRepository.save(storyLine22);
            this.storyLineRepository.save(storyLine23);
            this.storyLineRepository.save(storyLine24);

            Story story_2 = storyRepository.findByName("Story in Nature Group sample.");

            Set<StoryLine> storyLines_2 = new HashSet<>();
            Set<Comment> comments_2 = new HashSet<>();

            comments_2.add(comment3);
            commentsFromUser.add(comment3);

            comments_2.add(comment4);
            commentsFromAdmin.add(comment4);

            storyLines_2.add(storyLine21);
            storyLines_2.add(storyLine22);
            storyLines_2.add(storyLine23);
            storyLines_2.add(storyLine24);

            story_2.setComments(comments_2);
            story_2.setStoryLine(storyLines_2);
            this.storyRepository.save(story_2);

            StoryLine storyLine31 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390635/n24o1d47copoizungf64.jpg",
                    story3);

            StoryLine storyLine32 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552394637/qxla3uzk72p1blnolnhq.jpg",
                    story3);

            StoryLine storyLine33 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390632/sphs3re1m7puuenlxqxi.jpg",
                    story3);

            StoryLine storyLine34 = new StoryLine("It is a long established fact that a reader will be distracted by the readable content of" +
                    " a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of" +
                    " letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing" +
                    " packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will" +
                    " uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident," +
                    " sometimes on purpose (injected humour and the like).",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390629/b44hcijlhhydukufqyie.jpg",
                    story3);

            Comment comment5 = new Comment(
                    "Comment number 3 from Nino",
                    user.getAvatar(),
                    user,
                    story3);

            this.commentRepository.save(comment5);

            this.storyLineRepository.save(storyLine31);
            this.storyLineRepository.save(storyLine32);
            this.storyLineRepository.save(storyLine33);
            this.storyLineRepository.save(storyLine34);

            Story story_3 = storyRepository.findByName("Story in Culture Group sample.");

            Set<StoryLine> storyLines_3 = new HashSet<>();
            Set<Comment> comments_3 = new HashSet<>();
            comments_3.add(comment5);
            commentsFromUser.add(comment5);

            storyLines_3.add(storyLine31);
            storyLines_3.add(storyLine32);
            storyLines_3.add(storyLine33);
            storyLines_3.add(storyLine34);
            story_3.setComments(comments_3);
            story_3.setStoryLine(storyLines_3);
            this.storyRepository.save(story_3);

            User nino = this.userRepository.findByUsername("ninobonev");

            nino.setComments(commentsFromUser);
            this.userRepository.save(nino);


            User vesy = this.userRepository.findByUsername("admin");

            vesy.setComments(commentsFromAdmin);
            this.userRepository.save(vesy);

        }

    }
}
