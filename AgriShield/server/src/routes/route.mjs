import { Router } from "express";
import SignUpRoute from "./sign-up.mjs";
import LoginRoute from "./login.mjs"; 
import Dashboard from "./dashboard.mjs";
import ContactUSRoute from "./contact-us.mjs";
const router  = Router();
router.use(SignUpRoute);
router.use(LoginRoute);
router.use(Dashboard);
router.use(ContactUSRoute);
export default router;

