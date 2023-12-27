package com.example.demo;


import org.springframework.stereotype.Service;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import com.microsoft.playwright.options.AriaRole;

@Service
public class GoogleColabPage {

	Boolean isTrainingStarted= false;
	Boolean isDeployed= false;
	Boolean isFinished = false;
	Boolean isStoped = false;

	private Playwright playwright;
	BrowserContext context;
	Browser browser;
	Page page;

	public GoogleColabPage() {
		playwright = Playwright.create();
		browser = playwright.firefox().launch(new BrowserType.LaunchOptions().setHeadless(false));
		context = browser.newContext();
		context.setDefaultTimeout(800000000);
	}

	public void startodelReTrain(String username, String password) {
		page = context.newPage();
		page.navigate("https://colab.research.google.com/drive/1KM4gOJ29UGNCpbEg-XRehIHxyYNf6SUq#scrollTo=545531f1-4998-43df-a22f-399655d65827");

		isTrainingStarted = true;
		
		page.waitForTimeout(3000);
		page.navigate("https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1KM4gOJ29UGNCpbEg-XRehIHxyYNf6SUq%2Fedit&followup=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1KM4gOJ29UGNCpbEg-XRehIHxyYNf6SUq%2Fedit&ifkv=AVQVeyzR9QLN9vWlHaimgDlBblP8xZUf5neKSXP3ppowZgAPNtj5MKZIcDfSVq75bUbEVX3lFDf1&osid=1&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S654429011%3A1698905288016786&theme=glif");
		page.waitForTimeout(3000);
		page.getByLabel("Email or phone").fill("pvtsugatest@gmail.com");
		page.waitForTimeout(3000);
		page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Next")).click();
		page.waitForTimeout(3000);
		page.getByLabel("Enter your password").fill("Sugandha#0000");
		page.waitForTimeout(3000);
		page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Next")).click();
		page.waitForTimeout(3000);
		page.navigate("https://colab.research.google.com/drive/1KM4gOJ29UGNCpbEg-XRehIHxyYNf6SUq#scrollTo=545531f1-4998-43df-a22f-399655d65827");
		page.waitForTimeout(3000);
		page.waitForTimeout(3000);
		System.out.println("navigated to the colab");
		page.waitForTimeout(3000);
		//	      page.getByText("Connect", new Page.GetByTextOptions().setExact(true)).click();
		page.waitForTimeout(3000);
		page.waitForTimeout(3000);
		page.waitForTimeout(3000);
		page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Runtime")).click();
		page.waitForTimeout(3000);
		page.waitForTimeout(3000);
		page.waitForTimeout(3000);
		page.getByText("Run allCtrl+F9").click();
		page.waitForTimeout(3000);
		page.waitForTimeout(3000);
		page.waitForTimeout(3000);
		Page page1 = page.waitForPopup(() -> {
			page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Connect to Google Drive")).click();
			page.waitForTimeout(3000);
		});
		page1.getByRole(AriaRole.LINK, new Page.GetByRoleOptions().setName("test pvtsuga pvtsugatest@gmail.com")).click();
		page.waitForTimeout(3000);
		page1.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Allow")).click();

		page.setDefaultTimeout(1800000);
		
		isFinished = true;

	}

	public Boolean checkModelTraningIsStarted() {
		return isTrainingStarted;

	}

	public Boolean checkIsFinished() {
		return isFinished;
	}

	public String checkStates() {
		/*
		 * 
		 */		
		return null;
	}

	public void stopRetraining() {
		if(this.page!=null) {
			page.close();
			isStoped = true;
		}

	}

	public Boolean checkIsStopped() {
		return isStoped;
	}

	public void sendEmail() {
		/*
		 * 
		 */	
	}
}
