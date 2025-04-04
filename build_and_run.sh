#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

CONTAINER_NAME="ecomm-backend"

# Function to build the Docker image
build_container() {
    echo "Building Docker image..."
    docker build -t $CONTAINER_NAME .
}

# Function to run the Docker container
run_container() {
    echo "Running Docker container..."
    docker run -p 3001:3001 --name $CONTAINER_NAME $CONTAINER_NAME
}

# # Function to run the Docker container with volumes
# run_with_volumes() {
#     echo "Running Docker container with volumes..."
#     docker run -p 3001:3001 --name $CONTAINER_NAME -v "$(pwd):/usr/src/app" $CONTAINER_NAME
# }

# Function to stop the Docker container
stop_container() {
    echo "Stopping Docker container..."
    docker stop $CONTAINER_NAME || echo "Container is not running."
    docker rm $CONTAINER_NAME || echo "Container does not exist."
}

# Function to open a terminal in the container
open_terminal() {
    echo "Opening terminal in the container..."
    docker exec -it $CONTAINER_NAME /bin/sh || echo "Container is not running."
}

# Parse options
OPTION=${1:-br} # Default option is 'br'

case $OPTION in
    br)
        echo "Building and running the container..."
        build_container
        run_container
        ;;
    b)
        echo "Building the container..."
        build_container
        ;;
    r)
        echo "Running the container..."
        run_container
        ;;
    d)
        echo "Running the container with volumes..."
        # run_with_volumes
        ;;
    s)
        echo "Stopping the container..."
        stop_container
        ;;
    t)
        echo "Opening terminal in the container..."
        open_terminal
        ;;
    *)
        echo "Invalid option. Use 'br' (build and run), 'b' (build), 'r' (run), 'd' (run with volumes), 's' (stop), or 't' (open terminal)."
        exit 1
        ;;
esac
