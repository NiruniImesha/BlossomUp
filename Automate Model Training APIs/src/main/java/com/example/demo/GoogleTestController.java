package com.example.demo;

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
    public  ResponseEntity<String> startModelReTrain() {
        googleColabPage.startodelReTrain("pvtsugatest@gmail.com", "Sugandha#0000");
        return ResponseEntity.ok("Retraining started successfully");
    }

    @GetMapping("/is-training-started")
    public Boolean checkModelTrainingIsStarted() {
        return googleColabPage.checkModelTraningIsStarted();
    }

    @GetMapping("/is-finished")
    public Boolean checkIsFinished() {
        return googleColabPage.checkIsFinished();
    }

//    @GetMapping("/check-states")
//    public String checkStates() {
//        return googleColabPage.checkStates();
//    }

    @PostMapping("/stop-retraining")
    public ResponseEntity<String> stopRetraining() {
    	googleColabPage.stopRetraining();
    	return ResponseEntity.ok("Retraining stopped successfully ! .");
    }

    @GetMapping("/is-stopped")
    public Boolean checkIsStopped() {
        return googleColabPage.checkIsStopped();
    }

//    @PostMapping("/send-email")
//    public void sendEmail() {
//    	googleColabPage.sendEmail();
//    }

}
