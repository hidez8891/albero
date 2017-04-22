import { ChildProcess, spawn } from "child_process";
import * as http from "http";

export class AlberoServer {
    private static server_path = "./vendor/albero-server/albero-server.exe";
    private static server_url = "http://localhost:5358";
    private process: ChildProcess = null;
    private support_type: Map<string, string[]> = null;

    static toImgURL(path: string): string {
        return this.server_url + "/img/" + encodeURIComponent(path);
    }

    run() {
        this.process = spawn(AlberoServer.server_path, []);
        this.process.on("close", (code: number) => {
            console.log(`server process exited ${code}`);
        });
    }

    close() {
        this.process.kill();
    }

    async supportType(): Promise<Map<string, string[]>> {
        const url = AlberoServer.server_url + "/support";

        if (typeof this.support_type === "undefined") {
            const data = await this.getData(url);
            this.support_type = JSON.parse(data);
        }
        return this.support_type;
    }

    async readDir(path: string): Promise<Map<string, string[]>> {
        const url = AlberoServer.server_url + "/fs/" + encodeURIComponent(path);
        const data = await this.getData(url);
        return JSON.parse(data);
    }

    async isFile(path: string): Promise<boolean> {
        return this.readDir(path)
            .then((m) => false)
            .catch((e) => true);
    }

    private getData(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            http.get(url, (res) => {
                let data = "";

                res.setEncoding("utf8");
                res.on("data", (chunk: http.IncomingMessage) => { data += chunk; });
                res.on("end", (res: http.IncomingMessage) => {
                    resolve(data);
                });
            }).on("error", (e) => {
                console.log(`server error ${e.message}`);
                reject(e.message);
            });
        });
    }
}
