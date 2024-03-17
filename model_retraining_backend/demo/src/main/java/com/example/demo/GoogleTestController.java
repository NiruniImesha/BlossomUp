package com.example.demo;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/automl")
public class GoogleTestController {

    @Autowired
    private GoogleColabPage googleColabPage;


    @PostMapping("/start-retraining")
    public ResponseEntity<String> startModelReTrain() {
        googleColabPage = new GoogleColabPage();

        // Run the method in a separate thread
        CompletableFuture.runAsync(() -> {
            try {
                googleColabPage.runModelRetrainig();
            } catch (Exception e) {
                // Handle exception
                e.printStackTrace();
            }
        });

        // Return a response immediately
        return ResponseEntity.ok("Model retraining started");
    }

}
