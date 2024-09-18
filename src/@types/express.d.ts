declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    decodedToken: any;
    parsed: any;
    traceId: string;
  }
}
