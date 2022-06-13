(c) Gaetan Vigneron

---
![bear](readme-cover.jpg?raw=true)

# MODULE REACT - PanelX & PanelY


## Context du projet

<p>
Le projet devait historiquement adapter l'interface de l'application mobile snapchat (2017) sur navigateur.

Cela comporte notamment la gestion des stories en bandes parallèles.
</p>


## Contenu des modules

### CranContext

Il permet de gérer toutes les crans des panels  et de synchroniser différents Panels par bloc

### PanelX

Gestion horizontal du dom par bloc de la largeur de l'ecran

### PanelY
Gestion vertical du dom organisé par type de bloc 


    BlocFull
    BlocScroll



 __blocFull__ fait exactement la hauteur de l'écran il est très simple à gérer car il change de cran directement


 __blocScroll__ c'est une partie de la storie plus longue que l'écran qui nécessite un positionnement


## Exemple d'implementation

Un exemple d'utilisation des modules avec l'histoire de boucle d'or .

Deux stories en parallèle synchronisé par bloc .

Le point de vue de boucle d'or et celui de petit ours 


## Dependance

<p>
 Le code est dépendant d'un autre de mes projets javascript qui permet notamment de gérer le gestuel mobile sur navigateur tel que le décisionnel de mouvement X Y
</p>

<https://github.com/gaetanV/dom_mobile>
