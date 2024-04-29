import { gameSessionHandlers } from "./gameSessions";
import { selectSessionHandlers } from "./selectSession";

export const handlers = [...gameSessionHandlers, ...selectSessionHandlers];
