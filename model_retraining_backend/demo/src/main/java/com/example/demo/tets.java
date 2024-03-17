package com.example.demo;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class tets {
    static WebDriver driver;

    public static void main(String[] args) {

        WebDriverManager.chromedriver().setup();

        //Headless mode
        ChromeOptions options = new ChromeOptions();
        //options.addArguments("--headless=new");
        driver = new ChromeDriver(options);
        System.out.println("Headless Chrome Browser is Initialized");

        driver.manage().window().maximize();
        System.out.println("Browser is maximized");

        // Login to Google account
        //automation.setup();
        driver.get("https://accounts.google.com/");
        System.out.println("Navigated to Google Login Page");
        //enter email
        driver.findElement(By.id("identifierId")).sendKeys("research.sugandha@gmail.com");
        System.out.println("Entered Email");
        driver.findElement(By.id("identifierNext")).click();
        System.out.println("Clicked on Next");

        //Wait for 5 seconds
        waitTime(5000);

        //enter password
        driver.findElement(By.name("Passwd")).sendKeys("Sugandha@1111");
        System.out.println("Entered Password");
        driver.findElement(By.id("passwordNext")).click();
        System.out.println("Clicked on Next");

        //Wait for 5 seconds
        waitTime(5000);

        //Navigated to google colab
        driver.get("https://colab.research.google.com/drive/1ZfZze784EPbRsX-b_mQl4hB7F_zO4rQY#scrollTo=e0Wg7q0L2AJe");
        System.out.println("Navigated to Google Colab");
        waitTime(7000);


        //Disconnected and delete runtime
        WebElement runTime = driver.findElement(By.xpath("//*[@id=\"runtime-menu-button\"]/div/div/div[1]"));
        runTime.click();
        System.out.println("Clicked on Runtime");

        //Click Disconnected and delete runtime
        WebElement disconnected = driver.findElement(By.xpath("//*[@id=\":26\"]/div"));
        disconnected.click();
        System.out.println("Clicked on Disconnected and delete runtime");
        waitTime(5000);

        //if the Disconnect and delete runtime pop up is displayed, click on Yes
        try {
            WebElement yesButton = driver.findElement(By.xpath("/html/body/mwc-dialog/mwc-button[2]"));
            yesButton.click();
            System.out.println("Clicked on Yes");
            waitTime(5000);
        } catch (Exception e) {
            System.out.println("Disconnect and delete runtime pop up not displayed, skipping this step.");
        }


        //Click On Connect
        WebElement connectButton = driver.findElement(By.xpath("(//colab-connect-button)[1]"));
        waitTime(5000);
        connectButton.click();
        System.out.println("Clicked on Connect");
        waitTime(5000);

        //Click connect Google Drive
        WebElement files = driver.findElement(By.xpath("/html/body/div[7]/div[2]/colab-left-pane/div/div[1]/div[5]"));
        files.click();
        System.out.println("Clicked on Files");
        waitTime(5000);

        //click Google Drive
        WebElement googleDrive = driver.findElement(By.xpath("/html/body/div[7]/div[2]/colab-left-pane/colab-resizer/div[1]/div[2]/colab-file-browser/colab-file-tree/div[1]/md-icon-button[2]"));
        googleDrive.click();
        System.out.println("Clicked on Google Drive");
        waitTime(5000);

        WebElement connectToGoogleDrive = driver.findElement(By.xpath("//mwc-dialog/mwc-button[@dialogaction=\"ok\"]"));
        connectToGoogleDrive.click();
        System.out.println("Clicked on Connect to Google Drive");
        waitTime(25000);

        //ClickRunTime and run all
        WebElement runTime1 = driver.findElement(By.xpath("//*[@id=\"runtime-menu-button\"]/div/div/div[1]"));
        runTime1.click();
        System.out.println("Clicked on Runtime");

        WebElement runAll = driver.findElement(By.xpath("/html/body/div[13]/div[1]/div"));
        runAll.click();
        System.out.println("Clicked on Run All");
        System.out.println("Model training is Started");

        //Wait for 10 minutes
        waitTime(600000);
        System.out.println("Automation Script Completed Successfully !..");

        driver.quit();
        System.out.println("Browser is Closed");

    }


    public static void waitTime(int time) {
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

}