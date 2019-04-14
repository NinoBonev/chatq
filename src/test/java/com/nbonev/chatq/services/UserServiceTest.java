package com.nbonev.chatq.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.groups.enums.GroupStatus;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.roles.entities.Role;
import com.nbonev.chatq.sections.roles.enums.RoleEnum;
import com.nbonev.chatq.sections.roles.repositories.RoleRepository;
import com.nbonev.chatq.sections.stories.entities.Story;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.models.binding.UserRegisterBindingModel;
import com.nbonev.chatq.sections.users.repositories.UserRepository;
import com.nbonev.chatq.sections.users.services.UserService;
import com.nbonev.chatq.sections.users.services.UserServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Created by Nino Bonev - 8.4.2019 г., 9:43
 */
@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@EnableSpringDataWebSupport
public class UserServiceTest {
    private static final String ENCODED_PASSWORD = "Password_Encoded";

    @Mock
    private UserRepository mockedUserRepository;

    @Mock
    private RoleRepository mockedRoleRepository;

    @Mock
    private GroupRepository mockedGroupRepository;

    @Mock
    private PasswordEncoder mockedPasswordEncoder;

    @InjectMocks
    private ModelMapper mockedModelMapper;

    private UserService userService;

    private UserRegisterBindingModel userRegisterNino;

    private UserRegisterBindingModel userRegisterVesy;

    private User nino;

    private User vesy;

    private User krasi;

    private Group testGroup;

