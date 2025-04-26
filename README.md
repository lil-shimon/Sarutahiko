# Sarutahiko MCP 計算ツール

このプロジェクトは、Model Context Protocol (MCP) を使用した簡単な計算ツールのサンプル実装です。

## 機能

このMCPサーバーは以下の計算機能を提供します：

- 加算（add）：2つの数値を足し算
- 減算（subtract）：2つの数値を引き算
- 乗算（multiply）：2つの数値を掛け算
- 除算（divide）：2つの数値を割り算（ゼロ除算エラー処理あり）
- 累乗（power）：基数を指数乗

## インストール

依存関係をインストールします：

```bash
npm install
```

## ビルド

TypeScriptをコンパイルします：

```bash
npm run build
```

## 実行

サーバーを起動します：

```bash
npm start
```

または、テストクライアントを使って機能をテストできます：

```bash
node dist/calculator-client.js
```

## MCPサーバーの使い方

このサーバーは標準入出力（STDIO）経由で通信するため、他のMCPクライアントから次のように利用できます：

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["dist/calculator-server.js"]
});

const client = new Client({
  name: "your-client",
  version: "1.0.0"
});

await client.connect(transport);

// 利用可能なツールを確認
const tools = await client.listTools();
console.log(tools);

// 加算ツールの呼び出し例
const result = await client.callTool({
  name: "add",
  arguments: {
    a: 5,
    b: 3
  }
});
console.log(result);
```

## カスタマイズ

新しい計算機能を追加するには、`calculator-server.ts`ファイルに新しいツールを追加してください。

## 注意

このプロジェクトは完全に生成AI（Claude）によって作成されています。コードやドキュメントはAIによって自動生成されたものです。

## ライセンス

ISC 