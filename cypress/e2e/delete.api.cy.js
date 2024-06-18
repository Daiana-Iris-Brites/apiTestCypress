///  <reference types="cypress"/>

describe('Deletar dispositivos', () => {

    it('Deletar um dispositivo específico', () => {

      
        const body = {
            "name": "Iphone Pro Max 16",
            "data": {
               "year": 2024,
               "price": 1849.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
               "owner": "Daiana Brites"
            }
         }
        cy.request({
            method:'POST',
            url:`https://api.restful-api.dev/objects`,
            failOnStatusCode: false,
            body:body
        }).as('postDeviceResult')

         cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(200)

        cy.request({
                method:'DELETE',
                url:`https://api.restful-api.dev/objects/${response.body.id}`,
                failOnStatusCode: false
            }).as('deleteDeviceResult') 

        cy.get('@deleteDeviceResult').then((response_delete) => {    
            expect(response_delete.status).equal(200)
            expect(response_delete.body.message).equal(`Object with id = ${response.body.id} has been deleted.`)        
            })
         })

    })
    
})