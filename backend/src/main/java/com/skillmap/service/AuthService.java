package com.skillmap.service;

import com.skillmap.dto.*;
import com.skillmap.exception.ApiException;
import com.skillmap.model.User;
import com.skillmap.repository.UserRepository;
import com.skillmap.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class AuthService {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;

    public AuthService(UserRepository users, PasswordEncoder encoder, JwtUtil jwt) {
        this.users = users; this.encoder = encoder; this.jwt = jwt;
    }

    public AuthResponse register(RegisterRequest req) {
        if (users.existsByEmail(req.email)) throw ApiException.bad("Email already registered");
        User u = User.builder()
                .name(req.name).email(req.email).goal(req.goal)
                .password(encoder.encode(req.password))
                .roles(new HashSet<>(Set.of("ROLE_USER")))
                .build();
        users.save(u);
        return makeAuth(u);
    }

    public AuthResponse login(LoginRequest req) {
        User u = users.findByEmail(req.email).orElseThrow(() -> ApiException.unauthorized("Invalid credentials"));
        if (!encoder.matches(req.password, u.getPassword())) throw ApiException.unauthorized("Invalid credentials");
        u.setLastLoginAt(Instant.now());
        users.save(u);
        return makeAuth(u);
    }

    private AuthResponse makeAuth(User u) {
        String token = jwt.generate(u.getId(), u.getEmail(), List.copyOf(u.getRoles()));
        return new AuthResponse(token, Map.of(
                "id", u.getId(), "name", u.getName(), "email", u.getEmail(),
                "roles", u.getRoles(), "goal", u.getGoal() == null ? "" : u.getGoal()
        ));
    }
}
