package com.jon.chat.chat;

public class ChatMessage {

    private MessageType type;
    private String content;
    private String sender;


    private ChatMessage(Builder builder) {
        this.type = builder.type;
        this.content = builder.content;
        this.sender = builder.sender;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private MessageType type;
        private String content;
        private String sender;

        public Builder type(MessageType type) {
            this.type = type;
            return this;
        }

        public Builder content(String content) {
            this.content = content;
            return this;
        }

        public Builder sender(String sender) {
            this.sender = sender;
            return this;
        }

        public ChatMessage build() {
            return new ChatMessage(this);
        }
    }

    // Getters and setters
    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
