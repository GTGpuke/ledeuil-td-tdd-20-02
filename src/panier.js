class Panier {
    constructor() {
        this.articles = [];
        this.remiseTotale = 0;
    }

    ajouterArticle(article) {
        this.articles.push(article);
    }

    appliquerCoupon(coupon) {
        if (this.coupons.includes(coupon)) {
            this.articles.forEach(article => {
                if (article.prixRemise === article.prix && coupon.pourcentageRemise > 0) {
                    const remise = article.prix * (coupon.pourcentageRemise / 100);
                    const nouveauPrixRemise = Math.max(article.prix - remise, 0);
    
                    if (nouveauPrixRemise < article.prixRemise) {
                        console.log(`La remise de ${coupon.pourcentageRemise}% provoquerait un prix négatif pour ${article.nom}.`);
                    } else {
                        article.prixRemise = nouveauPrixRemise;
                        this.remiseTotale += remise;
                    }
                }
            });
        } else {
            console.log(`Le coupon '${coupon.code}' n'existe pas.`);
        }
    }

    calculerMontantTotal() {
        return this.articles.reduce((total, article) => total + article.prixRemise, 0) - this.remiseTotale;
    }
}

module.exports = Panier;
