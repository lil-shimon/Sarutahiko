import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// サーバーの作成
const server = new McpServer({
  name: "calculator-server",
  version: "1.0.0",
});

// 加算ツール
server.tool(
  "add",
  {
    a: z.number().describe("最初の数値"),
    b: z.number().describe("2番目の数値"),
  },
  async ({ a, b }) => {
    const result = a + b;
    return {
      content: [{ type: "text", text: `${a} + ${b} = ${result}` }],
    };
  }
);

// 減算ツール
server.tool(
  "subtract",
  {
    a: z.number().describe("最初の数値"),
    b: z.number().describe("2番目の数値"),
  },
  async ({ a, b }) => {
    const result = a - b;
    return {
      content: [{ type: "text", text: `${a} - ${b} = ${result}` }],
    };
  }
);

// 乗算ツール
server.tool(
  "multiply",
  {
    a: z.number().describe("最初の数値"),
    b: z.number().describe("2番目の数値"),
  },
  async ({ a, b }) => {
    const result = a * b;
    return {
      content: [{ type: "text", text: `${a} * ${b} = ${result}` }],
    };
  }
);

// 除算ツール
server.tool(
  "divide",
  {
    a: z.number().describe("分子"),
    b: z.number().describe("分母"),
  },
  async ({ a, b }) => {
    if (b === 0) {
      return {
        content: [{ type: "text", text: "エラー: ゼロで割ることはできません" }],
      };
    }
    const result = a / b;
    return {
      content: [{ type: "text", text: `${a} ÷ ${b} = ${result}` }],
    };
  }
);

// 累乗計算
server.tool(
  "power",
  {
    base: z.number().describe("底"),
    exponent: z.number().describe("指数"),
  },
  async ({ base, exponent }) => {
    const result = Math.pow(base, exponent);
    return {
      content: [{ type: "text", text: `${base}^${exponent} = ${result}` }],
    };
  }
);

// サーバーの起動
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("計算ツールサーバーが起動しました");
}

main().catch((error) => {
  console.error("エラーが発生しました:", error);
  process.exit(1);
});
