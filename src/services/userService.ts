import User, { IUser } from "../models/User";

const bcrypt = require("bcrypt");

interface UserQuery {
  name?: string;
  limit?: string;
  page?: string;
  role?: string;
}
export const getMatchedUserFilter = (query: UserQuery) => {
  const { name, role } = query;
  const matchFilter: any = {};

  if (name) {
    matchFilter.$or = [
      { name: { $regex: name, $options: "i" } },
      { email: { $regex: name, $options: "i" } }
    ];
  }

  if (role) {
    matchFilter.role = role;
  }
  return matchFilter;
};

export const buildPipline = (query: UserQuery) => {
  const limit = Number(query.limit) || 12;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * limit;
  const pipline = [
    { $match: getMatchedUserFilter(query) },
    { $skip: skip },
    { $limit: limit },
  ];
  return { pipline, limit, page };
}

export const getAllUserService = async (query: UserQuery) => {
  try {
    const { pipline, limit, page } = buildPipline(query);
    const data = await User.aggregate(pipline);
    const totalCount = await User.countDocuments(await getMatchedUserFilter(query));
    const totalPages = Math.ceil(totalCount / limit);

    return {
      users: data,
      metadata: {
        totalCount,
        totalPages,
        hasMore: page < totalPages,
        currentPage: page
      }
    };
  } catch (error) {
    return error;
  }
};

export const craeteUserService = async (body: IUser): Promise<IUser | any> => {
  try {
    const user = await User.findOne({ email: body.email });
    if (user) {
      return {
        message: "This email is already registered",
      };
    }
    const hashedPassword = await bcrypt.hash(body.password, Number(process.env.SALTROUNDS));

    const response = await User.create({ ...body, password: hashedPassword });

    return response;
  } catch (error) {
    return error;
  }
};


export const getUserByIdService = async (id: string) => {
  try {
    return await User.findById(id);
  } catch (error) {
    return error;
  }
}


export const deleteUserByIdService = async (id: string) => {
  try {
    return await User.findOneAndDelete({ _id: id });
  } catch (error) {
    return error;
  }
}


export const updateUserByIdService=async(id:string,body:IUser)=>{
 try {
        const data = await User.findByIdAndUpdate({ _id: id }, { ...body }, { new: true })
        return data;
    } catch (error) {
        return error;
    }

}