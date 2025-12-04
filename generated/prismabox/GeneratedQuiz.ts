import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const GeneratedQuizPlain = t.Object(
  { id: t.String(), userTextId: t.String(), questions: t.Any() },
  { additionalProperties: false },
);

export const GeneratedQuizRelations = t.Object(
  {
    userText: t.Object(
      {
        id: t.String(),
        userId: t.String(),
        language: t.Union(
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
        ),
        title: __nullable__(t.String()),
        content: t.String(),
        createdAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const GeneratedQuizPlainInputCreate = t.Object(
  { questions: t.Any() },
  { additionalProperties: false },
);

export const GeneratedQuizPlainInputUpdate = t.Object(
  { questions: t.Optional(t.Any()) },
  { additionalProperties: false },
);

export const GeneratedQuizRelationsInputCreate = t.Object(
  {
    userText: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const GeneratedQuizRelationsInputUpdate = t.Partial(
  t.Object(
    {
      userText: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const GeneratedQuizWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          userTextId: t.String(),
          questions: t.Any(),
        },
        { additionalProperties: false },
      ),
    { $id: "GeneratedQuiz" },
  ),
);

export const GeneratedQuizWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), userTextId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ userTextId: t.String() })],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            { id: t.String(), userTextId: t.String(), questions: t.Any() },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "GeneratedQuiz" },
);

export const GeneratedQuizSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userTextId: t.Boolean(),
      questions: t.Boolean(),
      userText: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const GeneratedQuizInclude = t.Partial(
  t.Object(
    { userText: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const GeneratedQuizOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userTextId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      questions: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const GeneratedQuiz = t.Composite(
  [GeneratedQuizPlain, GeneratedQuizRelations],
  { additionalProperties: false },
);

export const GeneratedQuizInputCreate = t.Composite(
  [GeneratedQuizPlainInputCreate, GeneratedQuizRelationsInputCreate],
  { additionalProperties: false },
);

export const GeneratedQuizInputUpdate = t.Composite(
  [GeneratedQuizPlainInputUpdate, GeneratedQuizRelationsInputUpdate],
  { additionalProperties: false },
);
