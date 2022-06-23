/* eslint-disable @typescript-eslint/no-var-requires */
import {Router} from 'express';
import {attachControllers} from "@decorators/express";
import {StatusController} from "../Controllers/StatusController";

export function registerRoutes(router: Router) {
  const controllers = [
    StatusController
  ]
  attachControllers(router, controllers)
}
