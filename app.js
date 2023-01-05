const readlineSync = require('readline-sync');
const figlet = require('figlet');
const chalk = require("chalk");


class Pokemon {
    constructor(name, health, magic, skills) {
        this.name = name;
        this.health = health;
        this.magic = magic;
        this.skills = skills;
    }

    learnAttackSkills(obj) {
        return this.skills.push(obj)
    }

    showStatus() {

        console.log(chalk.magenta(`
        ${this.name} status
        health: ${this.health}% 
        magic: ${this.magic}%`));
    }

    attack(index, obj) {

        if (this.magic < this.skills[index].magic) {

            console.log(chalk.red(`Not enough magic! ${this.name} cannot launch any attack!`));

        }

        else if (obj.health > 0 && this.skills[index]) {
            this.magic -= this.skills[index].magic
            obj.health -= this.skills[index].damage
            console.log(chalk.bold(`
                ${this.name} launched skill ${this.skills[index].name} on ${obj.name}! ${obj.name} got ${this.skills[index].damage}% damaged `));

            if (obj.health === 0) {
                console.log(chalk.bold.red(`
                ${obj.name} is killed!`));


            }
        }
    }


    getMagic() {
        console.log(chalk.yellow.bold(`${this.name} got 20 magic back!`));
        return this.magic += 20;
    }

};




class AttackSkills {
    constructor(name, damage, magic) {
        this.name = name;
        this.damage = damage;
        this.magic = magic;

    }

};


const pikachu = new Pokemon("Pikachu", 100, 50, [])
const bulbasaur = new Pokemon("Bulbasaur", 20, 10, [])
const ivisaur = new Pokemon("Ivisaur", 100, 50, [])
const charmander = new Pokemon("Charmander", 100, 50, [])
const magneton = new Pokemon("Magneton", 100, 50, [])

const pokemonList = [pikachu, bulbasaur, ivisaur, charmander, magneton];

const lighting = new AttackSkills("⚡ Lighting ⚡", 20, 20);
const bite = new AttackSkills("💫 Bite 💫", 20, 20);
const explosion = new AttackSkills("💥 Explosion 💥", 30, 20);
const psywave = new AttackSkills("🌊 Psywave 🌊", 30, 20);

const attackList = [lighting, bite, explosion, psywave];

pikachu.learnAttackSkills(lighting);
bulbasaur.learnAttackSkills(bite);
ivisaur.learnAttackSkills(explosion);
charmander.learnAttackSkills(psywave);
magneton.learnAttackSkills(bite);
charmander.learnAttackSkills(lighting);
bulbasaur.learnAttackSkills(psywave);

//Game Title

console.log(chalk.blue(figlet.textSync("Pokemon Lite", { horizontalLayout: "full" })));

// Function to get the player names

function getPlayerNames(numOfPlayer) {
    return readlineSync.question(chalk.blue("\nPlayer " + numOfPlayer + " enter your name: "));
}


const player1 = getPlayerNames(1);
console.log(`Welcome ${player1}! 😊`);
const player2 = getPlayerNames(2);
console.log(`Welcome ${player2}! 😊`);

// Select two pokemon for each player

// Function to combine the number chosen by the player to the matching pokemon.

function getPokemon(selection) {
    while (true) {
        switch (selection) {
            case 1:
                return pikachu;

            case 2:
                return bulbasaur;


            case 3:
                return ivisaur;


            case 4:
                return charmander;


            case 5:
                return magneton;


            default:
                console.log(chalk.red("\nInvalid selection\n"));
                selection = readlineSync.questionInt(chalk.blue("Please enter a valid selection (1-5):"));
                break;
        }
    }
}



// Function to select a Pokemon

