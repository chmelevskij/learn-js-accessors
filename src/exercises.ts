import S, { ObjectSchema } from "fluent-schema";

interface Question {
  description: string;
  answerSchema: ObjectSchema;
}

function programBody(bodySchema) {
  return S.object()
    .prop("type", S.const("File"))
    .prop(
      "program",
      S.object()
        .prop("type", S.const("Program"))
        .required()
        .prop("body", S.array().items(bodySchema).minItems(1).maxItems(1))
        .required()
    );
}

function identifier(name) {
  return S.object()
    .prop("type", S.const("Identifier"))
    .required()
    .prop("name", S.const(name))
    .required();
}

function literal(value) {
  return S.object()
    .prop("type", S.const("Literal"))
    .required()
    .prop("value", S.const(value))
    .required();
}

function expressionStatement(expression) {
  return S.object()
    .prop("type", S.const("ExpressionStatement"))
    .required()
    .prop("expression", expression)
    .required();
}

const animalAnswerSchema = programBody(
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
          .prop("id", identifier("animal"))
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
                      .prop("key", identifier("species"))
                      .prop("value", literal("dog")),
                    S.object()
                      .prop("type", S.const("Property"))
                      .prop("key", identifier("gender"))
                      .prop("value", literal("male")),
                  ])
                  .minItems(2)
                  .maxItems(2)
              )
          )
      )
    )
);

