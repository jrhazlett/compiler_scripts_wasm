FROM node
#
# Defs
#
ENV PATH="/root/.cargo/bin:${PATH}"
ENV PATH_DIR_PROJ_ROOT=/root/compiler_scripts_wasm
ENV PATH_DIR_TARGET=/root/target

ENV VER_GO=1.20.1
#
# Setup Rust
#
RUN apt-get update \
    && \
    apt-get install -y \
    build-essential \
    curl \
    && \
    apt-get update \
    && \
    curl https://sh.rustup.rs -sSf | bash -s -- -y \
    && \
    curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh \
    && \
    wget https://go.dev/dl/go$VER_GO.linux-amd64.tar.gz \
    && \
    tar -C /usr/local/ -xzf go$VER_GO.linux-amd64.tar.gz
#
# Setup project
#
WORKDIR $PATH_DIR_PROJ_ROOT

COPY entrypoint.sh $PATH_DIR_PROJ_ROOT/
COPY package*.json $PATH_DIR_PROJ_ROOT/
#
# Setup entrypoint
#
ENTRYPOINT [ "sh", "/root/compiler_scripts_wasm/entrypoint.sh" ]









































