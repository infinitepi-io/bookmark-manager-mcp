import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { mkdir, open } from 'fs/promises'
import { dirname, join } from 'path'
import { homedir } from 'os'
// Zod is a TypeScript schema validation library used for runtime type checking and validation
// It helps define the structure and validation rules for input data in MCP tool schemas
import { z } from 'zod'

// Create an MCP server
const server = new McpServer({
  name: 'bookmark-manager',
  version: '1.0.0'
})

// Simple bookmark storage
type bookmark = {
  title: string,
  url: string,
  category: string
}

const bookMarkFileName = process.env.BOOKMARKS_FILE || join(homedir(), '.data', 'bookmarks.json')

async function saveBookmarks (bookmarksToSave: bookmark[]): Promise<void> {
  let fileHandle
  try {
    fileHandle = await open(bookMarkFileName, 'w')
    await fileHandle.writeFile(JSON.stringify(bookmarksToSave, null, 2))
  } catch (error) {
    throw new Error(`Failed to save bookmarks: ${error instanceof Error ? error.message : 'Unknown error'}`)
  } finally {
    if (fileHandle) {
      await fileHandle.close()
    }
  }
}

// Add a bookmark tool
server.registerTool('add',
  {
    title: 'Add Bookmark',
    description: 'Add a new bookmark',
    inputSchema: {
      title: z.string().describe('Bookmark title'),
      url: z.string().url().describe('Bookmark URL'),
      category: z.string().optional().describe('Bookmark category (default: general)')
    }
  },
  async ({ title, url, category = 'general' }) => {
    const bookmark = { title, url, category }
    bookmarks.push(bookmark)
    await saveBookmarks(bookmarks)

    return {
      content: [{
        type: 'text',
        text: `Bookmark added: ${title} - ${url} (category: ${category})`
      }]
    }
  }
)

// List bookmarks tool
server.registerTool('list',
  {
    title: 'List Bookmarks',
    description: 'List all bookmarks',
    inputSchema: {}
  },
  async () => {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(bookmarks, null, 2)
      }]
    }
  }
)

async function loadBookmarks (): Promise<bookmark[]> {
  let fileHandle
  try {
    fileHandle = await open(bookMarkFileName, 'r')
    const data = await fileHandle.readFile('utf-8')
    return JSON.parse(data)
  } catch (error) {
    await mkdir(dirname(bookMarkFileName), { recursive: true })
    const defaultBookmarks: bookmark[] = [
      { title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/introduction', category: 'mcp' },
      { title: 'bookmark-mcp', url: 'https://github.com/infinitepi-io/bookmark-mcp', category: 'general' }
    ]
    await saveBookmarks(defaultBookmarks)
    return defaultBookmarks
  } finally {
    if (fileHandle) {
      await fileHandle.close()
    }
  }
}

const bookmarks: bookmark[] = await loadBookmarks()

// Bookmark inventory resource
server.registerResource(
  'bookmarks',
  new ResourceTemplate('bookmarks://{category}', {
    list: (extra: any) => ({
      resources: [
        { name: 'bookmarks://all', uri: 'bookmarks://all', description: 'All bookmarks' },
        { name: 'bookmarks://mcp', uri: 'bookmarks://mcp', description: 'MCP bookmarks' },
        { name: 'bookmarks://general', uri: 'bookmarks://general', description: 'General bookmarks' },
      ]
    })
  }),
  {
    title: 'Bookmark Inventory',
    description: 'Bookmarks are saved bookmarks by category'
  },
  async (uri: URL, extra: any) => {
    // Extract category from URI path (e.g., "bookmarks://general" -> "general")
    const category = (uri.hostname !== '' ? uri.hostname : uri.pathname.replace('/', ''))
    // Filter bookmarks by category: return all if category is "all", otherwise filter by matching category
    const filteredBookmarks = category === 'all'
      ? bookmarks
      : bookmarks.filter(b => b.category === category)

    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify(filteredBookmarks, null, 2)
      }]
    }
  }
)

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport()
await server.connect(transport)
