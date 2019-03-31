# Semantic Theme for HookedJS

By Brian Dombrowski

## Status

WIP

## Build notes

Depends on Lodash :-(. You should configure the lodash-webpack plugin like so:

```
new LodashModuleReplacementPlugin({
  // This plugin stripts bulky features.
  // Set the feature to true to include it.
  shorthands: true,
  // cloning: true,
  currying: true,
  // caching: true,
  collections: true,
  // exotics: true,
  // guards: true,
  // metadata: true,
  // deburring: true,
  // unicode: true,
  // chaining: true,
  // memoizing: true,
  // coercions: true,
  // flattening: true, // required for bootstrap typeahead module
  // paths: true,
  // placeholders: true,
}),
```

## License

Apache 2.0
