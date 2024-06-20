///  <reference types="cypress"/>

describe('Criar dispositivos', () => {

    it('Criar um dispositivo específico', () => {

        const dataAtual = new Date().toISOString().slice(0, 16)

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
        cy.cadastrarDevice(body)
         .then((response) => {
            expect(response.status).equal(200)
            expect(response.body).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 16)).equal(dataAtual)
            expect(response.body.name).equal("Iphone Pro Max 16")
            expect(response.body.data.year).equal(2024)  
            expect(response.body.data.price).equal(1849.99)            
            expect(response.body.data['CPU model']).equal('Intel Core i9')                      
            expect(response.body.data['Hard disk size']).equal('1 TB')  
            expect(response.body.data.owner).equal("Daiana Brites")          


         })

    })

    it('Criar um dispositivo específico sem enviar o body no payload', () => {
        cy.cadastrarDevice('')
            .then((response) => {
                expect(response.status).equal(400)
                expect(response.body.error).equal("400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.")
         })

    })

    
})