import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserTextPlain = t.Object(
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
);

export const UserTextRelations = t.Object(
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
    generatedQuiz: __nullable__(
      t.Object(
        { id: t.String(), userTextId: t.String(), questions: t.Any() },
        { additionalProperties: false },
      ),
    ),
    quizResults: t.Array(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const UserTextPlainInputCreate = t.Object(
  {
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
    title: t.Optional(__nullable__(t.String())),
    content: t.String(),
  },
  { additionalProperties: false },
);

export const UserTextPlainInputUpdate = t.Object(
  {
    language: t.Optional(
      t.Union(
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
    ),
    title: t.Optional(__nullable__(t.String())),
    content: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const UserTextRelationsInputCreate = t.Object(
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
    generatedQuiz: t.Optional(
      t.Object(
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
    ),
    quizResults: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const UserTextRelationsInputUpdate = t.Partial(
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
      generatedQuiz: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
      quizResults: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const UserTextWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          title: t.String(),
          content: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "UserText" },
  ),
);

export const UserTextWhereUnique = t.Recursive(
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
              title: t.String(),
              content: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "UserText" },
);

export const UserTextSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      language: t.Boolean(),
      title: t.Boolean(),
      content: t.Boolean(),
      createdAt: t.Boolean(),
      user: t.Boolean(),
      generatedQuiz: t.Boolean(),
      quizResults: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserTextInclude = t.Partial(
  t.Object(
    {
      language: t.Boolean(),
      user: t.Boolean(),
      generatedQuiz: t.Boolean(),
      quizResults: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserTextOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      content: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const UserText = t.Composite([UserTextPlain, UserTextRelations], {
  additionalProperties: false,
});

export const UserTextInputCreate = t.Composite(
  [UserTextPlainInputCreate, UserTextRelationsInputCreate],
  { additionalProperties: false },
);

export const UserTextInputUpdate = t.Composite(
  [UserTextPlainInputUpdate, UserTextRelationsInputUpdate],
  { additionalProperties: false },
);
