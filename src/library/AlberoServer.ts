import { ChildProcess, spawn } from "child_process";
import * as http from "http";

export class AlberoServer {
    private static serverPath = "./vendor/albero-server/albero-server.exe";
    private static serverUrl = "http://localhost:5358";
    private process: ChildProcess = null;
    private supportTypes: Map<string, string[]> = null;

    public static toImgURL(path: string): string {
        return this.serverUrl + "/img/" + encodeURIComponent(path);
    }

    public run() {
        this.process = spawn(AlberoServer.serverPath, []);
        this.process.on("close", (code: number) => {
            console.log(`server process exited ${code}`);
        });
    }

    public close() {
        this.process.kill();
    }

    public async supportType(): Promise<Map<string, string[]>> {
        const url = AlberoServer.serverUrl + "/support";

        if (typeof this.supportTypes === "undefined") {
            const data = await this.getData(url);
            this.supportTypes = JSON.parse(data);
        }
        return this.supportTypes;
    }

    public async readDir(path: string): Promise<Map<string, string[]>> {
        const url = AlberoServer.serverUrl + "/fs/" + encodeURIComponent(path);
        const data = await this.getData(url);
        return JSON.parse(data);
    }

    public async isFile(path: string): Promise<boolean> {
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
                res.on("end", (res2: http.IncomingMessage) => {
                    resolve(data);
                });
            }).on("error", (e) => {
                console.log(`server error ${e.message}`);
                reject(e.message);
            });
        });
    }
}
