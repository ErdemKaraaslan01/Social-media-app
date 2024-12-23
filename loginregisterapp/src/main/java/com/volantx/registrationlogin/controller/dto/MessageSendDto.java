package com.volantx.registrationlogin.controller.dto;

import lombok.Data;

@Data
public class MessageSendDto {

    private String senderId;
    private String receiverId;
    private String messageContent;
}
