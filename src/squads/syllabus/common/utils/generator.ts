import { monotonicFactory } from "ulid";

const ulid = monotonicFactory();

export const genId = () => ulid(Date.now());
