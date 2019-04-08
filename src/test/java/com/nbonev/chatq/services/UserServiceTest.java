package com.nbonev.chatq.services;

import com.nbonev.chatq.exception.ResourceNotFoundException;
import com.nbonev.chatq.sections.groups.repositories.GroupRepository;
import com.nbonev.chatq.sections.roles.entities.Role;
import com.nbonev.chatq.sections.roles.enums.RoleEnum;
import com.nbonev.chatq.sections.roles.repositories.RoleRepository;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.models.binding.UserRegisterBindingModel;
import com.nbonev.chatq.sections.users.repositories.UserRepository;
import com.nbonev.chatq.sections.users.services.UserService;
import com.nbonev.chatq.sections.users.services.UserServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;
import java.util.Iterator;

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
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private GroupRepository groupRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private UserService userService;

    private UserRegisterBindingModel userRegisterNino;

    private UserRegisterBindingModel userRegisterVesy;

    private User nino;

    private User vesy;

    @Before
    public void setUp() {
        userService = new UserServiceImpl(userRepository, roleRepository, groupRepository,
                passwordEncoder, new ModelMapper());

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

        when(this.userRepository.save(any()))
                .thenAnswer(a -> a.getArgument(0));

        Role userRole = new Role();
        userRole.setRole(RoleEnum.USER.getRoleName());

        when(this.roleRepository.findByRole(RoleEnum.USER.getRoleName()))
                .thenAnswer(a -> userRole);

        Role adminRole = new Role();
        adminRole.setRole(RoleEnum.ADMIN.getRoleName());

        when(this.roleRepository.findByRole(RoleEnum.ADMIN.getRoleName()))
                .thenAnswer(a -> adminRole);

        when(this.passwordEncoder.encode(any()))
                .thenAnswer(a -> ENCODED_PASSWORD);

        when(this.userRepository.findByUsername(nino.getUsername()))
                .thenAnswer(a -> nino);

        when(this.userRepository.findByUsername(vesy.getUsername()))
                .thenAnswer(a -> vesy);

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
    public void testSaveUser_givenValidUser_shouldMapAuthoritiesFieldRight() throws IOException {
        //act
        User createdUser = this.userService.saveUser(this.userRegisterNino);
        Iterator<Role> iterator = createdUser.getAuthorities().iterator();

        //assert
        Assert.assertTrue("Wrong authorities number after user is created", iterator.hasNext());
        Assert.assertEquals("Wrong authorities after user is created", RoleEnum.USER.getRoleName(), iterator.next().getRole());
    }

    @Test
    public void testLoadUserByUsername_givenValidUser_shouldReturnUser() {
        //act
        User loadedUser = this.userService.findUserByUsername(nino.getUsername());

        //assert
        Assert.assertNotNull("User is null when loaded by username", loadedUser);
        Assert.assertEquals("Wrong user when loaded by username", nino.toString(), loadedUser.toString());
    }

    @Test(expected = ResourceNotFoundException.class)
    public void testLoadUserByUsername_givenNotValidUser_shouldThrowUsernameNotFoundException() {
        //act
        this.userService.findUserByUsername("wrongUsername");
    }
}
