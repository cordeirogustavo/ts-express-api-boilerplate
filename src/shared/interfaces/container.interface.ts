import { DependencyContainer } from "tsyringe";

export interface IContainer {
  register(container: DependencyContainer): void;
}
