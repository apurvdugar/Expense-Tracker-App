import jwt from 'jsonwebtoken';

const genToken = async (id) => {
  try{
    const token = jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d' })
    return token;
  }
  catch(error){
    console.error("Token generation failed", error);
    throw new Error("Token generation failed");
  }
}

export default genToken;