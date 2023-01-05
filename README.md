# Pokemon Lite

This is a project developed at the end of the Javascript module, which is part of the Web Development course at DCI. 

It is a simple is a command-line based game that allows two players to battle against each other using their chosen Pokemon. Players will select their Pokemon and use attack skills to try and defeat their opponent's Pokemon.


## Built with
* [Node.js](https://nodejs.org/en/)
* [Readline-Sync](https://www.npmjs.com/package/readline-sync)
* [Figlet](https://www.npmjs.com/package/figlet)
* [Chalk](https://www.npmjs.com/package/chalk)

## Class Definitions
### Pokemon:

This class represents a Pokemon and has the following properties:
- name: the name of the Pokemon
- health: the current health of the Pokemon (0-100)
- magic: the current magic of the Pokemon (0-100)
- skills: an array of attack skills that the Pokemon can use

The Pokemon class also has the following four methods:

- learnAttackSkills: adds an attack skill object to the Pokemon's skills array.
- showStatus: logs the Pokemon's name and current health and magic levels to the console.
- attack: allows the Pokemon to attack another Pokemon using the attack skill at the given index.
- getMagic: increases the Pokemon's magic level by 20.

### AttackSkills

This class represents an attack skill and has the following properties:
- name: the name of the attack skill
- damage: the amount of damage that the attack skill does to the opponent's Pokemon
- magic: the amount of magic that the attack skill uses


## Getting Started

1. Install [Node.js](https://nodejs.org/en/) on your machine.
2. Clone or download this repository.
3. Open a terminal and navigate to the project directory.
4. Run ```npm install ``` to install the necessary dependencies.
5. Start the game by running node app.js.


## Gameplay:

Players can choose from 5 different Pokemon to battle with: 

- Pikachu 
- Bulbasaur 
- Ivysaur 
- Charmander 
- Magneton

After choosing their pokemon, players can choose between different actions:

* Attack
* Get Magic
* Show Status
* Gain Skills

There are 4 different skills that a pokemon could use to attack the other player. But not all the skills will be available for your pokemon.

The skills are:

- ⚡ Lighting ⚡: deals 20% damage and uses 20% of the pokemon's magic
- 💫 Bite 💫: deals 20% damage and uses 20% of the pokemon's magic
- 💥 Explosion 💥: deals 30% damage and uses 20% of the pokemon's magic
- 🌊 Psywave 🌊: deals 30% damage and uses 20% of the pokemon's magic

The game ends when one of the player's pokemon is defeated. The remaining player will be declared the winner.

## Future Plans

There are several features that can be added to improve the game:

- Add more pokemon with different skills and stats
- Implement a healing system where players can restore their pokemon's health
- Add a level system where pokemon can level up and gain new skills or stats
- Create a graphical interface to make the game more visually appealing.

These are just a few ideas of what can be added to the game in the future. There are many other possibilities to explore and make the game more engaging and fun.
