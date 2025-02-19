package com.example.sport_backend.ServiceImpl.Tactic;

import com.example.sport_backend.Entity.Tactic.MediaTactic;
import com.example.sport_backend.Repositories.Tactic.MediaTacticRepositorie;
import com.example.sport_backend.ServiceInterface.Tactic.IMediaTacticService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class MediaTacticServiceIMPL implements IMediaTacticService {
    private final MediaTacticRepositorie mediaTacticRepositorie;
    @Override
    public MediaTactic addMedia(MediaTactic mediaTactic) {
        return mediaTacticRepositorie.save(mediaTactic);
    }

    @Override
    public List<MediaTactic> getMediaByTactic(Long tacticId) {
        return mediaTacticRepositorie.findByTacticId(tacticId);
    }

    @Override
    public void deleteMedia(Long id) {
        mediaTacticRepositorie.deleteById(id);

    }
}
