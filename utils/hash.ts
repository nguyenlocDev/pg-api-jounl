import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const saltRounds = 10; // số vòng hash
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const checkpassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export { hashPassword, checkpassword };
