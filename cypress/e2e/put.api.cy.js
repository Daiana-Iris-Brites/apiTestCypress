///  <reference types="cypress"/>

describe('Alterar os dados de um dispositivos', () => {
    const body_cadastro = require('../fixtures/cadastrar_device_sucesso.json')
    const body_update = require('../fixtures/update_device.json')

    it('Alterar os dados de um dispositivos específico', () => {
      
        const dataAtual = new Date().toISOString().slice(0, 16)
      
        cy.cadastrarDevice(body_cadastro)
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.name).equal("Iphone Pro Max 16")

        cy.request({
                method:'PUT',
                url:`/objects/${response.body.id}`,
                failOnStatusCode: false ,
                body:body_update
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