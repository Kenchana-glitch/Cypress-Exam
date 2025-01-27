// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillVehicleData',(vehicleType)=>{
    cy.get('#make').select('Audi');
    cy.get('#engineperformance').type('110');
    cy.get('#dateofmanufacture').type('01/15/2023');
    if(vehicleType === 'motorcycle'){
        cy.get('#numberofseatsmotorcycle').select('3');
        cy.get('#model').select('Motorcycle');
        cy.get('#cylindercapacity').type('125');
    } else {
        cy.get('#numberofseats').select('4');
        cy.get('#fuel').select('Electric Power');
        cy.get('#licenseplatenumber').type('AD1420');
    }
    if(vehicleType === 'truck'){
        cy.get('#payload').type('1000');
        cy.get('#totalweight').type('25000');
    }
    cy.get('#listprice').type('100000');
    cy.get('#annualmileage').type('120');
    
});

Cypress.Commands.add('fillInsurantData',()=>{
    cy.get('#firstname').type('First');
    cy.get('#lastname').type('Last');
    cy.get('#birthdate').type('01/15/1995');
    cy.get('input[id="gendermale"]').click({force: true});
    cy.get('#streetaddress').type('18th St.');
    cy.get('#country').select('Philippines');
    cy.get('#zipcode').type('6100');
    cy.get('#city').type('Bacolod City');
    cy.get('#occupation').select('Employee');
    cy.get('input[id="speeding"]').check({force: true});
    cy.get('#website').type('http://test.com');
});

Cypress.Commands.add('fillProductData',(vehicleType)=>{
    cy.get('#startdate').type('03/31/2025');
    cy.get('#insurancesum').select(5);
    if(vehicleType === 'auto'){
        cy.get('#meritrating').select(7);
        cy.get('#courtesycar').select('Yes');
    }
    cy.get('#damageinsurance').select(2);
    cy.get('input[id="EuroProtection"]').click({force:true});
});


Cypress.Commands.add('fillInvalidVehicleData',()=>{
     cy.get('#make').select(0);
     cy.get('#model').select(1);
     cy.get('#model').select(0);
     cy.get('#cylindercapacity').type(0);
     cy.get('#engineperformance').type(0);
     cy.get('#dateofmanufacture').type(0);
     cy.get('#numberofseatsmotorcycle').select(1);
     cy.get('#numberofseatsmotorcycle').select(0);
     cy.get('#listprice').type(0);
     cy.get('#annualmileage').type(0);
});

Cypress.Commands.add('fillInvalidInsurantData',()=>{
    cy.get('#firstname').type(12345);
    cy.get('#lastname').type(1234);
    cy.get('#birthdate').type(0);
    cy.get('#country').select('Philippines');
    cy.get('#country').select(0);
    cy.get('#zipcode').type('zipcode');
    cy.get('#occupation').select('Employee');
    cy.get('#occupation').select(0);
    cy.get('input[id="speeding"]').check({force: true});
    cy.get('input[id="speeding"]').uncheck({force: true});
});

Cypress.Commands.add('fillInvalidProductData',()=>{
    cy.get('#startdate').type(0);
    cy.get('#insurancesum').select(5);
    cy.get('#insurancesum').select(0);
    cy.get('#damageinsurance').select(2);
    cy.get('#damageinsurance').select(0);
    cy.get('input[id="EuroProtection"]').check({force:true});
    cy.get('input[id="EuroProtection"]').uncheck({force:true});
});

Cypress.Commands.add('fillInvalidQuoteData',()=>{
    cy.get('#email').type('email');
    cy.get('#phone').type('phone');
    cy.get('#username').type('1user');
    cy.get('#password').type('pass');
    cy.get('#confirmpassword').type('password');
});

Cypress.Commands.add('fillQuoteData',()=>{
    cy.get('#email').type('email@mail.com');
    cy.get('#phone').type('123445576');
    cy.get('#username').type('user1');
    cy.get('#password').type('Password123');
    cy.get('#confirmpassword').type('Password123');
    cy.get('#Comments').type('No further comments');
});