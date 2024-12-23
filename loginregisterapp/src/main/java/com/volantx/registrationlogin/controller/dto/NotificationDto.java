package com.volantx.registrationlogin.controller.dto;

import com.volantx.registrationlogin.entity.User;
import com.volantx.registrationlogin.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {

    private String id;
    private NotificationType notificationType;
    private String receiverUserId;
    private String causingUserId;
    private String content;
    private LocalDateTime sentTime;
}
