import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { spawn } from "child_process";

async function main() {
  // サーバープロセスを起動
  const serverProcess = spawn("node", ["dist/calculator-server.js"], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  // プロセスの標準出力と標準入力をクライアントのトランスポートに接続
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/calculator-server.js"],
  });

  // クライアントを作成して接続
  const client = new Client({
    name: "calculator-client",
    version: "1.0.0",
  });

  try {
    await client.connect(transport);
    console.log("サーバーに接続しました");

    // 利用可能なツールを取得
    const tools = await client.listTools();
    console.log("利用可能なツール:", tools);

    // 計算テスト
    const addResult = await client.callTool({
      name: "add",
      arguments: {
        a: 5,
        b: 3,
      },
    });
    console.log("加算結果:", addResult);

    const subtractResult = await client.callTool({
      name: "subtract",
      arguments: {
        a: 10,
        b: 4,
      },
    });
    console.log("減算結果:", subtractResult);

    const multiplyResult = await client.callTool({
      name: "multiply",
      arguments: {
        a: 6,
        b: 7,
      },
    });
    console.log("乗算結果:", multiplyResult);

    const divideResult = await client.callTool({
      name: "divide",
      arguments: {
        a: 20,
        b: 5,
      },
    });
    console.log("除算結果:", divideResult);

    const powerResult = await client.callTool({
      name: "power",
      arguments: {
        base: 2,
        exponent: 8,
      },
    });
    console.log("累乗計算結果:", powerResult);

    // エラーテスト：ゼロ除算
    const zeroDivideResult = await client.callTool({
      name: "divide",
      arguments: {
        a: 10,
        b: 0,
      },
    });
    console.log("ゼロ除算テスト:", zeroDivideResult);
  } catch (error) {
    console.error("エラーが発生しました:", error);
  } finally {
    // 接続を終了
    console.log("テスト完了、終了します");
    process.exit(0);
  }
}

main().catch((error) => {
  console.error("致命的なエラーが発生しました:", error);
  process.exit(1);
});
