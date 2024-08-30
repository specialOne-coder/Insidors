import fs from 'fs';
import path from 'path';

/**
 * Save data to a JSON file
 */
export function saveDataToJsonFile(data: any, filename: string, type:string) {
    // Convertir les données en JSON
    const jsonData = JSON.stringify(data, null, 2);

    // Chemin complet du dossier et du fichier
    const dirPath = path.join('data', filename);
    const filePath = path.join(dirPath, `${filename}_${type}.json`);
    
    // Vérifier si le dossier existe
    if (!fs.existsSync(dirPath)) {
        // Créer le dossier s'il n'existe pas
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Écrire les données JSON dans un fichier
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Write File Error :', err);
            return;
        }
        console.log('Data save successfully', filePath);
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
    `https://${network}.blockscout.com/api/v2/transactions/`,
    `https://${network}.blockscout.com/api/v2/addresses/${address}/counters`
    ]
}