function selectPokemon(player, pokemonList) {
    console.log(chalk.blue(`\n${player}, choose your Pokemon\n`));
    for (let i = 0; i < pokemonList.length; i++) {
        console.log(chalk.bold(`${i + 1}. ${pokemonList[i].name}`));
    }
    let selection = readlineSync.questionInt(chalk.blue(`\n${player} enter the number of your Pokemon: `));
    let pokemon = getPokemon(selection);
    while (pokemon === undefined) {
        console.log(chalk.red("\nInvalid selection\n"));
        selection = readlineSync.questionInt(chalk.blue("Please enter a valid selection (1-5):"));
        pokemon = getPokemon(selection);
    }
    console.log(`\n${chalk.bold(player)} has selected ${chalk.bold.yellow(pokemon.name)}`);
    return pokemon;
}

const pokemon1 = selectPokemon(player1, pokemonList);
const pokemon2 = selectPokemon(player2, pokemonList);




// This function will filter the attack skills depending on the character skills, so it will return only the skills that the character doesn´t have yet
// it will be used to show the skills that the character can learn

function compareSkills(array1, array2) {
    return array2.filter(obj2 => !array1.some(obj1 => obj1.name === obj2.name));
};




// start playing
function playersGame(player, otherPlayer, attacker, defender) {


    //the game will continue until one of the players health is 0


    while (attacker.health > 0 && defender.health > 0) {

        let currentPlayer = player;


        //the first player will choose an action

        let action;
        while (true) {

            console.log(chalk.blue(`\n${player} select an action for ${attacker.name}\n`));
            console.log(chalk.redBright.bold("1. Attack"));
            console.log(chalk.yellow.bold("2. Get Magic"));
            console.log(chalk.green.bold("3. Show Status"));
            console.log(chalk.blue.bold("4. Gain Skill"));
            console.log(chalk.blackBright.bold("5. Quit game"));

            //the player  chooses an action

            action = readlineSync.questionInt(chalk.blue("\n" + player + " enter the number of the action: "));

            if (action >= 1 && action <= 5) {
                break;
            }
            console.log(chalk.red("Invalid selection"));
        }

        if (action === 1) {

            console.log(chalk.blue("\n" + player + " select an attack against " + defender.name + "\n"));

            //show the attacks
            for (let i = 0; i < attacker.skills.length; i++) {
                console.log(chalk.red(`${i + 1}. ${attacker.skills[i].name}`));
            };

            //attacker attacks defender

            let attack = readlineSync.questionInt(chalk.blue("\n" + player + " enter the number of the attack: "));
            if (attacker.skills[attack - 1] === undefined) {
                console.log(chalk.red("Invalid selection"));
                attack = readlineSync.questionInt(chalk.blue("\n" + player + " enter the number of the attack: "));
            }
            attacker.attack(attack - 1, defender);


            //if defender dies, announce the winner

            if (defender.health === 0) {
                console.log(chalk.green(figlet.textSync(attacker.name + " WINS!", { horizontalLayout: "full" })));
                break;

            }

        }

        else if (action === 2) {
            attacker.getMagic();
            if (currentPlayer === player) {
                currentPlayer = otherPlayer;

            } else {
                currentPlayer = player;

            }

        }

        else if (action === 3) {

            attacker.showStatus();
            if (currentPlayer === player) {
                currentPlayer = otherPlayer;

            } else {
                currentPlayer = player;

            }


        }
        else if (action === 4) {


            const listOfSkills = compareSkills(attacker.skills, attackList);

            for (let i = 0; i < listOfSkills.length; i++) {
                console.log(`${i + 1}. ${listOfSkills[i].name}`)
            }

            let chooseSkill = readlineSync.questionInt(chalk.blue("\n" + player + " enter the number of the skill: "));

            while (true) {

                if (chooseSkill >= 1 && chooseSkill <= listOfSkills.length) {
                    switch (chooseSkill) {
                        case 1:
                            attacker.learnAttackSkills(listOfSkills[0]);
                            console.log(chalk.bold.green(attacker.name + " has gained the skill " + listOfSkills[0].name));
                            break;

                        case 2:
                            attacker.learnAttackSkills(listOfSkills[1]);
                            console.log(chalk.bold.green(attacker.name + " has gained the skill " + listOfSkills[1].name));
                            break;

                        case 3:
                            attacker.learnAttackSkills(listOfSkills[2]);
                            console.log(chalk.bold.green(attacker.name + " has gained the skill " + listOfSkills[2].name));
                            break;
                    }
                    break; // exit the loop
                }
                else {
                    console.log(chalk.red("Invalid selection"));
                    chooseSkill = readlineSync.questionInt(chalk.blue("\n" + player + " enter a valid number: "));
                }
            }

        }

        else if (action === 5) {
            console.log(chalk.yellow("\nQuitting game..."));
            break;
        }

        else {
            console.log(chalk.red("\nInvalid action\n"));
            action = readlineSync.questionInt(chalk.blue("\n" + player + " enter the number of the action: "));

        }

        // Switch the value of currentPlayer after each player's turn


    }
}



