import bycrypt from 'bcrypt'


export const comparePassowrd=async(password:string,hashedPassword:string)=>{
    try{
        const isMatch=bycrypt.compare(password,hashedPassword)
        return isMatch
    }
    catch(error){
        return error ;
    }
}