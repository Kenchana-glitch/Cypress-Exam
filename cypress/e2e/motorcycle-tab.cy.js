/// <reference types = "Cypress"/>

describe('motorcycle tab',()=>{
  beforeEach(()=>{
    cy.visit('http://sampleapp.tricentis.com/101/index.php');
    cy.get('#nav_motorcycle').click();
  });
      
  it('should go to motorcycle tab',()=>{
    cy.get('#selectedinsurance').contains('Motorcycle');
  });

  it('should enter all invalid vehicle data', () => {
    cy.fillInvalidVehicleData();

    cy.get('#make').should('have.value','default');
    cy.get('#model').should('have.value','default');
    cy.get('#cylindercapacity').should('have.value',0);
    cy.get('#engineperformance').should('have.value',0);
    cy.get('#dateofmanufacture').should('have.value',0);
    cy.get('#numberofseatsmotorcycle').should('have.value','default');
    cy.get('#listprice').should('have.value',0);
    cy.get('#annualmileage').should('have.value',0);
  });

  it('should validate error display on vehicle form', () => {
    cy.fillInvalidVehicleData();
    //Make
    cy.get('section[style="display: block;"] > :nth-child(1) > .error').then((el)=>{
      expect(el.text()).to.eq('Select an option')
    });
    //Model
    cy.get('section[style="display: block;"] > :nth-child(2) > .error').then((el)=>{
      expect(el.text()).to.eq('Select an option')
    });
    //Cylinder
    cy.get('section[style="display: block;"] > :nth-child(3) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be a number between 1 and 2000');
    });
    //Engine Performance
    cy.get('section[style="display: block;"] > :nth-child(4) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be a number between 1 and 2000');
    });
    //Date of Manufacture
    cy.get('section[style="display: block;"] > :nth-child(5) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be a valid date ');
    });
    //Number of Seats
    cy.get('section[style="display: block;"] > :nth-child(6) > .error').then((el)=>{
      expect(el.text()).to.eq('Select an option')
    });
    //List Price
    cy.get('section[style="display: block;"] > :nth-child(7) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be a number between 500 and 100000');
    });
    //Annual Mileage
    cy.get('section[style="display: block;"] > :nth-child(8) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be a number between 100 and 100000');
    });
  });

  it('should enter all valid vehicle data', () => {
    cy.fillVehicleData('motorcycle');

    cy.get('#make').should('have.value','Audi');
    cy.get('#engineperformance').should('have.value','110');
    cy.get('#dateofmanufacture').should('have.value','01/15/2023');
    cy.get('#numberofseatsmotorcycle').should('have.value','3');
    cy.get('#model').should('have.value','Motorcycle');
    cy.get('#cylindercapacity').should('have.value','125');
    cy.get('#listprice').should('have.value','100000');
    cy.get('#annualmileage').should('have.value','120');
  });

  it('should enter all invalid insurance data', () => {
    cy.get('#nextenterinsurantdata').click();
    cy.fillInvalidInsurantData();

    cy.get('#firstname').should('have.value',12345);
    cy.get('#lastname').should('have.value',1234);
    cy.get('#birthdate').should('have.value',0);
    cy.get('#country').should('have.value','default');
    cy.get('#zipcode').should('have.value','zipcode');
    cy.get('#occupation').should('have.value','default');
    cy.get('input[id="speeding"]').should('not.be.checked');
  });

  it('should validate error display on insurance form', () => {
    cy.get('#nextenterinsurantdata').click();
    cy.fillInvalidInsurantData();
    //First Name
    cy.get('#insurance-form > div > section:nth-child(2) > div:nth-child(1) > span').then((el)=>{
      expect(el.text()).to.eq('Must be at least 2 characters long and must only contain letters')
    });
    //Last Name
    cy.get('#insurance-form > div > section:nth-child(2) > div:nth-child(2) > span').then((el)=>{
      expect(el.text()).to.eq('Must be at least 2 characters long and must only contain letters')
    });
    //Date of Birth
    cy.get('#insurance-form > div > section:nth-child(2) > div:nth-child(3) > span').then((el)=>{
      expect(el.text()).to.eq('Must be a valid date ');
    });
    //Country
    cy.get('#insurance-form > div > section:nth-child(2) > div:nth-child(6) > span').then((el)=>{
      expect(el.text()).to.eq('Select an option');
    });
    //Zip Code
    cy.get('#insurance-form > div > section:nth-child(2) > div:nth-child(7) > span').then((el)=>{
      expect(el.text()).to.eq('Must be only digits');
    });
    //Occupation
    cy.get('#insurance-form > div > section:nth-child(2) > div:nth-child(9) > span').then((el)=>{
      expect(el.text()).to.eq('Select an option')
    });
    //Hobbies
    cy.get('#insurance-form > div > section:nth-child(2) > div:nth-child(10) > span').then((el)=>{
      expect(el.text()).to.eq('Select at least 1 options');
    });
  });

  it('should enter all valid insurance data', () => {
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();

    cy.get('#firstname').should('have.value','First');
    cy.get('#lastname').should('have.value','Last');
    cy.get('#birthdate').should('have.value','01/15/1995');
    cy.get('input[id="gendermale"]').should('be.checked');
    cy.get('#streetaddress').should('have.value','18th St.');
    cy.get('#country').should('have.value','Philippines');
    cy.get('#zipcode').should('have.value','6100');
    cy.get('#city').should('have.value','Bacolod City');
    cy.get('#occupation').should('have.value','Employee');
    cy.get('input[id="speeding"]').should('be.checked');
    cy.get('#website').should('have.value','http://test.com');
  });

  it('should enter all invalid product data', () => {
    cy.get('#nextenterinsurantdata').click();
    cy.get('#nextenterproductdata').click();
    cy.fillInvalidProductData();

    cy.get('#startdate').should('have.value',0);
    cy.get('#insurancesum').should('have.value','default');
    cy.get('#damageinsurance').should('have.value','default');
    cy.get('input[id="EuroProtection"]').should('not.be.checked');
  });

  it('should validate error display on product form', () => {
    cy.get('#nextenterinsurantdata').click();
    cy.get('#nextenterproductdata').click();
    cy.fillInvalidProductData();
    //Start Date
    cy.get('section[style="display: block;"] > :nth-child(1) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be a valid date ')
    });
    //Insurance Sum
    cy.get('section[style="display: block;"] > :nth-child(2) > .error').then((el)=>{
      expect(el.text()).to.eq('Select an option')
    });
    //Damage Insurance
    cy.get('section[style="display: block;"] > :nth-child(3) > .error').then((el)=>{
      expect(el.text()).to.eq('Select an option');
    });
    //Optional Products
    cy.get('section[style="display: block;"] > :nth-child(4) > .error').then((el)=>{
      expect(el.text()).to.eq('Select at least 1 options');
    }); 
  });
  
  it('should enter all valid product data', () => {
    cy.get('#nextenterinsurantdata').click();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('motorcycle');

    cy.get('#startdate').should('have.value','03/31/2025');
    cy.get('#insurancesum').should('have.value',15000000);
    cy.get('#damageinsurance').should('have.value','Partial Coverage');
    cy.get('input[id="EuroProtection"]').should('be.checked');
  });

  it('should select any price option', () => {
    cy.fillVehicleData('motorcycle');
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('motorcycle');
    cy.get('#nextselectpriceoption').click();

    cy.get('input[id="selectultimate"]').click({force:true});
  });

  it('should view quote and route to email page', () => {
    cy.fillVehicleData('motorcycle');
    cy.get('#nextenterinsurantdata').click();

    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();

    cy.fillProductData('motorcycle');
    cy.get('#nextselectpriceoption').click();

    cy.get('input[id="selectultimate"]').click({force:true});
    cy.get('a[id ="viewquote"').invoke('removeAttr','target').click()
    cy.get('.isloading-overlay',{timeout:8000}).should('not.exist');
    cy.get('#selectpriceoption').click();
    cy.get('#nextsendquote').click();

    cy.get('section[id="sendQuoteForm"]').should('exist');
    cy.contains('E-Mail');
  });

  it('should enter invalid data on the quote form',()=>{
    cy.fillVehicleData('motorcycle');
    cy.get('#nextenterinsurantdata').click();

    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();

    cy.fillProductData('motorcycle');
    cy.get('#nextselectpriceoption').click();

    cy.get('input[id="selectultimate"]').click({force:true});
    cy.get('a[id ="viewquote"').invoke('removeAttr','target').click()
    cy.get('.isloading-overlay',{timeout:8000}).should('not.exist');
    cy.get('#selectpriceoption').click();
    cy.get('#nextsendquote').click();
    
    cy.fillInvalidQuoteData();

    cy.get('#email').should('have.value','email');
    cy.get('#phone').should('have.value','phone');
    cy.get('#username').should('have.value','1user');
    cy.get('#password').should('have.value','pass');
    cy.get('#confirmpassword').should('have.value','password');
  });

  it('should validate error display on quote form', ()=>{
    cy.fillVehicleData('motorcycle');
    cy.get('#nextenterinsurantdata').click();

    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();

    cy.fillProductData('motorcycle');
    cy.get('#nextselectpriceoption').click();

    cy.get('input[id="selectultimate"]').click({force:true});
    cy.get('a[id ="viewquote"').invoke('removeAttr','target').click()
    cy.get('.isloading-overlay',{timeout:8000}).should('not.exist');
    cy.get('#selectpriceoption').click();
    cy.get('#nextsendquote').click();
    
    cy.fillInvalidQuoteData();

    //E-mail
    cy.get('#sendQuoteForm > :nth-child(1) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be at least a valid email format')
    });
    //Phone
    cy.get('#sendQuoteForm > :nth-child(2) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be only digits')
    });
    //Username
    cy.get('#sendQuoteForm > :nth-child(3) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be between 4 and 32 characters long and start with a letter. You may use letters, numbers, underscores, and one dot')
    });
    //Password
    cy.get('#sendQuoteForm > :nth-child(4) > .error').then((el)=>{
      expect(el.text()).to.eq('Must be at least 6 characters long, and contain at least one number, one uppercase and one lowercase letter')
    });
    //Confirm Password
    cy.get('#sendQuoteForm > :nth-child(5) > .error').then((el)=>{
      expect(el.text()).to.eq('Must have the same value as the Password field')
    });
  });

  it('should fill the form and no error is displayed', ()=>{
    cy.fillVehicleData('motorcycle');
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('motorcycle');
    cy.get('#nextselectpriceoption').click();
    cy.get('input[id="selectultimate"]').click({force:true});
    cy.get('a[id ="viewquote"').invoke('removeAttr','target').click()
    cy.get('.isloading-overlay',{timeout:8000}).should('not.exist');
    cy.get('#selectpriceoption').click();
    cy.get('#nextsendquote').click();

    cy.fillQuoteData();
    cy.get('#email').should('have.value','email@mail.com');
    cy.get('#email').should('have.css','border-color','rgb(29, 99, 175)');
    cy.get('#phone').should('have.value','123445576');
    cy.get('#phone').should('have.css','border-color','rgb(29, 99, 175)');
    cy.get('#username').should('have.value','user1');
    cy.get('#username').should('have.css','border-color','rgb(29, 99, 175)');
    cy.get('#password').should('have.value','Password123');
    cy.get('#password').should('have.css','border-color','rgb(29, 99, 175)');
    cy.get('#confirmpassword').should('have.value','Password123');
    cy.get('#confirmpassword').should('have.css','border-color','rgb(29, 99, 175)');
    cy.get('#Comments').should('have.value','No further comments');
    cy.get('#Comments').should('have.css','border-color','rgb(29, 99, 175)');

    cy.once('uncaught:exception', () => false);
    cy.get('#sendemail').click();
  });

  it('should display success message', ()=>{
    cy.fillVehicleData('motorcycle');
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('motorcycle');
    cy.get('#nextselectpriceoption').click();
    cy.get('input[id="selectultimate"]').click({force:true});
    cy.get('a[id ="viewquote"').invoke('removeAttr','target').click()
    cy.get('.isloading-overlay',{timeout:8000}).should('not.exist');
    cy.get('#selectpriceoption').click();
    cy.get('#nextsendquote').click();

    cy.fillQuoteData();
    cy.once('uncaught:exception', () => false);
    cy.get('#sendemail').click();
    cy.get('.isloading-overlay',{timeout:8000}).should('not.exist');
    
    cy.contains('Sending e-mail success!')
  });

})