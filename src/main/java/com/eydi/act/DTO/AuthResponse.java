package com.eydi.act.DTO;

public record AuthResponse(String token, String username, Long expiresAt) {
}
