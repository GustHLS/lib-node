import fs from 'fs';
import chalk from 'chalk';

function extract_links(text){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

    const capt = [...text.matchAll(regex)];

    const results = capt.map(capt => ({[capt[1]]: capt[2]}));

    return results.length !== 0 ? results : "Não há links no arquivo";
}

function solveError(error){
    console.log(error);
    throw new Error(chalk.red(error.code, 'Não há arquivo no diretório.'));
}

// async/await
async function findArchive(path){
    try{
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(path, encoding);
        return (extract_links(text));
    }catch(error){
        solveError(error);
    }
}

export default findArchive;