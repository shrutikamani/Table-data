import { create, deleted, getAll, getOne, update } from "../controller/userController.js";
import express from "express";

const route = express.Router();

route.post("/create" , create);
route.get("/getAll" ,getAll);
route.get("/getOne/:id" , getOne);
route.put('/:id',update)
route.delete('/:id',deleted)
export default route;