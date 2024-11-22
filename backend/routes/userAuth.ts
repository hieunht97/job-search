// const express = require('express')
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userSchema";
import { error } from "console";

const router = express.Router();
const saltRounds = 14;


// router.get("/:id", async (req: Request, res: Response): Promise<any> => {
//   // res.json({ mssg: "GET a single user" });
//   console.log(req.params)
//   const {id} = req.params

//   try {
//     const user = await User.findById(id)
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found"
//       })
//     }
//     console.log(user)
//     res.status(200).json(user)
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "Unknown error";
//     res.status(400).json({ error: errorMessage });
//   }
// });

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, async (err: Error | undefined, password: string) => {
    try {
      // check for duplicated email addy
      const checkEmail = await User.findOne({email: email})
      if (checkEmail) {
        return res.status(422).json({error: "Email already exist"})
      }

      // create new user
      const user = await User.create({
        email,
        password,
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
    if (!user) {
      return res.status(404).json({error: "Email and password doesn't match"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(404).json({error: "Email and password doesn't match"})
    }
      
    return res.status(200).json({message: "Logged in successfully"})
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }

});

export default router;