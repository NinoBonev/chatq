package com.nbonev.chatq.security;

import com.nbonev.chatq.sections.comments.entities.Comment;
import com.nbonev.chatq.sections.groups.entities.Group;
import com.nbonev.chatq.sections.users.entities.User;
import com.nbonev.chatq.sections.users.models.view.UserViewModel;
import io.jsonwebtoken.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Nino Bonev - 23.3.2019 г., 11:52
 */

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationInMs}")
    private int jwtExpirationInMs;

    @Autowired
    private ModelMapper modelMapper;

    public String generateToken(Authentication authentication) {

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        UserViewModel userViewModel = this.modelMapper.map(userPrincipal, UserViewModel.class);

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);

        Set<Long> challengesById = new HashSet<>();
        userPrincipal.getStories().forEach(story -> {
            if (story.getChallenge() != null) {
                challengesById.add(story.getId());
            }
        });

        userViewModel.setChallengesById(challengesById);

        Set<Long> storiesById = new HashSet<>();
        userPrincipal.getStories().forEach(story -> {
            if (story.getGroup() != null) {
                storiesById.add(story.getId());
            }
        });

        userViewModel.setStoriesById(storiesById);

        List<String> roles = new ArrayList<>();
        userPrincipal.getAuthorities().forEach(auth -> roles.add(((GrantedAuthority) auth).getAuthority()));

        userViewModel.setCommentsById(userPrincipal.getComments().stream().map(Comment::getId).collect(Collectors.toSet()));
        userViewModel.setFollowingUsersByUsername(userPrincipal.getFollowingUsers().stream().map(User::getUsername).collect(Collectors.toSet()));
        userViewModel.setFollowingGroupsByName(userPrincipal.getFollowingGroups().stream().map(Group::getName).collect(Collectors.toSet()));
        userViewModel.setFollowersByUsername(userPrincipal.getFollowers().stream().map(User::getUsername).collect(Collectors.toSet()));
        userViewModel.setRoles(roles);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .claim("profile", userViewModel)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }
}
