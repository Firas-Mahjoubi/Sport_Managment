package com.example.sport_backend.ServiceImpl.ClubHouse;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String toEmail, String verificationLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("noreply@gmail.com"); // Set your no-reply email
            helper.setTo(toEmail);
            helper.setSubject("Verify Your Email - Sport App");
            helper.setText(
                    "<p>Thank you for registering!</p>" +
                            "<p>Please click the link below to verify your email:</p>" +
                            "<a href=\"" + verificationLink + "\">Verify Email</a>",
                    true
            );

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}