package com.example.sport_backend.ServiceImpl.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.ClubRequest;
import com.example.sport_backend.Entity.ClubHouse.League;
import com.example.sport_backend.Entity.ClubHouse.Player;
import com.example.sport_backend.Repositories.ClubHouse.ClubRepo;
import com.example.sport_backend.Repositories.ClubHouse.LeagueRepo;
import com.example.sport_backend.ServiceInterface.ClubHouse.IClubService;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;


import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ClubServiceIMPL implements IClubService {

    public ClubRepo clubRepo;
    public LeagueRepo leagueRepo;


    @Override
    public List<Club> getAllClubs() {
        return clubRepo.findAll();
    }

    @Override
    public Club getClubById(Long id) {
        return clubRepo.findById(id).orElse(null);
    }

    @Override
    public void deleteClub(Long id) {
        clubRepo.deleteById(id);

    }

    @Override
    public Club addClub(Club club) {
        return null;
    }

    @Override
    public Club addClub(ClubRequest  club) throws IOException {
        League league=leagueRepo.findById(club.getLeagueId()).orElseThrow(()->new EntityNotFoundException("League not found"));
        return clubRepo.save(Club.builder()
                .name(club.getName())
                .location(club.getLocation())
                .stadiumName(club.getStadiumName())
                .foundationYear(club.getFoundationYear())
                .imageUrl(club.getImageUrl1() != null ? club.getImageUrl1().getBytes() : null) // ✅ Logo
                .league(league)
                .build());

    }


    @Override
    public List<Club> searchClubs(String keyword) {
        return clubRepo.searchClubsByKeyword(keyword);
    }

    @Override
    public void exportClubToPdf(Long id, OutputStream outputStream) throws IOException {

        Club club = clubRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Club not found"));

        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);
        document.open();

        // 🖼️ Ajouter le logo
        if (club.getImageUrl() != null) {
            Image logo = Image.getInstance(club.getImageUrl());
            logo.scaleToFit(100, 100);
            logo.setAlignment(Element.ALIGN_CENTER);
            document.add(logo);
        }

        // 📛 Titre (Nom du Club)
        Font titleFont = new Font(Font.HELVETICA, 20, Font.BOLD);
        Paragraph title = new Paragraph(club.getName(), titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph(" ")); // espace vide

        // 🏟️ Infos générales
        Font infoFont = new Font(Font.HELVETICA, 12, Font.NORMAL);
        document.add(new Paragraph("📍 Location: " + club.getLocation(), infoFont));
        document.add(new Paragraph("🏟️ Stadium: " + club.getStadiumName(), infoFont));
        document.add(new Paragraph("📅 Foundation Year: " + (club.getFoundationYear() != null ? club.getFoundationYear() : "Unknown"), infoFont));

        String leagueName = (club.getLeague() != null) ? club.getLeague().getName() : "Not assigned";
        document.add(new Paragraph("🏆 League: " + leagueName, infoFont));
        document.add(new Paragraph(" ")); // espace vide

        // 🧑‍🤝‍🧑 Liste des joueurs
        Font sectionFont = new Font(Font.HELVETICA, 16, Font.BOLD);
        document.add(new Paragraph("Players:", sectionFont));
        document.add(new Paragraph(" "));

        if (club.getPlayers() != null && !club.getPlayers().isEmpty()) {
            for (Player player : club.getPlayers()) {
                document.add(new Paragraph("- " + player.getFirstName() + " " + player.getLastName() + " (" + player.getPosition() + ")", infoFont));
            }
        } else {
            document.add(new Paragraph("No players registered.", infoFont));
        }

        document.close();
    }

    @Override
    public void exportClubsToCsv(Writer writer) throws IOException {
        List<Club> clubs = clubRepo.findAll();
        PrintWriter csvWriter = new PrintWriter(writer);

        // En-têtes
        csvWriter.println("Club Name,Club Location,Club Stadium,Player First Name,Player Last Name,Player Position");

        for (Club club : clubs) {
            if (club.getPlayers() != null && !club.getPlayers().isEmpty()) {
                for (Player player : club.getPlayers()) {
                    csvWriter.printf("%s,%s,%s,%s,%s,%s\n",
                            club.getName(),
                            club.getLocation(),
                            club.getStadiumName(),
                            player.getFirstName(),
                            player.getLastName(),
                            player.getPosition());
                }
            } else {
                // Si pas de joueurs
                csvWriter.printf("%s,%s,%s,,,\n",
                        club.getName(),
                        club.getLocation(),
                        club.getStadiumName());
            }
        }

        csvWriter.flush();
    }


    @Override
    public Club updateClub(Long id, Club club) {
        Club existingClub = getClubById(id);
        if (existingClub != null) {
            existingClub.setName(club.getName());
            existingClub.setLocation(club.getLocation());
            existingClub.setFoundationYear(club.getFoundationYear());
            existingClub.setImageUrl(club.getImageUrl());
            return clubRepo.save(existingClub);
        }
        return null;
    }

}
