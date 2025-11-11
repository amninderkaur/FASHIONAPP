package capstoneBackend.ca.sheridancollege.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import capstoneBackend.ca.sheridancollege.beans.User;
import capstoneBackend.ca.sheridancollege.beans.WardrobeItem;
import capstoneBackend.ca.sheridancollege.beans.repositories.WardrobeRepository;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/wardrobe")
@AllArgsConstructor
public class WardrobeController {

    private final WardrobeRepository wardrobeRepository;

   
    @GetMapping
    public ResponseEntity<List<WardrobeItem>> getAll(@AuthenticationPrincipal User user) {
        List<WardrobeItem> items = wardrobeRepository.findByUserId(user.getId());
        return ResponseEntity.ok(items);
    }

    
    @PostMapping
    public ResponseEntity<WardrobeItem> addItem(@AuthenticationPrincipal User user,
                                                @RequestBody WardrobeItem item) {
        item.setUserId(user.getId());
        WardrobeItem savedItem = wardrobeRepository.save(item);
        return ResponseEntity.ok(savedItem);
    }
}
