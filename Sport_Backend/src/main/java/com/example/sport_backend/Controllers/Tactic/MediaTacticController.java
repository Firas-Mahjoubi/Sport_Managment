package com.example.sport_backend.Controllers.Tactic;

import com.example.sport_backend.Entity.Tactic.MediaTactic;
import com.example.sport_backend.ServiceInterface.Tactic.IMediaTacticService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/media-tactics")
@CrossOrigin(origins = "*")
public class MediaTacticController {
    @PostMapping("add")
    public MediaTactic addMedia(@RequestBody MediaTactic mediaTactic) {
        return mediaTacticService.addMedia(mediaTactic);
    }
    @GetMapping("tactic/{tacticId}")
    public List<MediaTactic> getMediaByTactic(@PathVariable Long tacticId) {
        return mediaTacticService.getMediaByTactic(tacticId);
    }
    @DeleteMapping("delete/{id}")
    public void deleteMedia(@PathVariable Long id) {
        mediaTacticService.deleteMedia(id);
    }

    private IMediaTacticService mediaTacticService;
}
