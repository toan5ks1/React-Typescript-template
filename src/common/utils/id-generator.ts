import { monotonicFactory } from "ulid";

const ulid = monotonicFactory();

export function genId() {
    return ulid(Date.now());
}
