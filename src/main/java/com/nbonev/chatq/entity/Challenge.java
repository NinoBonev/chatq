//package com.nbonev.chatq.entity;
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
//@Table(name = "challenges")
//public class Challenge {
//
//    @Id
//    @GeneratedValue
//    private long id;
//
//    @NotBlank
//    private String name;
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "challenge_id", nullable = false)
//    private User followers;
//
//    public Challenge(String name) {
//        this.name = name;
//    }
//
//    public long getId() {
//        return id;
//    }
//
//    public void setId(long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public User getFollowers() {
//        return followers;
//    }
//
//    public void setFollowers(User followers) {
//        this.followers = followers;
//    }
//}
