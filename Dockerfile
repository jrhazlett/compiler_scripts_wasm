FROM node
#
# Defs
#
ENV PATH="/root/.cargo/bin:${PATH}"
ENV PATH_DIR_PROJ_ROOT=/root/compiler_scripts_wasm
ENV PATH_DIR_TARGET=/root/target
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
    wget https://dl.google.com/go/go1.13.5.linux-amd64.tar.gz \
    && \
    tar -C /usr/local/ -xzf go1.13.5.linux-amd64.tar.gz

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









































