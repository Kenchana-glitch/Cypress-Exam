/// <reference types = "Cypress"/>

describe('trucks tab',()=>{
  beforeEach(()=>{
    cy.visit('http://sampleapp.tricentis.com/101/index.php');
    cy.get('#nav_truck').click();
  });
    
  it('should display trucks form',()=>{
    cy.get('#selectedinsurance').contains('Truck');
  });

 it('should fill up all fields in vehicle form', () => {
    cy.fillVehicleData('truck');
    
    cy.get('#make').should('have.value','Audi');
    cy.get('#engineperformance').should('have.value','110');
    cy.get('#dateofmanufacture').should('have.value','01/15/2023');
    cy.get('#numberofseats').should('have.value','4');
    cy.get('#fuel').should('have.value','Electric Power');
    cy.get('#licenseplatenumber').should('have.value','AD1420');
    cy.get('#listprice').should('have.value','100000');
    cy.get('#annualmileage').should('have.value','120');
    cy.get('#payload').should('have.value','1000');
    cy.get('#totalweight').should('have.value','25000');
  });

  it('should fill up all fields in insurance form', () => {
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

  it('should import a file', () => {
    cy.get('#nextenterinsurantdata').click();
    // cy.fillInsurantData();
    // cy.get('#open').click();
    cy.get('input[type="file"]').selectFile('cypress/fixtures/cypress image.jpg',{force:true})
    cy.get('#picture').should('have.value', 'cypress image.jpg');
  });

  it('should fill up all fields in product form', () => {
    cy.get('#nextenterinsurantdata').click();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('truck');

    cy.get('#startdate').should('have.value','03/31/2025');
    cy.get('#insurancesum').should('have.value',15000000);
    cy.get('#damageinsurance').should('have.value','Partial Coverage');
    cy.get('input[id="EuroProtection"]').should('be.checked');
  });

  it('should view quote and route to email page', () => {
    cy.fillVehicleData('truck');
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('truck');
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
    cy.fillVehicleData('truck');
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('truck');
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
    // cy.get('#Comments').type('No Comment');
  });

  it('should validate error display on quote form', ()=>{
    cy.fillVehicleData('truck');
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('truck');
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

    cy.fillVehicleData('truck');
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('truck');
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

    cy.fillVehicleData('truck');
    cy.get('#nextenterinsurantdata').click();
    cy.fillInsurantData();
    cy.get('#nextenterproductdata').click();
    cy.fillProductData('truck');
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