//package com.nbonev.chatq.entity;
//
//import com.nbonev.chatq.entity.audit.DateAudit;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import javax.persistence.*;
//import javax.validation.constraints.NotBlank;
//
///**
// * Created by Nino Bonev - 21.3.2019 г., 12:33
// */
//
//@Entity
//@Table(name = "comments")
//public class Comment extends DateAudit {
//
//    @Id
//    @GeneratedValue
//    private long id;
//
//    @NotBlank
//    private String value;
//
//    @NotBlank
//    private String avatar;
//
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User createBy;
//
//    public Comment(String value, String avatar, User createBy) {
//        this.value = value;
//        this.avatar = avatar;
//        this.createBy = createBy;
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
//    public String getValue() {
//        return value;
//    }
//
//    public void setValue(String value) {
//        this.value = value;
//    }
//
//    public String getAvatar() {
//        return avatar;
//    }
//
//    public void setAvatar(String avatar) {
//        this.avatar = avatar;
//    }
//
//    public User getCreateBy() {
//        return createBy;
//    }
//
//    public void setCreateBy(User createBy) {
//        this.createBy = createBy;
//    }
//}
