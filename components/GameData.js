import ImagesData from "./ImagesData";
export class Game{
    cards;
    population;
    resources;
    recherche;
    constructor(population, resources, recherche) {
        this.cards= CardsInit();
        this.population = population;
        this.recherche = recherche;
        this.resources = resources;
    }

    modifyPopulation(value){
        this.population += value;
    }
    modifyResources(value){
        this.resources += value;
    }
    modifyRecherche(value){
        this.recherche += value;
        if (this.recherche <= 0){
            this.recherche = 0;
        }
        this.recherche = Math.round(this.recherche * 10) / 10;
    }
    modifyData(population, resources, recherche){
        this.modifyPopulation(population);
        this.modifyResources(resources);
        this.modifyRecherche(recherche);
    }

    postData(api_address, data, name) {
        fetch(api_address, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "playerName": name,
                "resources": data[0],
                "humans": data[1],
                "research": data[2]

            }),
        })
            .then(response => response.json())
            .then((data) => {
                console.log('Store Data Response:', data);
            })
            .catch((error) => {
                console.error('Store Data Error:', error);
            });
    }
}

class Effect{
    population;
    resource;
    recherche;
    constructor(population, resource, recherche) {
        this.population=population;
        this.resource= resource;
        this.recherche= recherche;
    }
}

class Card{
    question; //Question asked to the player
    leftText; //Text for left choice
    onLeft; //Effect on population, resource, recherche for Left choice
    rightText; //Text for right choice
    onRight; //Effect on population, resource, recherche for Right choice
    botText; //Text for bottom choice
    onBot; //Effect on population, resource, recherche for bottom choice
    background; //Background color of the card
    image; //Image of the card
    constructor(question, leftText, leftEffect, rightText, rightEffect, botText, botEffect, background, image) {
        this.question = question;
        this.leftText= leftText;
        this.onLeft= leftEffect;
        this.rightText= rightText;
        this.onRight= rightEffect;
        this.botText= botText;
        this.onBot= botEffect;
        this.background = background;
        this.image= image;
    }
}
export default function CardsInit(){
    const cards = [
        new Card(
            "De nombreuses forêts ont brulées, ouvrants la possibilité à la création de nouvelles terres agricoles, que faire ?",
            "replanter les forets au maximum",
            new Effect(0,2000,0),
            "Bruler en plus",
            new Effect(1,-1000,0.2),
            "cultiver les terres brulées",
            new Effect(1,-20000,0.1),
            "#2ac086",
            ImagesData.images.image_tree
        ),
        new Card(
            "Un conflit entre plusieurs puissances se prépare...",
            "aucun problème",
            new Effect(-10,-20000,-0.2),
            "solution diplomatique",
            new Effect(1,0,0.1),
            "limiter les répercutions",
            new Effect(-2,-10000,0),
            "#c46969",
            ImagesData.images.image_sword),
        new Card(
            "Les pecheurs font grêve, que faire ?",
            "les laisser se débrouiller",
            new Effect(-1, -2000,0),
            "Les soutenirs plus",
            new Effect(1, -20000, 0.2),
            "preserver les zones de pêche",
            new Effect(-2, 1000, 0.1),
            '#cce8ff',
            ImagesData.images.image_fish),
        new Card(
            "Une famine se profile à l'horizon",
            "Financer les fermiers",
            new Effect(1,-10000,0.1),
            "selection naturelle",
            new Effect(-1, 1000, -0.2),
            "rationner les reserves",
            new Effect(-1, -5000, 0),
            '#dcc69c',
            ImagesData.images.image_farming
        )

    ];
    return cards;
}