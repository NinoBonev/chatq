package com.nbonev.chatq;

import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.comments.repositories.CommentRepository;
import com.nbonev.chatq.sections.groups.entities.Group;
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
            user.setAdmin(false);

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
            admin.setAdmin(true);

            this.userRepository.save(admin);

            Group social = new Group(
                    "Social",
                    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1553445963/ubuduggkwbfwavbmkhzs.jpg");

            Group culture = new Group(
                    "Culture",
                    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form," +
                            " by injected humour, or randomised words which don't look even slightly believable." +
                            " If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden" +
                            " in the middle of text. ",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552805256/a2fx0ekeorxqxwifxd00.jpg");

            Group nature = new Group(
                    "Nature",
                    "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first" +
                            " true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model" +
                            " sentence structures, to generate Lorem Ipsum which looks reasonable." +
                            " The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552808641/bymsbi25mra92r24uvqk.jpg");

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

            Optional<Group> gr1 = groupRepository.findByName("Social");
            gr1.ifPresent(gr -> {
                gr.setStories(Collections.singleton(story1));
                this.groupRepository.save(gr);
            });

            Story story2 = new Story(
                    "Story in Nature Group sample.",
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking" +
                            " at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters," +
                            " as opposed to using 'Content here, content here', making it look like readable English.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1551481939/nbb1vcng6xkvnnixycv4.jpg");

            story2.setUser(admin);
            story2.setGroup(nature);

            this.storyRepository.save(story2);

            Optional<Group> gr2 = groupRepository.findByName("Nature");
            gr2.ifPresent(gr -> {
                gr.setStories(Collections.singleton(story2));
                this.groupRepository.save(gr);
            });

            Optional<User> adminUser = userRepository.findByUsername("admin");
            adminUser.ifPresent(us -> {
                us.setStories(Collections.singleton(story2));
                this.userRepository.save(us);
            });

            Story story3 = new Story(
                    "Story in Culture Group sample.",
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking" +
                            " at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters," +
                            " as opposed to using 'Content here, content here', making it look like readable English.",
                    "https://res.cloudinary.com/dar4inn2i/image/upload/v1552390629/b44hcijlhhydukufqyie.jpg");

            story3.setUser(user);
            story3.setGroup(culture);


            this.storyRepository.save(story3);

            Optional<Group> gr3 = groupRepository.findByName("Culture");
            gr3.ifPresent(gr -> {
                gr.setStories(Collections.singleton(story3));
                this.groupRepository.save(gr);
            });

            Optional<User> ninobonev = userRepository.findByUsername("ninobonev");
            ninobonev.ifPresent(us -> {
                Set<Story> stories = new LinkedHashSet<>();
                stories.add(story1);
                stories.add(story3);

                us.setStories(stories);
                this.userRepository.save(us);
            });


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

            Optional<Story> storyOptional_1 = storyRepository.findByName("Story in Social Group sample.");
            storyOptional_1.ifPresent(story -> {
                Set<StoryLine> storyLines = new HashSet<>();
                Set<Comment> comments = new HashSet<>();

                comments.add(comment1);
                commentsFromUser.add(comment1);

                comments.add(comment2);
                commentsFromAdmin.add(comment2);

                storyLines.add(storyLine11);
                storyLines.add(storyLine12);
                storyLines.add(storyLine13);
                storyLines.add(storyLine14);

                story.setComments(comments);
                story.setStoryLine(storyLines);
                this.storyRepository.save(story);
            });

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

            Optional<Story> storyOptional_2 = storyRepository.findByName("Story in Nature Group sample.");
            storyOptional_2.ifPresent(story -> {
                Set<StoryLine> storyLines = new HashSet<>();
                Set<Comment> comments = new HashSet<>();

                comments.add(comment3);
                commentsFromUser.add(comment3);

                comments.add(comment4);
                commentsFromAdmin.add(comment4);

                storyLines.add(storyLine21);
                storyLines.add(storyLine22);
                storyLines.add(storyLine23);
                storyLines.add(storyLine24);

                story.setComments(comments);
                story.setStoryLine(storyLines);
                this.storyRepository.save(story);
            });

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

            Optional<Story> storyOptional_3 = storyRepository.findByName("Story in Culture Group sample.");
            storyOptional_3.ifPresent(story -> {
                Set<StoryLine> storyLines = new HashSet<>();
                Set<Comment> comments = new HashSet<>();

                comments.add(comment5);
                commentsFromUser.add(comment5);

                storyLines.add(storyLine31);
                storyLines.add(storyLine32);
                storyLines.add(storyLine33);
                storyLines.add(storyLine34);

                story.setComments(comments);
                story.setStoryLine(storyLines);
                this.storyRepository.save(story);
            });

            Optional<User> nino = this.userRepository.findByUsername("ninobonev");
            nino.ifPresent(userNino -> {
                userNino.setComments(commentsFromUser);
                this.userRepository.save(userNino);
            });

            Optional<User> vesy = this.userRepository.findByUsername("admin");
            vesy.ifPresent(userVesy -> {
                userVesy.setComments(commentsFromAdmin);
                this.userRepository.save(userVesy);
            });

        }

    }
}