const player1Plays = playersGame(player1, player2, pokemon1, pokemon2);
const player2Plays = playersGame(player2, player1, pokemon2, pokemon1);

















    //Action player 1
//     let action1;
//     while (true) {

//         console.log(chalk.blue("\n" + player1 + " select an action for " + pokemon1.name + "\n"));
//         console.log(chalk.redBright.bold("1. Attack"));
//         console.log(chalk.yellow.bold("2. Get Magic"));
//         console.log(chalk.green.bold("3. Show Status"));
//         console.log(chalk.blue.bold("4. Gain Skill"));
//         console.log(chalk.blackBright.bold("5. Quit game"));

//         //player 1 chooses an action

//         action1 = readlineSync.questionInt(chalk.blue("\n" + player1 + " enter the number of the action: "));
//         if (action1 >= 1 && action1 <= 5) {
//             break;
//         }
//         console.log(chalk.red("Invalid selection"));
//     }

//     if (action1 === 1) {

//         console.log(chalk.blue("\n" + player1 + " select an attack against " + pokemon2.name + "\n"));
//         //show the attacks
//         for (let i = 0; i < pokemon1.skills.length; i++) {
//             console.log(chalk.red(`${i + 1}. ${pokemon1.skills[i].name}`));
//         }
//         //player 1 attacks

//         let attack1 = readlineSync.questionInt(chalk.blue("\n" + player1 + " enter the number of the attack: "));
//         if (pokemon1.skills[attack1 - 1] === undefined) {
//             console.log(chalk.red("Invalid selection"));
//             attack1 = readlineSync.questionInt(chalk.blue("\n" + player1 + " enter the number of the attack: "));
//         }
//         pokemon1.attack(attack1 - 1, pokemon2);

//         //if pokemon2 dies, announce the winner
//         if (pokemon2.health === 0) {
//             console.log(chalk.green(figlet.textSync(pokemon1.name + " WINS!", { horizontalLayout: "full" })));
//             break
//         }



//     }
//     else if (action1 === 2) {
//         pokemon1.getMagic();

//     }
//     else if (action1 === 3) {

//         pokemon1.showStatus();

//     }
//     else if (action1 === 4) {


//         const listOfSkills = compareSkills(pokemon1.skills, attackList);
//         for (let i = 0; i < listOfSkills.length; i++) {
//             console.log(`${i + 1}. ${listOfSkills[i].name}`)
//         }
//         let chooseSkill1 = readlineSync.questionInt(chalk.blue("\n" + player1 + " enter the number of the skill: "));

//         while (true) {
//             if (chooseSkill1 >= 1 && chooseSkill1 <= listOfSkills.length) {
//                 switch (chooseSkill1) {
//                     case 1:
//                         pokemon1.learnAttackSkills(listOfSkills[0]);
//                         console.log(chalk.bold.green(pokemon1.name + " has gained the skill " + listOfSkills[0].name));
//                         break;
//                     case 2:
//                         pokemon1.learnAttackSkills(listOfSkills[1]);
//                         console.log(chalk.bold.green(pokemon1.name + " has gained the skill " + listOfSkills[1].name));
//                         break;
//                     case 3:
//                         pokemon1.learnAttackSkills(listOfSkills[2]);
//                         console.log(chalk.bold.green(pokemon1.name + " has gained the skill " + listOfSkills[2].name));
//                         break;
//                 }
//                 break; // exit the loop
//             } else {
//                 console.log(chalk.red("Invalid selection"));
//                 chooseSkill1 = readlineSync.questionInt(chalk.blue("\n" + player1 + " enter a valid number: "));
//             }
//         }

