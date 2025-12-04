import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const Language = t.Union(
  [
    t.Literal("en"),
    t.Literal("vi"),
    t.Literal("jp"),
    t.Literal("zh"),
    t.Literal("kr"),
    t.Literal("fr"),
    t.Literal("de"),
    t.Literal("es"),
  ],
  { additionalProperties: false },
);
