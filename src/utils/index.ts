import fs from 'fs';


/**
 * Save data to a JSON file
 */
export function saveDataToJsonFile(data: any, filename: string) {
    // Convertir les données en JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Écrire les données JSON dans un fichier
    fs.writeFile(filename, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Une erreur est survenue lors de l\'écriture du fichier JSON:', err);
            return;
        }
        console.log('Les données ont été enregistrées avec succès dans', filename);
    });
}

/**
 * Fonction pour afficher un message de bienvenue
 * with mr insidor
 */
export function displayInsidor() {
    const asciiArt = `
                                                                               
                                  .....::::::....                               
                             ..:-====---------====--:..                         
                         ..:-==-:..            ...::-==-:.                      
                      .:===-:..                       .:==:.                    
                     .+=:.                               :-+-.                  
                  ..-+-                          ........  .-==:.               
                   -+. .                ......... .:::::......:==. .            
                  .*-               ..:---:----:::--:----:::::. :+:             
                  =+.            ..:-::.......::::::-::..::::--. :+:            
         ..-======*. .           .:..    ..::::....:-:--::....... :+.           
       .=**+=---=*#+:  .                          .::=:.         . =-           
      -#=:.:-===-..=%=                             ::.::.          :=.          
   . -%- -**+--*%#=.-%=                        ..:--. ...          .+.          
    :%=.#*:. .+=.:%+ -%=..              ....::---:.                 .-. .       
  ..*#.**.   .:   =%. :#+..    ..:::::-=====--------==========+++****%*.        
   :%=:%: ..  .-- +%.  ...     .#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-        
   :%:-%.   .=**++#- .         .#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=        
   :%:+#   .*#:.=*--:.          =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@= .      
   :%-+#   =%. -**=*%.          :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@- .      
  ..*#-%:  +# .--. =%. .        .*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%. .      
    :%=+%: =%:     =%- .       . :%@@@@@@@@@@@@@@@+-%@@@@@@@@@@@@@@@@%++.       
   . -%=+#:.+#=--:..-%:     .:.   -@@@@@@@@@@@@@@=. :*@@@@@@@@@@@@@@%:.*:       
    . -#+=#+::==++**+#-.    -+.... :*%@@@@@@@@@*:  .  :*@@@@@@@@@%*=.  +-       
       .*#==*+.   ..:...:-. =+ .  .  .-=++++=-:.        :=*%%*+-:.     +-       
         -#+...         =%. -*.       ....     .:-:        .+=        :*: .     
          :+#=.         +#. .== .    ..:. ..::-*+:......   .*- .   . .*- .      
         .  :+#+:.    .-%= . :*. .       .=-::.:+=:.:=-..:-*-       .*-..       
              .=***+++##=..  .-+:      ..-:--.  .::.... .:--.    . .+=.         
                 .:::.+=     .:-+-.     ...=--::....            . .+=  .        
                      ==      -:.-=-.        .::--------::..     :*-  .         
                   .. +-      -:  .=+-.           .....:::---. . =+             
                   . -+..    .=:    :-==:  .     ..:---:   ...  .*-             
                  ...*: .    .:.      .:==.       ......      .-+-.             
                  . :*.                 .:+=:.               :+=. .             
                 . :*-       ...          .-==-:......  ..:-==-                 
                  :*- .    :==-.             .:-======+===-:..                  
                .-+: .    -+:.                 ::.....*-.                       
           ...:=*=.   ..:=+. .               ...-:.   :+==-------:::...         
    `;
    console.log(asciiArt);
}

/**
 * Format blockscout api to get address info like creation hash and transaction info with this hash
 */
export function getBlockscoutApiUrl(network: string, address: string) {
    return [`https://${network}.blockscout.com/api/v2/addresses/`,
    `https://${network}.blockscout.com/api/v2/transactions/`
    ]
}