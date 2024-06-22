import chalk from "chalk";
import fs from "fs";
import findArchive from "./index.js";
import validation_list from "./http-validation.js";    

const path = process.argv;

async function print_list(valida, result, indetify = ''){
    if (valida){
        console.log(
            chalk.yellow('lista de validada'), 
            chalk.black.bgGreen(indetify),
            await validation_list(result));
    }else{
        console.log(
            chalk.yellow('lista de validada'), 
            chalk.black.bgGreen(indetify),
            result);
    }
    
}

async function text_process(argument){
    const path = argument[2];
    const valida = argument[3] === '--valida';

    try{
        fs.lstatSync(path);
    }catch(error){
        if (error.code === 'ENOENT'){
            console.log("Arquivo ou diretório não existe.");
            return;
        }
    }

    if(fs.lstatSync(path).isFile()){
        const result = await findArchive(argument[2]);
        print_list(valida, result);
    }
    else if(fs.lstatSync(path).isDirectory()){
        const archives = await fs.promises.readdir(path);
        archives.forEach(async (name_archive) => {
            const list = await findArchive(`${path}/${name_archive}`);
            print_list(valida, list, name_archive);
        })
    }
}

text_process(path);


