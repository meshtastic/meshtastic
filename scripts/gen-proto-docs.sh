#!/usr/bin/env bash

# go install github.com/pseudomuto/protoc-gen-doc/cmd/protoc-gen-doc@latest

PROJECT_BASE=$(git rev-parse --show-toplevel)

# change to proto directory
cd "${PROJECT_BASE}"/protobufs || exit

git checkout master

if git submodule status | grep -q '^[-]|^[+]' ; then \
  echo "INFO: Re-initializing git submodules..."; \
  git submodule update --init --recursive; \
else \
  echo "INFO: Updating git submodules..."; \
  git pull --recurse-submodules; \
  git submodule update --remote --recursive 
fi

# remove old generated protos
rm -rf "${PROJECT_BASE}/docs/developers/Protobufs/*"

protoc --doc_opt="${PROJECT_BASE}/protobuf.tmpl,protobuf-api.mdx" --doc_out="${PROJECT_BASE}/docs/development/" --proto_path="${PROJECT_BASE}/protobufs" *.proto