//     }

//     else if (action1 === 5) {
//         console.log(chalk.yellow("\nQuitting game..."));
//         break;
//     }

//     else {
//         console.log(chalk.red("\nInvalid action\n"));
//         action1 = readlineSync.questionInt(chalk.blue("\n" + player1 + " enter the number of the action: "));

//     }


//     //Action player 2
//     let action2;
//     while (true) {
//         console.log(chalk.blue("\n", player2, " select an action for " + pokemon2.name + "\n"));
//         console.log(chalk.redBright.bold("1. Attack"));
//         console.log(chalk.yellow.bold("2. Get Magic"));
//         console.log(chalk.green.bold("3. Show Status"));
//         console.log(chalk.blue.bold("4. Gain Skill"));
//         console.log(chalk.blackBright.bold("5. Quit game"));

//         action2 = readlineSync.questionInt(chalk.blue("\n" + player2 + " enter the number of the action: "));

//         if (action2 >= 1 && action2 <= 5) {
//             break;
//         }
//         console.log(chalk.red("Invalid selection"));
//     }

//     //player 2 chooses an action 


//     if (action2 === 1) {
//         console.log(chalk.blue("\n" + player2 + " select attack against " + pokemon1.name + "\n"));
//         //show the attacks
//         for (let i = 0; i < pokemon2.skills.length; i++) {
//             console.log(chalk.red(`${i + 1}. ${pokemon2.skills[i].name}`));
//         }
//         //player 2 attacks
//         const attack2 = readlineSync.questionInt(chalk.blue("\n" + player2 + " enter the number of the attack: "));
//         pokemon2.attack(attack2 - 1, pokemon1);

//         //if pokemon1 dies, announce the winner
//         if (pokemon1.health === 0) {

//             console.log(chalk.green(figlet.textSync(pokemon2.name + "WINS!", { horizontalLayout: "full" })));
//             break
//         }


//     }
//     else if (action2 === 2) {
//         pokemon2.getMagic();

//     }
//     else if (action2 === 3) {
//         pokemon2.showStatus()


//     }
//     else if (action2 === 4) {
//         const listOfSkills = compareSkills(pokemon2.skills, attackList);
//         for (let i = 0; i < listOfSkills.length; i++) {
//             console.log(`${i + 1}. ${listOfSkills[i].name}`)
//         }
//         let chooseSkill2 = readlineSync.questionInt(chalk.blue("\n" + player2 + " enter the number of the skill you want to gain: "));


//         while (true) {
//             if (chooseSkill2 >= 1 && chooseSkill2 <= listOfSkills.length) {
//                 switch (chooseSkill2) {
//                     case 1:
//                         pokemon2.learnAttackSkills(listOfSkills[0]);
//                         console.log(chalk.bold.green(pokemon2.name + " has gained the skill " + listOfSkills[0].name));
//                         break;
//                     case 2:
//                         pokemon2.learnAttackSkills(listOfSkills[1]);
//                         console.log(chalk.bold.green(pokemon2.name + " has gained the skill " + listOfSkills[1].name));
//                         break;
//                     case 3:
//                         pokemon2.learnAttackSkills(listOfSkills[2]);
//                         console.log(chalk.bold.green(pokemon2.name + " has gained the skill " + listOfSkills[2].name));
//                         break;
//                 }
//                 break; // exit the loop
//             } else {
//                 console.log(chalk.red("Invalid selection"));
//                 chooseSkill2 = readlineSync.questionInt(chalk.blue("\n" + player2 + " enter a valid number: "));
//             }
//         }


//     }

//     else if (action2 === 5) {
//         console.log(chalk.yellow("\nQuitting game..."));
//         break;
//     }
//     else {
//         console.log(chalk.red("\nInvalid action\n"));
//         action2 = readlineSync.questionInt(chalk.blue("\n" + player2 + " enter the number of the action: "));

//     }
// }


