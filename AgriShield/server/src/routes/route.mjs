import { Router } from "express";
import SignUpRoute from "./sign-up.mjs";
import LoginRoute from "./login.mjs"; 
import Dashboard from "./dashboard.mjs";
import ContactUSRoute from "./contact-us.mjs";
import ProfileRoter from "./profile.mjs"
import MyContractsRouter from "./my-contracts.mjs";
import MarketPlaceRouter from "./market-place.mjs"
import ContractRouter from "./contract.mjs";
import NegotiationsRouter from "./negotiations.mjs" 
import LogoutRouter from "./logout.mjs"
const router  = Router();
router.use(SignUpRoute);
router.use(LoginRoute);
router.use(Dashboard);
router.use(ContactUSRoute);
router.use(ProfileRoter);
router.use(MyContractsRouter);
router.use(MarketPlaceRouter);
router.use(ContractRouter);
router.use(NegotiationsRouter);
router.use(LogoutRouter);
export default router;

