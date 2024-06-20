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
            url:`/objects`,
            failOnStatusCode: false,
            body:body
        }).as('postDeviceResult')

         cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(200)

        cy.request({
                method:'DELETE',
                url:`/objects/${response.body.id}`,
                failOnStatusCode: false
            }).as('deleteDeviceResult') 

        cy.get('@deleteDeviceResult').then((response_delete) => {    
            expect(response_delete.status).equal(200)
            expect(response_delete.body.message).equal(`Object with id = ${response.body.id} has been deleted.`)        
            })
         })

    })

    it('Deletar um dispositivo que não existe', () => {
        const id_inexistente = '123'
        cy.request({
                method:'DELETE',
                url:`/objects/${id_inexistente}`,
                failOnStatusCode: false
            }).as('deleteDeviceResult') 

        cy.get('@deleteDeviceResult').then((response_delete) => {    
            expect(response_delete.status).equal(404)
            expect(response_delete.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)        
            })

    })


    it('Deletar um dispositivo reservado', () => {
        const id_reservado = "7"
        cy.request({
                method:'DELETE',
                url:`/objects/${id_reservado}`,
                failOnStatusCode: false
            }).as('deleteDeviceResult') 

        cy.get('@deleteDeviceResult').then((response_delete) => {    
            expect(response_delete.status).equal(405)
            expect(response_delete.body.error).equal(`${id_reservado} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)        
            })

    })
})