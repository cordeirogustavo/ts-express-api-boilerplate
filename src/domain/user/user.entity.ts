import { randomUUID } from "crypto";

export class UserEntity {
  userId: string;
  name: string = "";
  email: string = "";
  password: string = "";
  status: string = "PENDING`";
  provider: string = "TsAPI";
  providerIdentifier: string = "";
  userPicture: string = "";
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null = null;

  constructor(params: Partial<UserEntity>) {
    this.userId = randomUUID();
    this.createdAt = new Date();
    this.updatedAt = new Date();

    Object.assign(this, params);

    this.provider = params.provider || "TsAPI";
    this.status = params.status || "PENDING";
  }
}
