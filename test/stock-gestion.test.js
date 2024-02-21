const { expect } = require('chai');
const sinon = require('sinon');
const { Produit, Rayon } = require('../src/stock-gestion.js');

describe('Gestion des stocks', () => {
    let rayon;

    beforeEach(() => {
        rayon = new Rayon();
    });

    it('devrait ajouter un produit au stock', () => {
        const produit = new Produit('01', 'Pommes', 50, '2024-02-28');
        rayon.ajouterProduit(produit);
    });

    it('devrait supprimer un produit du stock', () => {
        const produit = new Produit('01', 'Pommes', 50, '2024-02-28');
        rayon.stock = [produit];
        rayon.supprimerProduit('01');
    });

    it('devrait vérifier que la quantité de produits est correcte après un ajout', () => {
        const produit = new Produit('01', 'Pommes', 50, '2024-02-28');
        rayon.ajouterProduit(produit);
        const produitAjoute = rayon.stock.find(p => p.nom === 'Pommes');
        expect(produitAjoute.quantite).to.equal(50);
    });

    it('ne devrait pas avoir une quantité de stock négative', () => {
        const consoleSpy = sinon.spy(console, 'log');
        const produit = new Produit('01', 'Pommes', -10, '2024-02-28');
        rayon.ajouterProduit(produit);
        expect(consoleSpy.calledWith('Attention! Stock négatif pour Pommes')).to.be.true;
        consoleSpy.restore();
    });

    it('ne devrait pas avoir de produit périmé', () => {
        const consoleSpy = sinon.spy(console, 'log');
        const produitPerime = new Produit('02', 'Lait', 20, '2023-12-01');
        rayon.ajouterProduit(produitPerime);
        expect(consoleSpy.calledWith('Attention! Produit périmé : Lait')).to.be.true;
        consoleSpy.restore();
    });

    it('devrait avoir une cohérence dans la périodicité d\'évolution du stock', () => {
        const produit1 = new Produit('01', 'Pommes', 50, '2024-02-28');
        const produit2 = new Produit('02', 'Oranges', 30, '2024-03-15');
        const produit3 = new Produit('03', 'Bananes', 20, '2024-03-01');
    
        rayon.ajouterProduit(produit1);
        rayon.ajouterProduit(produit2);
        rayon.ajouterProduit(produit3);
    
        const dateDebut = '2024-02-01';
        const dateFin = '2024-03-10';
    
        const produitsPendantPeriode = rayon.stock.filter(produit => {
            const dateProduit = new Date(produit.datePeremption);
            return dateProduit >= new Date(dateDebut) && dateProduit <= new Date(dateFin);
        });
    
        expect(produitsPendantPeriode.length).to.equal(2);
        expect(produitsPendantPeriode.map(produit => produit.id)).to.include.members(['01', '03']);
    });
    
});
