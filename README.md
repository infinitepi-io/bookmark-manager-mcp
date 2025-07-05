## Use @modelcontextprotocol/sdk as package.

## MCP Server Components

### registerTool

**Purpose**: Registers executable functions that can be called by MCP clients

**Parameters**:

- Tool name (e.g., `"add"`)
- Configuration object with:
  - `title`: Display name for the tool
  - `description`: What the tool does
  - `inputSchema`: Zod schema defining required parameters
- Handler function that executes the tool logic

**Usage**: Tools are interactive functions. When called, they execute code and return results. In this implementation, the "add" tool takes a title and URL, then returns a confirmation message.

### registerResource

**Purpose**: Registers data sources that can be read by MCP clients

**Parameters**:

- Resource name (e.g., `"greeting"`)
- `ResourceTemplate` with URI pattern (e.g., `"greeting://{name}"`)
- Metadata object with title and description
- Handler function that returns resource content

**Usage**: Resources are passive data providers. They use URI templates to create dynamic content. The greeting resource generates personalized greetings based on the `{name}` parameter in the URI pattern.

**Key Difference**: Tools perform actions, Resources provide data.

## Testing Locally:

### Testing with @modelcontextprotocol/inspector

1. **Build the project first**:

   ```bash
   npm run build
   ```
2. **Run the inspector using the start-mcp script**:

   ```bash
   ./start-mcp
   ```
3. **Open the inspector in your browser** (typically at `http://localhost:6274`)
4. **Test the MCP server**:

   - View available tools and resources
   - Test the "add" tool with sample data
   - Test the "list" tool to see bookmarks
   - Browse bookmark resources by category

### Testing with Claude Code

1. **Add MCP server to Claude**:

   ```bash
   claude mcp add bookmark-manager node ./index.js
   ```
2. **Test the tools**:

   - Use the "add" tool to add bookmarks
   - Use the "list" tool to view all bookmarks
   - Access bookmark resources by category (e.g., `bookmarks://general`)
3. **Example usage in Claude**:

   ```
   Add a bookmark: "GitHub" with URL "https://github.com"
   List all bookmarks
   Show me bookmarks in the general category
   ```

### Docker

```
docker run -v ~/.data:/app/.data your-dockerhub-username/bookmark-manager-mcp:latest
```
