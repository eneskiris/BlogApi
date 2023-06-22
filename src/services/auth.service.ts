import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";

export const registerUser = async (
  username: string,
  password: string
): Promise<void> => {
  const existingUser = await UserModel.findOne({ username });

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user: User = new UserModel({
    username,
    password: hashedPassword,
  });

  await user.save();
};

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as Secret
  );

  return token;
};
