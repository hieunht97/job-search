// const express = require('express')
import express, { Request, Response } from "express";

import User from "../models/userSchema";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ mssg: "GET all user" });
});

// router.get("/:username", (req: Request, res: Response) => {
//   res.json({ mssg: "GET a single user" });
// });

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