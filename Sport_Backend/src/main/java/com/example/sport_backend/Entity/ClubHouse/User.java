package com.example.sport_backend.Entity.ClubHouse;

import com.example.sport_backend.Entity.Enum.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 3, message = "Le nom doit contenir au moins 3 caractères")
    String name;
    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    String email;
    @NotBlank(message = "Le mot de passe est obligatoire")
    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    String password;
    @NotBlank(message = "Le numéro de téléphone est obligatoire")
    @Pattern(regexp = "\\d{8}", message = "Le numéro de téléphone doit contenir 8 chiffres")
    String phoneNumber;
    boolean verified;
    String verificationToken;
    @Enumerated(EnumType.STRING)
    Role role;

    @ManyToOne
    Team team;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> role.name());
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
