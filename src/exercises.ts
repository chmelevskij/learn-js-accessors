import S, { ObjectSchema } from "fluent-schema";

interface Question {
  description: string;
  answerSchema: ObjectSchema;
}

const animalAnswerSchema = S.object()
  .prop("type", S.const("File"))
  .prop(
    "program",
    S.object()
      .prop("type", S.const("Program"))
      .required()
      .prop(
        "body",
        S.array()
          .items(
            S.object()
              .prop("type", S.const("VariableDeclaration"))
              .required()
              .prop("kind", S.oneOf([S.const("const"), S.const("let")]))
              .required()
              .prop(
                "declarations",
                S.array().items(
                  S.object()
                    .prop("type", S.const("VariableDeclarator"))
                    .prop(
                      "id",
                      S.object()
                        .prop("type", S.const("Identifier"))
                        .prop("name", S.const("animal"))
                    )
                    .prop(
                      "init",
                      S.object()
                        .prop("type", S.const("ObjectExpression"))
                        .prop(
                          "properties",
                          S.array()
                            .items([
                              S.object()
                                .prop("type", S.const("Property"))
                                .prop(
                                  "key",
                                  S.object()
                                    .prop("type", S.const("Identifier"))
                                    .prop("name", S.const("species"))
                                )
                                .prop(
                                  "value",
                                  S.object()
                                    .prop("type", S.const("Literal"))
                                    .prop("value", S.const("dog"))
                                ),
                              S.object()
                                .prop("type", S.const("Property"))
                                .prop(
                                  "key",
                                  S.object()
                                    .prop("type", S.const("Identifier"))
                                    .prop("name", S.const("gender"))
                                )
                                .prop(
                                  "value",
                                  S.object()
                                    .prop("type", S.const("Literal"))
                                    .prop("value", S.const("male"))
                                ),
                            ])
                            .minItems(2)
                            .maxItems(2)
                        )
                    )
                )
              )
          )
          .minItems(1)
          .maxItems(1)
      )
      .required()
  );

let exercises: Question[] = [
  {
    description:
      "Create an object called `animal` with properties `species` set to `dog` and `gender` set to `male`",
    answerSchema: animalAnswerSchema,
  },
  {
    description: 'Get the name of the animal species with dot notation',
    answerSchema: S.object(),
  },
  {
    description: 'Get the gender of the animal using square bracket notation',
    answerSchema: S.object(),
  },
  {
    description: 'Add new property to animal called owners, with an empty array as its value',
    answerSchema: S.object(),
  },
  {
    description: 'Add new owner using square bracked notation',
    answerSchema: S.object(),
  },
  {
    description: 'Get all owners with square brackets notation',
    answerSchema: S.object(),
  },
  {
    description: 'get just a first owner using square brackets notation',
    answerSchema: S.object(),
  },
  {
    description: 'get the name of the first owner using square brackets',
    answerSchema: S.object(),
  },
  {
    description: 'get the name of the first owner using dot notation',
    answerSchema: S.object(),
  },
  {
    description: 'add a new property address to the owner with object with single property `postcode`',
    answerSchema: S.object(),
  },
  {
    description: 'get owners postcode with square bracket notation',
    answerSchema: S.object(),
  },
  {
    description: 'get owners postcode with dot notation',
    answerSchema: S.object(),
  },
];

export default exercises;
export type { Question }
