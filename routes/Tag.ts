import express from 'express';
import { TagController } from '../controllers';

const router = express.Router();

router.get("/", TagController.getTags);

export { router };
