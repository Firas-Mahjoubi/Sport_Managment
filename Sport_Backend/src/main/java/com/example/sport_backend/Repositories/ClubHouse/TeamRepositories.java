package com.example.sport_backend.Repositories.ClubHouse;

import com.example.sport_backend.Entity.ClubHouse.Team;
import com.example.sport_backend.Entity.Enum.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TeamRepositories  extends JpaRepository<Team, Long> {
    List<Team> findByTacticsId(long id);
    Optional<Team> findByName(String name);
    @Query("select t from Team t where t.categories= :categories and t.name = :name")
    Optional<Team> findByNameAndCategorie(@Param("name") String name,@Param("categories") Categories categories);
}
