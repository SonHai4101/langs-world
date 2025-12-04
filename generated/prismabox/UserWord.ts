import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserWordPlain = t.Object(
  {
    id: t.String(),
    userId: t.String(),
    wordId: t.String(),
    level: t.Integer(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const UserWordRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.String(),
        email: t.String(),
        password: t.String(),
        createdAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    word: t.Object(
      {
        id: t.String(),
        text: t.String(),
        normalized: __nullable__(t.String()),
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
        meaning: __nullable__(t.String()),
        ipa: __nullable__(t.String()),
        reading: __nullable__(t.String()),
        frequency: __nullable__(t.Integer()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const UserWordPlainInputCreate = t.Object(
  { level: t.Optional(t.Integer()) },
  { additionalProperties: false },
);

export const UserWordPlainInputUpdate = t.Object(
  { level: t.Optional(t.Integer()) },
  { additionalProperties: false },
);

export const UserWordRelationsInputCreate = t.Object(
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
    word: t.Object(
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

export const UserWordRelationsInputUpdate = t.Partial(
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
      word: t.Object(
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

export const UserWordWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          userId: t.String(),
          wordId: t.String(),
          level: t.Integer(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "UserWord" },
  ),
);

export const UserWordWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              userId_wordId: t.Object(
                { userId: t.String(), wordId: t.String() },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({
              userId_wordId: t.Object(
                { userId: t.String(), wordId: t.String() },
                { additionalProperties: false },
              ),
            }),
          ],
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
            {
              id: t.String(),
              userId: t.String(),
              wordId: t.String(),
              level: t.Integer(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "UserWord" },
);

export const UserWordSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      wordId: t.Boolean(),
      level: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      user: t.Boolean(),
      word: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserWordInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), word: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const UserWordOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      wordId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      level: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const UserWord = t.Composite([UserWordPlain, UserWordRelations], {
  additionalProperties: false,
});

export const UserWordInputCreate = t.Composite(
  [UserWordPlainInputCreate, UserWordRelationsInputCreate],
  { additionalProperties: false },
);

export const UserWordInputUpdate = t.Composite(
  [UserWordPlainInputUpdate, UserWordRelationsInputUpdate],
  { additionalProperties: false },
);
