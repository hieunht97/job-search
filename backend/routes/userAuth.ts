// const express = require('express')
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userSchema";
import { error } from "console";
//import cookieParser from "cookie-parser"
import createToken from "./JWT.js";

const router = express.Router();
const saltRounds = 14;
const app = express()


router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, async (err: Error | undefined, hash: string) => {
    try {
      // check for duplicated email addy
      const checkEmail = await User.findOne({email: email})
      if (checkEmail) {
        return res.status(422).json({error: "Email already exist"})
      }
      // create new user
      const user = await User.create({
        email,
        password: hash,
      });

      console.log("Created new user:\n", user)
      res.status(200).json(user);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: errorMessage });
    }
  })
  

});


router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const {email, password} = req.body
  console.log(req.body)
  
  try {
    // check for duplicated email addy
    const user = await User.findOne({email: email})
    if (!user || !user.password) {
      res.status(404).json({error: "Email not found"})
      return
    }


    // check for valid password --> if correct allow log in
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      res.status(404).json({error: "Invalid email or password"})
    } else {
      // create token
      const accessToken = createToken(user)
      // create cookie 
      res.cookie("access-token", accessToken, {
        maxAge: 259200000 // cookie valid for 3 days
      })
      res.status(200).json({message: "Logged in successfully", token: accessToken})
    }
      
    
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }

});

export default router;