import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { HttpCode, Message } from "../libs/Errors";
import Erros from "../libs/Errors";

const memberService = new MemberService();

const coffeeController: T = {};

coffeeController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.render("home");
  } catch (err) {
    console.log("ERROR, goHome", err);
    res.redirect("/admin");
  }
};

coffeeController.getSignup = (req: Request, res: Response) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log("ERROR, getSignup", err);
    res.redirect("/admin");
  }
};
coffeeController.getLogin = (req: Request, res: Response) => {
  try {
    res.render("login");
  } catch (err) {
    console.log("ERROR, getLogin", err);
    res.redirect("/admin");
  }
};

coffeeController.processSignup = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processSignup");
    console.log("req.body:", req.body);
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path;
    newMember.memberType = MemberType.COFFEESHOP;
    const result = await memberService.processSignup(newMember);
    //TODO: SESSIONS AUTHENTICATION
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("ERROR, processSignup", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`
    );
  }
};

coffeeController.processLogin = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");

    const input: LoginInput = req.body;
    const result = await memberService.processLogin(input);
    //TODO: SESSIONS AUTHENTICATION

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("ERROR, processLogin", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`
    );
  }
};

coffeeController.logout = async (req: AdminRequest, res: Response) => {
  try {
    console.log("processLogin");

    req.session.destroy(function () {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("ERROR, processLogin", err);
    res.redirect("/admin");
  }
};

coffeeController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log("getUsers");
    const result = await memberService.getUsers();
    console.log("result", result);
    res.render("users", { users: result });
  } catch (err) {
    console.log("ERROR, getUsers", err);
    res.redirect("/admin/login");
  }
};

coffeeController.updateChosenUser = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenUser");
    const result = await memberService.updateChosenUser(req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("ERROR, updateChosenUser", err);
    if (err instanceof Erros) res.status(err.code).json(err);
    else res.status(Erros.standard.code).json(Erros.standard);
  }
};

coffeeController.checkAuthSession = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member)
      res.send(`<script> alert("${req.session.member.memberNick}") </script>`);
    else res.send(`<script> alert("${Message.NOT_AUTHENTICATED}") </script>`);
  } catch (err) {
    console.log("Error, checkAuthSession:", err);
    res.send(err);
  }
};

coffeeController.verifyRestaurant = (
  req: AdminRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.member?.memberType === MemberType.COFFEESHOP) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHENTICATED;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/login') </script>`
    );
  }
};

export default coffeeController;
