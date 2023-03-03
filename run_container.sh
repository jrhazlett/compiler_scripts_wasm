#!/bin/zsh
#
# Defs
#
NAME_CONTAINER="compiler_scripts_wasm"
NAME_IMAGE=$NAME_CONTAINER

PATH_DIR_PROJ_ROOT="/root/$NAME_CONTAINER"
#
# Fetch args from shell
#
PATH_DIR_TARGET="$1"
NAME_LANGUAGE="$2"
#
# Create mount points
#
MOUNT_DIR_NODE_MODULES="$(pwd)/node_modules_docker":$PATH_DIR_PROJ_ROOT/node_modules
MOUNT_DIR_SRC="$(pwd)/src":$PATH_DIR_PROJ_ROOT/src
MOUNT_DIR_TARGET="$PATH_DIR_TARGET":/root/target
#
# Validate the path here instead of in-app
#
if [ -d "$PATH_DIR_TARGET" ]
then
  #
  # If the target directory is legit, then start the container sequence
  #
  # Clean-up to prevent legacy container code from sticking around
  #
  docker rm -f $NAME_CONTAINER
  docker rmi $NAME_IMAGE
  echo "y" | docker images prune
  #
  # Build
  #
  docker build --tag $NAME_IMAGE .
  #
  # Run container
  # Mount the node_modules directory to 'cache' installed packages and speed up subsequent builds
  # Mount the target directory for compiling
  #
  docker run -it \
    --name $NAME_CONTAINER \
    -e "NAME_LANGUAGE=$NAME_LANGUAGE" \
    -v "$MOUNT_DIR_NODE_MODULES" \
    -v "$MOUNT_DIR_SRC" \
    -v "$MOUNT_DIR_TARGET" \
    "$NAME_IMAGE"
else
  echo "Error: Target project path does not exist."
  echo "PATH_DIR_TARGET_PROJ_ROOT_HOST = $PATH_DIR_TARGET_PROJ_ROOT_HOST"
fi










































