package com.example.sport_backend.Controllers;

import com.example.sport_backend.Entity.ClubHouse.User;
import com.example.sport_backend.Entity.Enum.Role;
import com.example.sport_backend.Repositories.ClubHouse.UserRepositories;
import com.example.sport_backend.ServiceImpl.ClubHouse.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Allow CORS for frontend access
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepositories userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager, UserRepositories userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: User not found!"));
        }

        User user = userOptional.get();

        if (!user.isVerified()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Please verify your email before logging in!"));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        if (authentication.isAuthenticated()) {
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful!",
                    "role", user.getRole().name(), // ✅ Convert Enum Role to String
                    "userId", user.getId().toString(),  // Include userId in the response
                    "email", user.getEmail()
            ));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Login failed!"));
        }
    }


    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Error: Email not found!"));
        }

        User user = userOptional.get();
        String resetToken = UUID.randomUUID().toString();
        user.setVerificationToken(resetToken);
        userRepository.save(user);

        String resetLink = "http://localhost:4200/reset-password?token=" + resetToken;
        emailService.sendResetPasswordEmail(user.getEmail(), resetLink);

        return ResponseEntity.ok(Map.of("message", "Reset password link has been sent to your email!"));
    }


    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        Logger logger = LoggerFactory.getLogger(AuthController.class);

        String token = request.get("token");
        String newPassword = request.get("newPassword");

        logger.info("Received password reset request for token: {}", token);

        // Validate request parameters
        if (token == null || token.isEmpty()) {
            logger.error("Reset token is missing!");
            return ResponseEntity.badRequest().body(Map.of("message", "Reset token is required!"));
        }
        if (newPassword == null || newPassword.length() < 6) {
            logger.error("Invalid password length!");
            return ResponseEntity.badRequest().body(Map.of("message", "Password must be at least 6 characters long!"));
        }

        // Find user by token
        Optional<User> userOptional = userRepository.findByVerificationToken(token);
        if (userOptional.isEmpty()) {
            logger.error("Invalid or expired reset token!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Invalid or expired reset token!"));
        }

        // Update user password
        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setVerificationToken(null); // Invalidate the token
        userRepository.save(user);

        logger.info("Password reset successfully for user: {}", user.getEmail());

        return ResponseEntity.ok(Map.of("message", "Password reset successfully! You can now log in."));
    }



    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Email already exists!"));
        }
        if (user.getRole() == null) {
            user.setRole(Role.COACH); // Set default role to COACH
        }
        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Generate Verification Token
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setVerified(false);

        userRepository.save(user);

        // Send verification email
        String verificationLink = "http://localhost:8088/api/auth/verify?token=" + verificationToken;
        emailService.sendVerificationEmail(user.getEmail(), verificationLink);

        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully! Please check your email for verification.",
                "userId", user.getId().toString() // Send userId in the response
        ));
    }




    @GetMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyEmail(@RequestParam("token") String token) {
        Optional<User> userOptional = userRepository.findByVerificationToken(token);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setVerified(true);
            user.setVerificationToken(null);
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Email verified successfully! You can now log in."));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Error: Invalid verification token!"));
        }
    }
}
