///  <reference types="cypress"/>

describe('Alterar os dados de um dispositivos', () => {

    it('Alterar os dados de um dispositivos específico', () => {
      
        const dataAtual = new Date().toISOString().slice(0, 16)
      
        const body = {
            "name": "Tela da Apple",
            "data": {
               "year": 2024,
               "price": 2588.00,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
               "owner": "Daiana Brites"
            }
         }

        const body_put = {
            "name": "Apple MacBook Pro 16",
            "data": {
               "year": 2019,
               "price": 2049.99,
               "CPU model": "Intel Core i9",
               "Hard disk size": "1 TB",
               "owner": "Daiana Iris Brites"
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
            expect(response.body.name).equal("Tela da Apple")

        cy.request({
                method:'PUT',
                url:`https://api.restful-api.dev/objects/${response.body.id}`,
                failOnStatusCode: false ,
                body:body_put
            }).as('putDeviceResult') 

        cy.get('@putDeviceResult').then((response_put) => {    
            expect(response_put.status).equal(200)
            expect(response_put.status).equal(200)
            expect(response_put.body).not.empty
            expect(response_put.body.name).equal("Apple MacBook Pro 16")
            expect(response_put.body.updatedAt).not.empty
            expect(response_put.body.updatedAt.slice(0, 16)).equal(dataAtual)
            expect(response_put.body.data.year).equal(2019)  
            expect(response_put.body.data.price).equal(2049.99)            
            expect(response_put.body.data['CPU model']).equal('Intel Core i9')                      
            expect(response_put.body.data['Hard disk size']).equal('1 TB')  
            expect(response_put.body.data.owner).equal("Daiana Iris Brites")       
            })
         })

    })
    
})