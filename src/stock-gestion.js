class Produit {
    constructor(id, nom, quantite, datePeremption) {
        this.id = id;
        this.nom = nom;
        this.quantite = quantite;
        this.datePeremption = datePeremption;
    }
}

class Rayon {
    constructor() {
        this.stock = [];
    }

    ajouterProduit(produit) {
        this.stock.push(produit);
        console.log(`Produit ajouté : ${produit.nom}`);
        this.verifierStock();
    }

    supprimerProduit(idProduit) {
        const index = this.stock.findIndex(produit => produit.id === idProduit);

        if (index !== -1) {
            const nomProduitSupprime = this.stock[index].nom;
            this.stock.splice(index, 1);
            console.log(`Produit supprimé : ${nomProduitSupprime}`);
        } else {
            console.log(`Produit non trouvé avec l'identifiant : ${idProduit}`);
        }

        this.verifierStock();
    }

    verifierStock() {
        console.log('Stock actuel :');
        this.stock.forEach(produit => {
            console.log(`${produit.nom} - Quantité : ${produit.quantite} - Date de péremption : ${produit.datePeremption}`);
        });

        this.stock.forEach(produit => {
            if (produit.quantite < 0) {
                console.log(`Attention! Stock négatif pour ${produit.nom}`);
            }

            if (new Date(produit.datePeremption) < new Date()) {
                console.log(`Attention! Produit périmé : ${produit.nom}`);
            }
        });
    }

    visualiserEvolutionStock(dateDebut, dateFin) {
        console.log(`Evolution du stock entre ${dateDebut} et ${dateFin}:`);
        const produitsPendantPeriode = this.stock.filter(produit => {
            const dateProduit = new Date(produit.datePeremption);
            return dateProduit >= new Date(dateDebut) && dateProduit <= new Date(dateFin);
        });

        produitsPendantPeriode.forEach(produit => {
            console.log(`${produit.nom} - Quantité : ${produit.quantite} - Date de péremption : ${produit.datePeremption}`);
        });
    }
}

// Exemple d'utilisation
const rayon = new Rayon();

const produit1 = new Produit('01', 'Pommes', 50, '2024-02-28');
const produit2 = new Produit('02', 'Bananes', 30, '2024-03-15');

rayon.ajouterProduit(produit1);
rayon.ajouterProduit(produit2);

rayon.supprimerProduit('01');

rayon.ajouterProduit(new Produit('03', 'Oranges', -10, '2024-02-20'));
rayon.ajouterProduit(new Produit('04', 'Lait', 20, '2023-12-01'));

rayon.visualiserEvolutionStock('2024-01-01', '2024-03-01');