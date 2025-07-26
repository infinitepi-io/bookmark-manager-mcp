# Use Node.js 22 Alpine image for smaller size
FROM node:22-alpine
# Set working directory
WORKDIR /app
# Install pnpm globally
RUN npm install -g pnpm
# Copy package files
COPY package.json pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile
# Copy source code
COPY src/ ./src/
COPY tsconfig.json ./
# Build the application
RUN pnpm run build
# Add documentation labels
LABEL org.opencontainers.image.title="Bookmark Manager MCP"
LABEL org.opencontainers.image.description="MCP server for bookmark management with persistent storage"
LABEL org.opencontainers.image.documentation="Data stored in ~/.data/bookmarks.json on host"
LABEL usage="podman run -v ~/.data:/app/.data mindriftfall2infinitepiio/mcp:bookmark-manager-v1.0.0"
LABEL data.storage="~/.data/bookmarks.json"
LABEL org.opencontainers.image.source="https://github.com/infinitepi-io/bookmark-manager-mcp"
LABEL org.opencontainers.image.description="MCP server for bookmark management with persistent storage"
LABEL org.opencontainers.image.documentation="https://github.com/infinitepi-io/bookmark-manager-mcp/blob/main/README.md"
# Set environment variable for bookmark file location
ENV BOOKMARKS_FILE=/app/.data/bookmarks.json
# Create volume mount point for local .data directory
VOLUME ["/app/.data"]
# Expose port (if needed for debugging/monitoring)
EXPOSE 3000
# Run the MCP server
CMD ["node", "dist/index.js"]