    @Before
    public void setUp() {
        this.userService = new UserServiceImpl(this.mockedUserRepository,
                this.mockedRoleRepository,
                this.mockedGroupRepository,
                this.mockedPasswordEncoder,
                this.mockedModelMapper);

        this.userRegisterNino = new UserRegisterBindingModel("Nino Bonev", "nbonev",
                "nbonev@gmail.com", "1234",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg");

        this.nino = new User("Nino Bonev", "nbonev", "nbonev@gmail.com",
                "1234",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1553985890/heriptrsvk3feo51cst4.jpg");

        this.userRegisterVesy = new UserRegisterBindingModel("Vesy Boneva", "vesy",
                "vboneva@abv.bg", "1234",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1554714081/g7jc3zkn4z0e3lgnf4sd.jpg");

        this.vesy = new User("Vesy Boneva", "vesy",
                "vboneva@abv.bg", "1234",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1554714081/g7jc3zkn4z0e3lgnf4sd.jpg");

        this.krasi = new User("Krasi Yonkov", "krasko",
                "krasi@abv.bg", "1234",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1554714081/g7jc3zkn4z0e3lgnf4sd.jpg");

        this.testGroup = new Group("Test", "This is a test group for UnitTesting",
                "https://res.cloudinary.com/dar4inn2i/image/upload/v1555079659/k9eg7rqfy0n3b5rvjsmg.jpg",
                GroupStatus.OPEN.getStatusName());

        when(this.mockedUserRepository.save(any()))
                .thenAnswer(a -> a.getArgument(0));

        Role userRole = new Role();
        userRole.setRole(RoleEnum.USER.getRoleName());

        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        this.nino.setAuthorities(userRoles);

        when(this.mockedRoleRepository.findByRole(RoleEnum.USER.getRoleName()))
                .thenAnswer(a -> userRole);

        Role adminRole = new Role();
        adminRole.setRole(RoleEnum.ADMIN.getRoleName());

        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        this.vesy.setAuthorities(adminRoles);

        when(this.mockedPasswordEncoder.encode(any()))
                .thenAnswer(a -> ENCODED_PASSWORD);

        when(this.mockedUserRepository.findByUsername(nino.getUsername()))
                .thenAnswer(a -> nino);

        when(this.mockedUserRepository.findByUsername(vesy.getUsername()))
                .thenAnswer(a -> vesy);

        when(this.mockedUserRepository.findByUsername(krasi.getUsername()))
                .thenAnswer(a -> krasi);

        when(this.mockedGroupRepository.findGroupByName(testGroup.getName()))
                .thenAnswer(a -> testGroup);
    }

    @Test
    public void testSaveUser_givenValidUser_shouldNotReturnNull() throws IOException {
        //act
        User createdUser = this.userService.saveUser(this.userRegisterNino);

        //assert
        Assert.assertNotNull("User is null after creation", createdUser);
    }

    @Test
    public void testSaveUser_givenValidUser_shouldHashPasswordRight() throws IOException {
        //act
        User createdUser = this.userService.saveUser(this.userRegisterNino);

        //assert
        Assert.assertEquals("Password was not correctly hashed after user is created", ENCODED_PASSWORD, createdUser.getPassword());
    }

    @Test
    public void testSaveUser_givenValidUser_shouldCreateNewUsersWithUserRoleWhenCreated() throws IOException {
        //act
        User createdUser = this.userService.saveUser(this.userRegisterNino);
        Iterator<Role> iterator = createdUser.getAuthorities().iterator();

        //assert
        Assert.assertTrue("Wrong authorities number after user is created", iterator.hasNext());
        Assert.assertEquals("Wrong authorities after user is created", RoleEnum.USER.getRoleName(), iterator.next().getRole());
    }

    @Test
    public void testSaveUser_givenValidUser_shouldCreateUserWithNoFollowers() throws IOException {
        //act
        Set<User> followers = new HashSet<>();
        User createdUser = this.userService.saveUser(this.userRegisterNino);

        //assert
        Assert.assertEquals("Followers not empty when created" ,
                createdUser.getFollowers(), followers);
    }

    @Test
    public void testSaveUser_givenValidUser_shouldCreateUserWithNoFollowingUsers() throws IOException {
        //act
        Set<User> following = new HashSet<>();
        User createdUser = this.userService.saveUser(this.userRegisterNino);

        //assert
        Assert.assertEquals("Followers not null upon creation" ,
                following ,createdUser.getFollowingUsers());
    }

    @Test
    public void testSaveUser_givenValidUser_shouldCreateUserWithNoFollowingGropus() throws IOException {
        //act
        Set<Group> following = new HashSet<>();
        User createdUser = this.userService.saveUser(this.userRegisterNino);

        //assert
        Assert.assertEquals("Followers not null upon creation",
                following ,createdUser.getFollowingGroups());
    }

    @Test
    public void testSaveUser_givenValidUser_shouldCreateUserWithNoComments() throws IOException {
        //act
        Set<Comment> comments = new HashSet<>();
        User createdUser = this.userService.saveUser(this.userRegisterNino);

        //assert
        Assert.assertEquals("Followers not null upon creation",
                comments ,createdUser.getComments());
    }

    @Test
    public void testSaveUser_givenValidUser_shouldCreateUserWithNoStories() throws IOException {
        //act
        Set<Story> stories = new HashSet<>();
        User createdUser = this.userService.saveUser(this.userRegisterNino);

        //assert
        Assert.assertEquals("Followers not null upon creation",
                stories ,createdUser.getStories());
    }

    @Test
    public void testLoadUserByUsername_givenValidUser_shouldReturnUser() {
        //act
        User loadedUser = this.userService.findUserByUsername(vesy.getUsername());

        //assert
        Assert.assertNotNull("User is null when loaded by username", loadedUser);
        Assert.assertEquals("Wrong user when loaded by username", vesy.toString(), loadedUser.toString());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testLoadUserByUsername_givenNotValidUser_shouldThrowUsernameNotFoundException() {
        //act
        this.userService.findUserByUsername("wrongUsername");
    }

    @Test
    public void testLoadUser_givenValidUser_shouldMapGettersFieldsCorrectly() {
        //act
        User loadedUser = this.userService.findUserByUsername(nino.getUsername());

        //assert
        Assert.assertEquals("Username is not mapped correctly", "nbonev" ,loadedUser.getUsername());
        Assert.assertEquals("Name is not mapped correctly", "Nino Bonev" , loadedUser.getName());
        Assert.assertEquals("E-mail id not mapped correctly", "nbonev@gmail.com", loadedUser.getEmail());
    }

    @Test
    public void testUserAuthorities_shouldMapAuthoritiesFieldRight_UserRole() {
        //act
        User loadUser = this.userService.findUserByUsername(this.nino.getUsername());
        Iterator<Role> iterator = loadUser.getAuthorities().iterator();

        //assert
        Assert.assertTrue("Wrong authorities number after user is created", iterator.hasNext());
        Assert.assertEquals("Wrong authorities after user is created", RoleEnum.USER.getRoleName(), iterator.next().getRole());
    }

    @Test
    public void testUserAuthorities_shouldMapAuthoritiesFieldRight_AdminRole() {
        //act
        User loadUser = this.userService.findUserByUsername(this.vesy.getUsername());
        Iterator<Role> iterator = loadUser.getAuthorities().iterator();

        //assert
        Assert.assertTrue("Wrong authorities number after user is created", iterator.hasNext());
        Assert.assertEquals("Wrong authorities after user is created", RoleEnum.ADMIN.getRoleName(), iterator.next().getRole());
    }

    @Test
    public void testStartFollowingUser_shouldStartFollowingUsersCorrectly(){
        //act
        Set<User> followers = new HashSet<>();
        followers.add(nino);

        Set<User> following = new HashSet<>();
        following.add(vesy);

        this.userService.startFollowingUser(nino.getUsername(), vesy.getUsername());

        //assert
        Assert.assertEquals("Followers are not being added correctly",
               vesy.getFollowers(),
                followers);

        Assert.assertEquals("Following is not being added correctly",
                nino.getFollowingUsers(),
                following);
    }

    @Test
    public void testStopFollowingUser_shouldStopFollowingUsersCorrectly(){
        //act
        Set<User> followers = new HashSet<>();
        followers.add(nino);
        followers.add(krasi);

        this.userService.startFollowingUser(nino.getUsername(), vesy.getUsername());
        this.userService.startFollowingUser(krasi.getUsername(), vesy.getUsername());

        //assert
        Assert.assertEquals("Followers are not being added correctly",
                vesy.getFollowers(),
                followers);

        //act
        this.userService.stopFollowingUser(nino.getUsername(), vesy.getUsername());

        //assert
        followers.remove(nino);
        Assert.assertEquals(followers, vesy.getFollowers());
    }

    @Test
    public void testStartFollowingGroup_shouldStartFollowingGroupCorrectly(){
        //act
        Set<User> users = new HashSet<>();
        users.add(nino);

        Set<Group> groups = new HashSet<>();
        groups.add(testGroup);

        this.userService.startFollowingGroup(nino.getUsername(), testGroup.getName());

        //assert
        Assert.assertEquals("Followers are not being added correctly",
                testGroup.getFollowers(),
                users);

        Assert.assertEquals("Groups are not being added correctly",
                nino.getFollowingGroups(),
                groups);
    }

    @Test
    public void testStopFollowingGroup_shouldStopFollowingGroupCorrectly() {
        //act
        Set<User> test = new HashSet<>();
        test.add(nino);
        test.add(vesy);

        this.userService.startFollowingGroup(nino.getUsername(), testGroup.getName());
        this.userService.startFollowingGroup(vesy.getUsername(), testGroup.getName());

        //assert
        Assert.assertEquals("Followers are not being added correctly",
                testGroup.getFollowers(),
                test);

        //act
        test.remove(nino);
        this.userService.stopFollowingGroup(nino.getUsername(), testGroup.getName());

        //assert
        Assert.assertEquals("Followers are not being removed correctly",
                testGroup.getFollowers(),
                test);
    }
}
