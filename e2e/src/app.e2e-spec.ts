import { ScreeningPage, SettingsPage, ScreeningQuestionPage, HomePage, SettingsBucketPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page1: ScreeningPage;
  let page2: SettingsPage;
  let page3: ScreeningQuestionPage;
  let page4: HomePage;
  let page5: SettingsBucketPage

  beforeEach(() => {
    page1 = new ScreeningPage();
    page2= new SettingsPage();
    page3= new ScreeningQuestionPage();
    page4= new HomePage();
    page5= new SettingsBucketPage();
  });

  it('should display H1 Candidate Introduction', () => {
    page1.navigateTo();
    expect(page1.getH1Text()).toEqual('Candidate Introduction');
  });

  it('should display All Categories', () => {
    page2.navigateTo();
    expect(page2.getH6Text()).toEqual('All Categories');
  });

  it('should display H1 Technical Questions', () => {
    page3.navigateTo();
    expect(page3.getH1Text()).toEqual('Technical Questions');
  });

  it('should display H1 Candidate List', () => {
    page4.navigateTo();
    expect(page4.getH1Text()).toEqual('Candidate List');
  });

  it('click on tab2 and populate list group item', function() {
    browser.get('http://localhost:4200/#/settings/main');
    element(by.id('tab-2')).click();
    browser.wait(expect(element.all(by.css('.list-group-item')).get(0).getText()).toContain('Create'), 100000);
  });

  it('click on tab2, click on pen icon, get first pill button', function() {
    browser.get('http://localhost:4200/#/settings/main');
    element(by.id('tab-2')).click();
    browser.wait(element(by.id('penIcon')).click(), 100000);
    expect(element.all(by.css('.pillButtons')).get(0).getText()).toContain('Java Applied');
  });

   it('click on tab2 and populate list group item', function() {
     browser.get('http://localhost:4200/#/settings/main');
     element(by.id('tab-2')).click();
     element(by.id('penIcon')).click();
     element.all(by.css('.pillButtons')).click();
     expect(element(by.id('font-fix')).getText()).toContain('Java Applied');
     element.all(by.css('.form-control')).get(0).sendKeys('100');
     element.all(by.css('.close')).click();
   }); 

   it('click td check for btn text', function() {
    browser.get('http://localhost:4200/#/home');
    element.all(by.css('td')).get(0).click();
    expect(element.all(by.css('.btn')).get(0).getText()).toContain('Begin Interview');
  });

  it('click td check click btn click bn fill in required text', function() {
    browser.get('http://localhost:4200/#/home');
    element.all(by.css('td')).get(0).click();
    element.all(by.css('.btn')).get(0).click();
    element.all(by.css('.btn')).get(1).click();
    element(by.id('footsie')).sendKeys('done');
    element(by.id('submit-button')).click();
    element.all(by.css('.slider')).get(0).click();
    element.all(by.css('.btn')).get(1).click();
    expect(element.all(by.css('h1')).getText()).toContain('Final Summary');
  });

  it('select candidate, begin interview, grade sql questions, pass user, enter feedback, Pass, Complete Interview', function() {
    browser.get('http://localhost:4200/#/home');
    element.all(by.css('td')).get(0).click();
    element.all(by.css('.btn')).get(0).click();
    element.all(by.css('.btn')).get(1).click();
    element.all(by.css('.pointer')).get(1).click(); //SQL tab
    element.all(by.css('.question')).get(1).click(); //sublanguages 
    element.all(by.css('.btn-outline-dark')).get(4).click(); //score 5
    element.all(by.css('.btn-outline-dark')).get(5).click(); //submit score
    element.all(by.css('.question')).get(0).click(); //joins
    element.all(by.css('.btn-outline-dark')).get(3).click(); //score 4
    element.all(by.css('.btn-outline-dark')).get(5).click(); //submit score
    element.all(by.css('.question')).get(2).click(); //joins
    element.all(by.css('.btn-outline-dark')).get(3).click(); //score 4
    element.all(by.css('.btn-outline-dark')).get(5).click(); //submit score
    element(by.id('footsie')).sendKeys('done'); //required Overall Feedback
    element(by.id('submit-button')).click();
    element.all(by.css('.slider')).get(0).click(); //Pass
    element.all(by.css('.btn')).get(1).click(); //Complete Interview
    expect(element.all(by.css('h1')).getText()).toContain('Final Summary');
  });

  it('select candidate, begin interview, grade sql questions, report violation, enter feedback, finish, Pass, Complete Interview', function() {
    browser.get('http://localhost:4200/#/home');
    element.all(by.css('td')).get(0).click();
    element.all(by.css('.btn')).get(0).click();
    element.all(by.css('.btn')).get(1).click();
    element.all(by.css('.pointer')).get(1).click(); //SQL tab
    element.all(by.css('.question')).get(1).click(); //sublanguages 
    element.all(by.css('.btn-outline-dark')).get(4).click(); //score 5
    element.all(by.css('.btn-outline-dark')).get(5).click(); //submit score
    element.all(by.css('.question')).get(0).click(); //joins
    element.all(by.css('.btn-outline-dark')).get(3).click(); //score 4
    element.all(by.css('.btn-outline-dark')).get(5).click(); //submit score
    element.all(by.css('.question')).get(2).click(); //joins
    element.all(by.css('.btn-outline-dark')).get(3).click(); //score 4
    element.all(by.css('.btn-outline-dark')).get(5).click(); //submit score
    element.all(by.css('.btn')).get(0).click(); //Report Violation
    element.all(by.css('.off')).get(1).click(); //Attire
    element.all(by.css('.btn')).get(1).click(); //Submit Violation
    element(by.id('footsie')).sendKeys('done'); //required Overall Feedback
    element(by.id('submit-button')).click();
    element.all(by.css('.slider')).get(0).click(); //Pass
    element.all(by.css('.btn')).get(1).click(); //Complete Interview
    expect(element.all(by.css('h1')).getText()).toContain('Final Summary');
  });
});
