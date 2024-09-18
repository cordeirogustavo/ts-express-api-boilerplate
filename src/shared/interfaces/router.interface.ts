import { Express } from 'express'

export interface IRouter {
  register(server: Express): void
}
