package com.volantx.registrationlogin.controller.dto;

import lombok.Data;

@Data
public class SentMessageDto {

    private String id;

    private String userId;

    private String messageId;

    private boolean isDeleted;
}
