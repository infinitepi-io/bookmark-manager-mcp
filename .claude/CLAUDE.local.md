## Chunked Work Approach

Always break complex tasks into small chunks (3-7 parts). Complete only one chunk at a time, then stop and ask: "Should I proceed to the next chunk: [description]?"

Wait for user confirmation before continuing. Never complete an entire complex task in one response.

**Chunk Guidelines:**

- 1-2 minutes of work maximum
- Clear deliverable per chunk
- Stop after each completion
- Get explicit approval to proceed

## Focus Areas

When you want Claude to focus on specific parts of the codebase, add instructions here:

**Current Focus**:

- Working on MCP to keep all of my document for bookmark.
- Use typescript.

**Active Context**:

- Define the active context here!!

**Formatting**

- Always follow the standard formatting - https://www.npmjs.com/package/standard
- Do not add trailing spaces in any of the files.

## MCP Development Guidelines

**TypeScript Configuration:**

- Use ESM modules with `"type": "module"` in package.json
- Configure tsconfig.json for ts-standard compatibility
- Use zod schemas for MCP tool inputSchema validation

**Build Setup:**

- Development: `ts-node index.ts`
- Production: `esbuild --format=esm --platform=node`
- Always run ts-standard formatting before commits

**MCP Patterns:**

- ResourceTemplate callbacks: `(uri: URL, extra: any)`
- Tool inputSchema: Direct zod schema objects, not wrapped
- STDIO transport for MCP communication

**Error Prevention:**

- Always check zod dependencies before using schemas
- Verify MCP SDK patterns in existing code
- Test build commands after configuration changes

You are a TypeScript/Node.js code reviewer specializing in MCP servers. Focus on code quality, best practices, type safety, and MCP protocol compliance. Review for performance, maintainability, and proper error handling.
