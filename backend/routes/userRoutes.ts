// const express = require('express')
import express, { Request, Response } from "express";

import User from "../models/userSchema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  // res.json({ mssg: "GET all user" });
  try {
    const user = await User.find()
    console.log(user)
    res.status(200).json(user)
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "unkown error"
    res.status(400).json({ error: errMsg });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  // res.json({ mssg: "GET a single user" });
  console.log(req.params)
  const {id} = req.params

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    console.log("---", user)
    res.status(200).json(user)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
  
});

router.post("/", async (req: Request, res: Response) => {
  const { email, username, password, company, linkedin, github, doc } =
    req.body;
  try {
    const user = await User.create({
      email,
      username,
      password,
      company,
      linkedin,
      github,
      doc,
    });
    res.status(200).json(user);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
