import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const WordPlain = t.Object(
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
);

export const WordRelations = t.Object(
  {
    userWords: t.Array(
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
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const WordPlainInputCreate = t.Object(
  {
    text: t.String(),
    normalized: t.Optional(__nullable__(t.String())),
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
    meaning: t.Optional(__nullable__(t.String())),
    ipa: t.Optional(__nullable__(t.String())),
    reading: t.Optional(__nullable__(t.String())),
    frequency: t.Optional(__nullable__(t.Integer())),
  },
  { additionalProperties: false },
);

export const WordPlainInputUpdate = t.Object(
  {
    text: t.Optional(t.String()),
    normalized: t.Optional(__nullable__(t.String())),
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
    meaning: t.Optional(__nullable__(t.String())),
    ipa: t.Optional(__nullable__(t.String())),
    reading: t.Optional(__nullable__(t.String())),
    frequency: t.Optional(__nullable__(t.Integer())),
  },
  { additionalProperties: false },
);

export const WordRelationsInputCreate = t.Object(
  {
    userWords: t.Optional(
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

export const WordRelationsInputUpdate = t.Partial(
  t.Object(
    {
      userWords: t.Partial(
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

export const WordWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          text: t.String(),
          normalized: t.String(),
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
          meaning: t.String(),
          ipa: t.String(),
          reading: t.String(),
          frequency: t.Integer(),
        },
        { additionalProperties: false },
      ),
    { $id: "Word" },
  ),
);

export const WordWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              text_language: t.Object(
                {
                  text: t.String(),
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
                },
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
              text_language: t.Object(
                {
                  text: t.String(),
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
                },
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
              text: t.String(),
              normalized: t.String(),
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
              meaning: t.String(),
              ipa: t.String(),
              reading: t.String(),
              frequency: t.Integer(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Word" },
);

export const WordSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      text: t.Boolean(),
      normalized: t.Boolean(),
      language: t.Boolean(),
      meaning: t.Boolean(),
      ipa: t.Boolean(),
      reading: t.Boolean(),
      frequency: t.Boolean(),
      userWords: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const WordInclude = t.Partial(
  t.Object(
    { language: t.Boolean(), userWords: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const WordOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      text: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      normalized: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      meaning: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      ipa: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      reading: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      frequency: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Word = t.Composite([WordPlain, WordRelations], {
  additionalProperties: false,
});

export const WordInputCreate = t.Composite(
  [WordPlainInputCreate, WordRelationsInputCreate],
  { additionalProperties: false },
);

export const WordInputUpdate = t.Composite(
  [WordPlainInputUpdate, WordRelationsInputUpdate],
  { additionalProperties: false },
);
