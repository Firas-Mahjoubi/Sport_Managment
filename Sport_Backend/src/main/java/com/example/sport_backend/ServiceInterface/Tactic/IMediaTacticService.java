package com.example.sport_backend.ServiceInterface.Tactic;


import com.example.sport_backend.Entity.Tactic.MediaTactic;

import java.util.List;

public interface IMediaTacticService {
    MediaTactic addMedia(MediaTactic mediaTactic);
    List<MediaTactic> getMediaByTactic(Long tacticId);
    void deleteMedia(Long id);
}
