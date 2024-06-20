///  <reference types="cypress"/>

describe('Criar dispositivos', () => {
    const payload_cadastrar_device = require('../fixtures/cadastrar_device_sucesso.json')

    it('Criar um dispositivo específico', () => {

        const dataAtual = new Date().toISOString().slice(0, 16)
        cy.cadastrarDevice(payload_cadastrar_device)
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