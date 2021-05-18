import { Request, Response, NextFunction } from "express";
import UsersRepository from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

import { verify } from "jsonwebtoken";

import AppError from "../../../errors/AppError";
import authConfig from "../../../config/auth";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void>  {
    const authHeaders = request.headers.authorization;
    if (!authHeaders) throw new AppError("Token is missing.");

    const [, token] = authHeaders.split(" ");

    try {
      const { sub } = verify(token, authConfig.jwt.secret) as IPayload;

      const usersRepository = new UsersRepository();

      const user = await usersRepository.findById(sub);
      if (!user) throw new AppError("This user does not exist", 401);

      request.user = {
        id: sub,
      };

      next();
    } catch (err) {
      throw new AppError("Invalid token", 401);
    }
  }

 
