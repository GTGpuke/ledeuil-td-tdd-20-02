const { expect } = require('chai');
const Article = require('../src/article.js');
const Coupon = require('../src/coupon.js');
const Panier = require('../src/panier.js');

describe('Gestion des remises', () => {
    it('devrait appliquer correctement la remise d\'un coupon sur le prix d\'un article', () => {
        const panier = new Panier();
        const article = new Article('ProduitA', 100);
        panier.ajouterArticle(article);
        const coupon = new Coupon('CODE123', 'Réduction ProduitA', 15);
        panier.appliquerCoupon(coupon);
        expect(article.prixRemise).to.equal(85);
        panier.afficherRemises();
    });

    it('ne devrait pas appliquer la remise du coupon plus d\'une fois sur le même article', () => {
        const panier = new Panier();
        const articleA = new Article('ProduitA', 100);
        panier.ajouterArticle(articleA);
    
        const coupon = new Coupon('CODE123', 'Réduction ProduitA', 15);
        panier.appliquerCoupon(coupon);
        panier.appliquerCoupon(coupon);
    
        expect(panier.calculerMontantTotal()).to.equal(85);
        panier.genererRecapitulatif();
    });
    it('ne devrait pas appliquer la remise si le coupon n\'existe pas', () => {
        const panier = new Panier();
        const articleA = new Article('ProduitA', 100);
        panier.ajouterArticle(articleA);
    
        const coupon = new Coupon('CODE456', 'Réduction ProduitA', 15);
        panier.appliquerCoupon(coupon);
    
        expect(articleA.prixRemise).to.equal(100);
        panier.genererRecapitulatif();
    });
    
    it('ne devrait pas appliquer la remise si le prixRemise est déjà différent du prix', () => {
        const panier = new Panier();
        const articleA = new Article('ProduitA', 80, 70);
        panier.ajouterArticle(articleA);
    
        const coupon = new Coupon('CODE123', 'Réduction ProduitA', 15);
        panier.appliquerCoupon(coupon);
    
        expect(articleA.prixRemise).to.equal(70);
        panier.genererRecapitulatif();
    });
});