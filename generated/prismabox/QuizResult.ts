import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const QuizResultPlain = t.Object(
  {
    id: t.String(),
    userId: t.String(),
    userTextId: t.String(),
    score: t.Integer(),
    total: t.Integer(),
    takenAt: t.Date(),
  },
  { additionalProperties: false },
);

export const QuizResultRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.String(),
        email: t.String(),
        username: t.String(),
        password: t.String(),
        createdAt: t.Date(),
      },
      { additionalProperties: false },
    ),
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

export const QuizResultPlainInputCreate = t.Object(
  { score: t.Integer(), total: t.Integer(), takenAt: t.Optional(t.Date()) },
  { additionalProperties: false },
);

export const QuizResultPlainInputUpdate = t.Object(
  {
    score: t.Optional(t.Integer()),
    total: t.Optional(t.Integer()),
    takenAt: t.Optional(t.Date()),
  },
  { additionalProperties: false },
);

export const QuizResultRelationsInputCreate = t.Object(
  {
    user: t.Object(
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

export const QuizResultRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Object(
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

export const QuizResultWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          userId: t.String(),
          userTextId: t.String(),
          score: t.Integer(),
          total: t.Integer(),
          takenAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "QuizResult" },
  ),
);

export const QuizResultWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
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
            {
              id: t.String(),
              userId: t.String(),
              userTextId: t.String(),
              score: t.Integer(),
              total: t.Integer(),
              takenAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "QuizResult" },
);

export const QuizResultSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      userTextId: t.Boolean(),
      score: t.Boolean(),
      total: t.Boolean(),
      takenAt: t.Boolean(),
      user: t.Boolean(),
      userText: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const QuizResultInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), userText: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const QuizResultOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userTextId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      score: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      total: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      takenAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const QuizResult = t.Composite([QuizResultPlain, QuizResultRelations], {
  additionalProperties: false,
});

export const QuizResultInputCreate = t.Composite(
  [QuizResultPlainInputCreate, QuizResultRelationsInputCreate],
  { additionalProperties: false },
);

export const QuizResultInputUpdate = t.Composite(
  [QuizResultPlainInputUpdate, QuizResultRelationsInputUpdate],
  { additionalProperties: false },
);
