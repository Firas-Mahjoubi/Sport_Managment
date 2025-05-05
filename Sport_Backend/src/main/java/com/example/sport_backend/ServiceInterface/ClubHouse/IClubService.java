package com.example.sport_backend.ServiceInterface.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Club;
import com.example.sport_backend.Entity.ClubHouse.ClubRequest;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.util.List;

public interface IClubService {
     List<Club> getAllClubs();
     Club getClubById(Long id);
     void deleteClub(Long id);
     Club addClub(Club club);

     Club addClub(ClubRequest request) throws IOException;

     void exportClubsToCsv(Writer writer) throws IOException;

     Club updateClub(Long id, Club club);

     List<Club> searchClubs(String keyword);

     void exportClubToPdf(Long id, OutputStream outputStream) throws IOException;

/////////////

}
