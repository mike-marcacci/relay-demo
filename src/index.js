import React from 'react';
import ReactDOM from 'react-dom';
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import App from './App';
import { graphql, buildSchema } from 'graphql';

// use the schema
import schemaSource from "./schema.graphql";
const schema = buildSchema(schemaSource);

// the root resolver
const root = {
  foo: () => {
    return {
      id: 'dc7caf7c-cb5b-44fa-a5a5-0d9c4a24ad17',
      name: 'Hello World!'
    };
  }
};

const source = new RecordSource();
const store = new Store(source);
const network = Network.create(async function(
  operation: *,
  variables: *,
  cacheConfig: *,
  uploadables: *
) {
  return graphql(
    schema,
    operation.text,
    root,
    {},
    variables,
  );
});

const environment = new Environment({
  handlerProvider: null,
  network,
  store
});

ReactDOM.render(<App environment={environment} />, document.getElementById('root'));
