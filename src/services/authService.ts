import User from "../models/User"


export const loginService = async (email: string, password: string) => {
    try {
        const user = await User.findOne({ email })
        return user;
    }
    catch (error) {
        return error;
    }
}
