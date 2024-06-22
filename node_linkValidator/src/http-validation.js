import chalk from "chalk";

function extract_links(array_links){
    return array_links.map((link_object) => Object.values(link_object).join());
}

async function check_status(url_list){

    const array_status = await Promise.all(
        url_list.map(async (url) => {
            try{
                const response = await fetch(url);
                return response.status;
            }catch(error){
                return solve_error(error);
            }
            
        })
    )
    return array_status;
}

function solve_error(error){
    if (error.cause.code === 'ENOTFOUND'){
        return "Link não encontrado.";
    }else{
        return "Ocorreu algum erro.";
    }
}

export default async function validation_list(list_links){
    const links = extract_links(list_links);
    const status = await check_status(links);
    
    return list_links.map((object, indice) => ({
        ...object, 
        status: status[indice]
    }))
}

