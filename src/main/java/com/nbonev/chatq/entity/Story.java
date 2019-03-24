//package com.nbonev.chatq.entity;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
//
///**
// * Created by Nino Bonev - 21.3.2019 г., 12:32
// */
//
//@Entity
//@Table(name = "stories")
//public class Story {
//
//    @Id
//    @GeneratedValue
//    private long id;
//
//    @NotBlank
//    private String name;
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "story_id", nullable = false)
//    private User followers;
//
//    public Story(String name) {
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
