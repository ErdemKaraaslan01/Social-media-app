package com.volantx.registrationlogin.controller.dto;

import com.volantx.registrationlogin.controller.resource.MessageResource;
import com.volantx.registrationlogin.controller.resource.UserResource;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReceivedMessageDto {

    private String id;

    private String userId;
    private String messageId;

    private boolean isDeleted;
    private boolean isSeen;
    private LocalDateTime seenTime;
}

