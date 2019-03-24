//package com.nbonev.chatq.entity;
//
//import com.nbonev.chatq.entity.audit.DateAudit;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
//import java.util.Set;
//
///**
// * Created by Nino Bonev - 21.3.2019 г., 12:33
// */
//
//@Entity
//@Table(name = "groups")
//public class Group extends DateAudit {
//
//    @Id
//    @GeneratedValue
//    private long id;
//
//    @NotBlank
//    private String name;
//
//    @ManyToMany(mappedBy = "following_group")
//    private Set<User> followers;
//
//    public Group(String name) {
//        this.name = name;
//    }
//
//    public Set<User> getFollowers() {
//        return followers;
//    }
//
//    public void setFollowers(Set<User> followers) {
//        this.followers = followers;
//    }
//}