let exercises: Question[] = [
  {
    description:
      "Create an object called `animal` with properties `species` set to `dog` and `gender` set to `male`",
    answerSchema: animalAnswerSchema,
  },
  {
    description: "Get the name of the animal species with dot notation",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("MemberExpression"))
          .required()
          .prop("computed", S.const(false))
          .prop("object", identifier("animal"))
          .prop("property", identifier("species"))
      )
    ),
  },
  {
    description: "Get the gender of the animal using square bracket notation",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("MemberExpression"))
          .required()
          .prop("computed", S.const(true))
          .prop("object", identifier("animal"))
          .prop("property", literal("gender"))
      )
    ),
  },
  {
    description:
      "Add new property to animal called owners, with an empty array as its value",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("AssignmentExpression"))
          .prop("operator", S.const("="))
          .required()
          .prop(
            "left",
            S.object()
              .prop("object", identifier("animal"))
              .required()
              .prop("property", identifier("owners"))
              .required()
          )
          .required()
          .prop(
            "right",
            S.object()
              .prop("type", S.const("ArrayExpression"))
              .prop("elements", S.array().maxItems(0))
          )
          .required()
      )
    ),
  },
  {
    description:
      "Add new owner using dot notation, and set it's name to anything you want",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("AssignmentExpression"))
          .required()
          .prop("operator", S.const("="))
          .required()
          .prop(
            "left",
            S.object()
              .prop("type", S.const("MemberExpression"))
              .required()
              .prop("computed", S.const(true))
              .prop(
                "object",
                S.object()
                  .prop("type", S.const("MemberExpression"))
                  .required()
                  .prop("computed", S.const(false))
                  .prop("object", identifier("animal"))
                  .required()
                  .prop("property", identifier("owners"))
                  .required()
              )
              .required()
              .prop("property", literal(0))
              .required()
          )
          .required()
          .prop(
            "right",
            S.object()
              .prop("type", S.const("ObjectExpression"))
              .required()
              .prop(
                "properties",
                S.array()
                  .items(
                    S.object()
                      .prop("type", S.const("Property"))
                      .prop("key", identifier("name"))
                      .prop("computed", S.const(false))
                      .prop(
                        "value",
                        S.object()
                          .prop("type", S.const("Literal"))
                          .prop("value", S.string())
                      )
                      .prop("kind", S.const("init"))
                      .required()
                      .prop("method", S.const(false))
                      .required()
                      .prop("shorthand", S.const(false))
                      .required()
                  )
                  .minItems(1)
                  .maxItems(1)
              )
          )
          .required()
      )
    ),
  },
  {
    description: "Get all owners with square brackets notation",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("MemberExpression"))
          .prop("computed", S.const(true))
          .required()
          .prop("object", identifier("animal"))
          .required()
          .prop("property", literal("owners"))
          .required()
      )
    ),
  },
  {
    description: "get just a first owner using square brackets notation",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("MemberExpression"))
          .prop("computed", S.const(true))
          .required()
          .prop(
            "object",
            S.object()
              .prop("type", S.const("MemberExpression"))
              .prop("computed", S.const(true))
              .prop("object", identifier("animal"))
              .required()
              .prop("property", literal("owners"))
          )
          .required()
          .prop("property", literal(0))
          .required()
      )
    ),
  },
  {
    description: "get the name of the first owner using square brackets",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("MemberExpression"))
          .prop("computed", S.const(true))
          .required()
          .prop(
            "object",
            S.object()
              .prop("type", S.const("MemberExpression"))
              .prop("computed", S.const(true))
              .prop(
                "object",
                S.object()
                  .prop("type", S.const("MemberExpression"))
                  .prop("computed", S.const(true))
                  .prop("object", identifier("animal"))
                  .required()
                  .prop("property", literal("owners"))
                  .required()
              )
              .required()
              .prop("property", literal(0))
          )
          .required()
          .prop("property", literal("name"))
          .required()
      )
    ),
  },
  {
    description: "get the name of the first owner using dot notation",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("MemberExpression"))
          .prop("computed", S.const(false))
          .required()
          .prop(
            "object",
            S.object()
              .prop("type", S.const("MemberExpression"))
              .prop("computed", S.const(true))
              .prop(
                "object",
                S.object()
                  .prop("type", S.const("MemberExpression"))
                  .prop("computed", S.const(false))
                  .prop("object", identifier("animal"))
                  .required()
                  .prop("property", identifier("owners"))
                  .required()
              )
              .required()
              .prop("property", literal(0))
          )
          .required()
          .prop("property", identifier("name"))
          .required()
      )
    ),
  },
  {
    description:
      "add a new property address to the owner with object with single property `postcode`",
    answerSchema: programBody(
      expressionStatement(
        S.object()
          .prop("type", S.const("AssignmentExpression"))
          .required()
          .prop("operator", S.const("="))
          .required()
          .prop(
            "left",

            S.object()
              .prop("type", S.const("MemberExpression"))
              .required()
              .prop("computed", S.const(false))
              .prop(
                "object",
                S.object()
                  .prop("type", S.const("MemberExpression"))
                  .required()
                  .prop("computed", S.const(true))
                  .prop(
                    "object",
                    S.object()
                      .prop("type", S.const("MemberExpression"))
                      .required()
                      .prop("computed", S.const(false))
                      .prop("object", identifier("animal"))
                      .required()
                      .prop("property", identifier("owners"))
                      .required()
                  )
                  .required()
                  .prop("property", literal(0))
                  .required()
              )
              .required()
              .prop("property", identifier("address"))
              .required()
          )
          .required()
          .prop(
            "right",
            S.object()
              .prop("type", S.const("ObjectExpression"))
              .required()
              .prop(
                "properties",
                S.array()
                  .items(
                    S.object()
                      .prop("type", S.const("Property"))
                      .prop("key", identifier("postalCode"))
                      .prop("computed", S.const(false))
                      .prop(
                        "value",
                        S.object()
                          .prop("type", S.const("Literal"))
                          .prop("value", S.string())
                      )
                      .prop("kind", S.const("init"))
                      .required()
                      .prop("method", S.const(false))
                      .required()
                      .prop("shorthand", S.const(false))
                      .required()
                  )
                  .minItems(1)
                  .maxItems(1)
              )
          )
          .required()
      )
    ),
  },
  {
    description: "get owners postcode with square bracket notation",
    answerSchema: S.object(),
  },
  {
    description: "get owners postcode with dot notation",
    answerSchema: S.object(),
  },
];

export default exercises;
export type { Question };
